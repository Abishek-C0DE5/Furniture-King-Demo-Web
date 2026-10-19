"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CouponDetails {
  code: string;
  type: "percent" | "fixed";
  value: number; // e.g. 10 for 10%, or 5000 for Rs. 5000
  minOrder?: number;
  description: string;
}

const AVAILABLE_COUPONS: Record<string, CouponDetails> = {
  ROYAL10: {
    code: "ROYAL10",
    type: "percent",
    value: 10,
    minOrder: 40000,
    description: "10% Royal Privilege Discount (Orders above Rs. 40,000)",
  },
  FURNITUREKING: {
    code: "FURNITUREKING",
    type: "fixed",
    value: 5000,
    minOrder: 50000,
    description: "Rs. 5,000 Flat Welcome Voucher (Orders above Rs. 50,000)",
  },
  KATHMANDU: {
    code: "KATHMANDU",
    type: "fixed",
    value: 2500,
    minOrder: 30000,
    description: "Rs. 2,500 Valley Special Discount",
  },
};

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  subtotal: number;
  shippingCost: number;
  shippingThreshold: number;
  amountNeededForFreeShipping: number;
  isFreeShipping: boolean;
  discount: number;
  total: number;
  appliedCoupon: CouponDetails | null;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, openDrawer?: boolean) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "fk-cart-items-v1";
const COUPON_STORAGE_KEY = "fk-cart-coupon-v1";
const FREE_SHIPPING_THRESHOLD = 50000; // Rs. 50,000
const STANDARD_SHIPPING_FEE = 1500; // Rs. 1,500

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponDetails | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage upon mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon && AVAILABLE_COUPONS[storedCoupon.toUpperCase()]) {
        setAppliedCoupon(AVAILABLE_COUPONS[storedCoupon.toUpperCase()]);
      }
    } catch (e) {
      console.warn("Failed to read cart from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon.code);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [items, appliedCoupon, isHydrated]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback(
    (product: Product, quantity = 1, selectedColor?: string, openDrawer = true) => {
      const color = selectedColor || (product.colors.length > 0 ? product.colors[0] : undefined);
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.product.id === product.id && item.selectedColor === color
        );

        if (existingIndex > -1) {
          const updated = [...prev];
          const newQty = updated[existingIndex].quantity + quantity;
          // cap to stockCount if available
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Math.min(newQty, product.stockCount || 99),
          };
          return updated;
        }

        return [
          ...prev,
          {
            product,
            quantity: Math.min(quantity, product.stockCount || 99),
            selectedColor: color,
          },
        ];
      });

      if (openDrawer) {
        setIsCartOpen(true);
      }
    },
    []
  );

  const removeFromCart = useCallback((productId: string, selectedColor?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && (selectedColor ? item.selectedColor === selectedColor : true))
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, selectedColor?: string) => {
      if (quantity <= 0) {
        removeFromCart(productId, selectedColor);
        return;
      }

      setItems((prev) =>
        prev.map((item) => {
          if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
            const max = item.product.stockCount || 99;
            return {
              ...item,
              quantity: Math.min(quantity, max),
            };
          }
          return item;
        })
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minOrder && subtotal < appliedCoupon.minOrder) return 0;

    if (appliedCoupon.type === "percent") {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    return Math.min(appliedCoupon.value, subtotal);
  }, [appliedCoupon, subtotal]);

  const total = Math.max(0, subtotal - discount + (subtotal > 0 ? shippingCost : 0));

  const applyCoupon = useCallback(
    (inputCode: string) => {
      const normalized = inputCode.trim().toUpperCase();
      const match = AVAILABLE_COUPONS[normalized];

      if (!match) {
        return { success: false, message: "Invalid coupon code. Try ROYAL10 or FURNITUREKING" };
      }

      if (match.minOrder && subtotal < match.minOrder) {
        return {
          success: false,
          message: `Minimum order of Rs. ${match.minOrder.toLocaleString("en-IN")} required for this coupon.`,
        };
      }

      setAppliedCoupon(match);
      return { success: true, message: `Promo code ${match.code} applied successfully!` };
    },
    [subtotal]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        totalItems,
        subtotal,
        shippingCost,
        shippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        isFreeShipping,
        discount,
        total,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
