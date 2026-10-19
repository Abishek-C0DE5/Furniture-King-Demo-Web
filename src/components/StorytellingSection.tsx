"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/image";
import { Sparkles, ShieldCheck, Clock, Hammer, Trees, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";

interface StoryChapter {
  id: number;
  stage: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  aspect: string;
  metrics: { label: string; value: string }[];
  highlight: string;
  quote: string;
}

const chapters: StoryChapter[] = [
  {
    id: 1,
    stage: "Chapter 01",
    title: "Sacred Hardwood Selection",
    tagline: "Slow-cured Sal and Sheesham timber, seasoned by nature.",
    description:
      "Every masterpiece begins deep in sustainably harvested hardwood forests. We hand-select dense Sal and Sheesham timber, naturally air-seasoning each plank for up to 24 months in the Kathmandu Valley breeze. This eliminates internal moisture and tension, ensuring zero warping, bowing, or cracking across decades of seasonal change.",
    image: "/Photos/487110252_657079973939936_4420901078227985058_n.jpg",
    aspect: "Hardwood Mastery",
    metrics: [
      { label: "Seasoning Period", value: "18–24 Months" },
      { label: "Moisture Content", value: "< 10% Balanced" },
      { label: "Timber Type", value: "Sal & Sheesham" },
    ],
    highlight: "Zero chemical composites or synthetic MDF. 100% seasoned solid hardwood.",
    quote: "“The soul of long-lasting furniture lies in the timber that was patient enough to dry properly.”",
  },
  {
    id: 2,
    stage: "Chapter 02",
    title: "The Palatial Master’s Chisel",
    tagline: "Intricate royal floral reliefs sculpted entirely by hand.",
    description:
      "Our artisans hail from multigenerational woodworking lineages who historically crafted royal Kathmandu durbars and palaces. Armed only with hand-forged steel gouges and mallets, they breathe organic life into solid timber—chiseling cascading acanthus leaves, lion-crests, and royal scalloped moldings millimeter by millimeter.",
    image: "/Photos/486115684_651321481182452_2819366713137830601_n.jpg",
    aspect: "Artisan Heritage",
    metrics: [
      { label: "Hand-Carving Time", value: "40+ Hours" },
      { label: "Artisan Lineage", value: "Kathmandu Valley" },
      { label: "Carving Detail", value: "3D Deep Relief" },
    ],
    highlight: "No CNC factory clones. Every curve carries the unique signature of master hands.",
    quote: "“A machine cuts wood; a master artisan coaxes the living warmth out of it.”",
  },
  {
    id: 3,
    stage: "Chapter 03",
    title: "Generational Interlocking Joinery",
    tagline: "Mortise and tenon architecture built to outlast generations.",
    description:
      "While mass-market furniture relies on flimsy staples, glue, and cam locks, Furniture King pieces are built with ancient architectural integrity. Hand-fitted mortise-and-tenon joints interlock with tight wood-to-wood tension, absorbing daily weight and motion effortlessly without loosening or squeaking.",
    image: "/Photos/487949718_657077367273530_502994373561440933_n.jpg",
    aspect: "Structural Integrity",
    metrics: [
      { label: "Joint Architecture", value: "Mortise & Tenon" },
      { label: "Dynamic Load", value: "650+ kg Tested" },
      { label: "Fastener Integrity", value: "Wood-Lock Dowels" },
    ],
    highlight: "Engineered to withstand lively family celebrations and heirloom inheritance.",
    quote: "“We do not build for the season. We build furniture your grandchildren will admire.”",
  },
  {
    id: 4,
    stage: "Chapter 04",
    title: "Lustrous Organic Finish & Velvet Tufting",
    tagline: "Warm walnut oils and sumptuous deep-buttoned comfort.",
    description:
      "The final transformation is a tactile ceremony. Five progressive grits of hand-sanding followed by multiple hand-rubbed coats of natural walnut oils and organic beeswax seal the grain with a silky, luminous depth. Complemented by high-resilience foam and plush royal velvet tufting, the piece becomes a serene sanctuary in your home.",
    image: "/Photos/523918079_749533938027872_7963866855478984573_n.jpg",
    aspect: "Royal Finish",
    metrics: [
      { label: "Hand Polish Layers", value: "5 Hand-Buffed Coats" },
      { label: "Upholstery Texture", value: "High-Resilience Velvet" },
      { label: "Sheen Luster", value: "Silk Amber Glow" },
    ],
    highlight: "Non-toxic organic oils enhance the natural timber grain without suffocating the wood.",
    quote: "“When you touch the polished armrest, you feel fifty years of craftsmanship welcoming you home.”",
  },
];

export default function StorytellingSection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Auto-advance chapters smoothly unless user is hovering/interacting
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % chapters.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = chapters[activeChapter];

  return (
    <section
      className="py-12 lg:py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F7F5F0 0%, #EFEBE3 50%, #F7F5F0 100%)",
      }}
      id="craft-story"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Ambient Spatial Lighting Accents */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-35"
        style={{ background: "radial-gradient(circle, #D4A373 0%, rgba(212,163,115,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, #80654D 0%, rgba(128,101,77,0) 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Story Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-soft-beige shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-walnut animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-walnut">
              Immersive Artisan Journey
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-2xl sm:text-3xl lg:text-4xl text-charcoal leading-tight mb-2.5"
          >
            The Journey of Royal Woodcraft
          </h2>
          <p className="text-warm-gray text-sm sm:text-base leading-relaxed">
            Every piece at Furniture King Nepal carries a multi-stage story of traditional Nepali carpentry,
            time-honored hand-carving, and heirloom-grade joinery.
          </p>

          {/* Interactive Chapter Timeline Tabs — Responsive 2-Col Mobile / 4-Col Desktop Grid */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 p-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-soft-beige shadow-xs max-w-2xl mx-auto">
            {chapters.map((ch, idx) => {
              const isActive = idx === activeChapter;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(idx)}
                  className={`w-full px-2.5 sm:px-3 py-2 rounded-lg text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-charcoal text-white shadow-md transform scale-[1.02]"
                      : "text-charcoal hover:bg-ivory/80"
                  }`}
                >
                  <span
                    className={`block text-[10px] uppercase font-mono tracking-wider ${
                      isActive ? "text-amber-300" : "text-walnut"
                    }`}
                  >
                    {ch.stage}
                  </span>
                  <span className="block text-xs font-semibold truncate mt-0.5">
                    {ch.title.split(" ")[0]} {ch.title.split(" ")[1] || ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Showcase Stage: Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: 3D Interactive Parallax Stage */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={8}
              perspective={1200}
              scale={1.015}
              glare={true}
              glareOpacity={0.25}
              className="rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white"
            >
              <div className="relative aspect-[16/11] max-h-[440px] w-full overflow-hidden bg-charcoal">
                {/* Visual Image with Smooth Crossfade */}
                <Image
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover transition-all duration-1000 ease-out scale-100 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating 3D Depth Badge */}
                <div
                  className="absolute top-5 left-5 z-20 transition-transform duration-300"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-xs font-medium tracking-wide">{current.aspect}</span>
                  </div>
                </div>

                {/* Bottom Overlay with Interactive Story Quote */}
                <div
                  className="absolute bottom-5 left-5 right-5 z-20 text-white"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <p className="text-xs sm:text-sm font-serif italic text-amber-100/95 max-w-lg mb-2 drop-shadow-sm">
                    {current.quote}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-white/20">
                    <span className="text-[11px] font-mono tracking-widest text-white/80">
                      STEP 0{current.id} / 0{chapters.length}
                    </span>
                    <div className="flex items-center gap-2">
                      {chapters.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setActiveChapter(dotIdx)}
                          aria-label={`Jump to step ${dotIdx + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                            dotIdx === activeChapter
                              ? "w-7 bg-amber-400"
                              : "w-2 bg-white/40 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Narrative Storytelling Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-walnut/10 border border-walnut/20 text-walnut text-[11px] font-semibold uppercase tracking-wider">
              {current.stage} • Heritage Craftsmanship
            </div>

            <h3
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl sm:text-3xl text-charcoal leading-snug"
            >
              {current.title}
            </h3>

            <p className="text-walnut font-medium text-sm leading-snug">
              {current.tagline}
            </p>

            <p className="text-warm-gray text-xs sm:text-sm leading-relaxed">
              {current.description}
            </p>

            {/* Artisan Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
              {current.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-2 sm:p-3 rounded-lg bg-white border border-soft-beige shadow-xs hover:border-walnut/40 transition-colors text-center sm:text-left"
                >
                  <span className="block text-[9px] sm:text-[10px] text-warm-gray uppercase tracking-wider mb-0.5 truncate">
                    {m.label}
                  </span>
                  <span className="block text-[11px] sm:text-xs font-semibold text-charcoal truncate">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quality Seal Banner */}
            <div className="p-3 rounded-lg bg-ivory/80 border border-soft-beige flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-walnut shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal/90 leading-relaxed font-medium">
                {current.highlight}
              </p>
            </div>

            {/* Navigation Actions */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() =>
                  setActiveChapter((prev) => (prev < chapters.length - 1 ? prev + 1 : 0))
                }
                className="btn-primary text-xs cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                style={{ padding: "0.7rem 1.5rem" }}
              >
                <span>
                  {activeChapter === chapters.length - 1 ? "Replay Craft Story" : "Next Craft Chapter"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#featured"
                className="text-xs text-walnut hover:underline font-semibold tracking-wide uppercase inline-flex items-center justify-center gap-1 py-1"
              >
                View Pieces
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
