"use client";

import React, { useRef, useState, useCallback, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number; // max tilt angle in degrees (default 12)
  perspective?: number; // 3d perspective in px (default 1000)
  scale?: number; // scale on hover (default 1.02)
  glare?: boolean; // show dynamic light reflection (default true)
  glareOpacity?: number; // max glare opacity (default 0.25)
}

export default function TiltCard({
  children,
  className = "",
  style = {},
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.2,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Disable mouse tilt on touch-only devices for smoother mobile experience
      if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
        return;
      }
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x pos within card
      const y = e.clientY - rect.top; // y pos within card

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-maxTilt to +maxTilt)
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Glare center coordinates in percentage
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        setTilt({ x: rotateX, y: rotateY });
        if (glare) {
          setGlarePos({ x: glareX, y: glareY, opacity: glareOpacity });
        }
      });
    },
    [maxTilt, glare, glareOpacity]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      <div
        className="w-full h-full transition-transform ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transitionDuration: isHovered ? "120ms" : "500ms",
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {/* Dynamic Specular Glare / 3D Sheen */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`,
              zIndex: 30,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
}
