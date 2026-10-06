"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  GraduationCap, 
  Activity, 
  Brain, 
  Compass, 
  Hand
} from "lucide-react";

export interface LifeDimension {
  id: string;
  verb: string;
  category: string;
  headline: string;
  quote: string;
  image: string;
  imagePos: string;
  rotation: number;
  desktopPos: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    height: string;
  };
  accentColor: string;
  badgeBg: string;
  icon: React.ElementType;
  slug: string;
}

const dimensions: LifeDimension[] = [
  {
    id: "talk",
    verb: "TALK.",
    category: "Speech & Language",
    headline: "Finding Joy in Expression",
    quote: "Helping children express themselves, articulate feelings, and be deeply understood.",
    image: "/image/speech2.jpeg",
    imagePos: "object-[center_25%]",
    rotation: -2.5,
    desktopPos: {
      top: "2%",
      left: "1.5%",
      width: "230px",
      height: "290px",
    },
    accentColor: "#0f766e",
    badgeBg: "bg-slate-teal-700/95 text-white",
    icon: MessageSquare,
    slug: "speech",
  },
  {
    id: "learn",
    verb: "LEARN.",
    category: "Homeschool & Tutoring",
    headline: "Curiosity at Their Own Pace",
    quote: "Tailoring lessons to special interests, attention rhythms, and neurodivergent strengths.",
    image: "/image/home.jpeg",
    imagePos: "object-[center_20%]",
    rotation: 2.5,
    desktopPos: {
      top: "2%",
      right: "1.5%",
      width: "230px",
      height: "290px",
    },
    accentColor: "#c86d44",
    badgeBg: "bg-amber-600/95 text-white",
    icon: GraduationCap,
    slug: "tutor",
  },
  {
    id: "explore",
    verb: "EXPLORE.",
    category: "Outdoor Exploration & Nature",
    headline: "Freedom, Wonder & Discovery",
    quote: "Outdoor open-field adventures, sensory nature play, and unstructured wonder where curiosity leads the way.",
    image: "/image/Outdoor.jpeg",
    imagePos: "object-[center_50%]",
    rotation: -1.5,
    desktopPos: {
      top: "32%",
      left: "0.5%",
      width: "270px",
      height: "350px",
    },
    accentColor: "#d97706",
    badgeBg: "bg-amber-500/95 text-white",
    icon: Compass,
    slug: "activity",
  },
  {
    id: "grow",
    verb: "GROW.",
    category: "Occupational & Sensory Support",
    headline: "Independence in Everyday Life",
    quote: "Sensory integration, fine motor exercises, and daily routines that spark natural confidence.",
    image: "/image/ot.jpeg",
    imagePos: "object-[center_35%]",
    rotation: 2,
    desktopPos: {
      top: "39%",
      right: "0.5%",
      width: "220px",
      height: "280px",
    },
    accentColor: "#0d9488",
    badgeBg: "bg-teal-600/95 text-white",
    icon: Hand,
    slug: "occupational",
  },
  {
    id: "move",
    verb: "MOVE.",
    category: "Adaptive Sports & Swimming",
    headline: "Courage, Balance & Freedom",
    quote: "Building physical confidence, proprioception, and water safety in sensory-friendly spaces.",
    image: "/image/swimmo.jpeg",
    imagePos: "object-[center_45%]",
    rotation: -3,
    desktopPos: {
      bottom: "2%",
      left: "3%",
      width: "205px",
      height: "260px",
    },
    accentColor: "#059669",
    badgeBg: "bg-emerald-600/95 text-white",
    icon: Activity,
    slug: "activity",
  },
  {
    id: "connect",
    verb: "CONNECT.",
    category: "Behavioral & Social Coaching",
    headline: "Emotional Trust & Connection",
    quote: "Positive guidance that honours emotional safety, collaborative problem solving, and authentic trust.",
    image: "/image/ott.jpeg",
    imagePos: "object-[center_40%]",
    rotation: 2.5,
    desktopPos: {
      bottom: "2%",
      right: "3%",
      width: "240px",
      height: "300px",
    },
    accentColor: "#b55732",
    badgeBg: "bg-terracotta-600/95 text-white",
    icon: Brain,
    slug: "behavior",
  },
];

export default function ChildsWorldExperience() {
  const [activeIdx, setActiveIdx] = useState<number>(2); // Default to EXPLORE (Outdoor.jpeg)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const activeDim = dimensions[activeIdx];

  // Auto-cycle through dimensions when user isn't interacting
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % dimensions.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section 
      className="relative py-12 sm:py-16 lg:py-20 bg-[#FAF7F2] text-slate-900 overflow-hidden border-y border-amber-200/50"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Soft Ambient Warm Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* DESKTOP LIVING COLLAGE & EDITORIAL TYPOGRAPHY COMPOSITION (lg+) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative min-h-[690px] w-full">
          
          {/* FLOATING VIBRANT FULL-COLOR PHOTOGRAPHS LAYER */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {dimensions.map((dim, idx) => {
              const isActive = activeIdx === idx;

              return (
                <motion.div
                  key={dim.id}
                  animate={{
                    scale: isActive ? 1.08 : 0.96,
                    opacity: 1, // Full 100% crisp visibility, NEVER faded
                    rotate: isActive ? 0 : dim.rotation,
                    zIndex: isActive ? 30 : 10,
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  style={{
                    position: "absolute",
                    top: dim.desktopPos.top,
                    bottom: dim.desktopPos.bottom,
                    left: dim.desktopPos.left,
                    right: dim.desktopPos.right,
                    width: dim.desktopPos.width,
                    height: dim.desktopPos.height,
                  }}
                  className={`pointer-events-auto cursor-pointer rounded-3xl overflow-hidden border-4 border-white transition-all duration-300 ${
                    isActive 
                      ? "shadow-2xl ring-4 ring-terracotta-500/90" 
                      : "shadow-xl hover:shadow-2xl hover:scale-100"
                  }`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <img
                    src={dim.image}
                    alt={dim.headline}
                    className={`w-full h-full object-cover ${dim.imagePos} select-none filter contrast-[1.06] saturate-[1.08]`}
                  />

                  {/* Top-corner Category Tag on each photo */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md backdrop-blur-md ${dim.badgeBg}`}>
                      <dim.icon className="w-3 h-3 text-amber-300" />
                      <span>{dim.verb.replace('.', '')}</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CENTRAL MANIFESTO & INTERACTIVE WORD CONSTELLATION (SPACIOUS, NO OVERLAPPING BOXES) */}
          <div className="relative z-20 flex flex-col items-center justify-center min-h-[690px] text-center max-w-2xl mx-auto px-4 pointer-events-auto">

            {/* Core Manifesto Statement */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-8 select-none">
              A child’s world is <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 via-amber-600 to-teal-700">
                  bigger than a diagnosis.
                </span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-200/60 -z-10 rounded-sm -rotate-0.5" />
              </span>
            </h2>

            {/* THE 6 INTERACTIVE LIFE CONCEPTS (WORDS) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-8 max-w-xl">
              {dimensions.map((dim, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={dim.id}
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl text-lg sm:text-xl font-black tracking-tight transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-white bg-slate-900 shadow-lg scale-105"
                        : "text-slate-700 bg-white/90 hover:bg-white hover:text-slate-900 border border-stone-200/80 shadow-xs hover:scale-102"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{dim.verb}</span>
                      {isActive && (
                        <motion.span
                          layoutId="active-dot"
                          className="w-2 h-2 rounded-full bg-amber-400"
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CLEAN, ELEGANT EDITORIAL STATEMENT (NO BULKY CARD BOX) */}
            <div className="w-full max-w-lg min-h-[90px] flex flex-col items-center justify-center space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDim.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed italic">
                    &ldquo;{activeDim.quote}&rdquo;
                  </p>

                  <div className="pt-1 flex items-center justify-center gap-4 text-xs font-extrabold">
                    <span className="text-terracotta-600 uppercase tracking-wider font-mono">
                      {activeDim.category}
                    </span>
                    <span className="text-stone-300">•</span>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-slate-900 hover:text-terracotta-600 transition-colors group"
                    >
                      <span>Explore Services</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET LIVING EXPERIENCE (Below lg) */}
        {/* ========================================================================= */}
        <div className="lg:hidden space-y-7">
          
          {/* Header & Manifesto */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              A child’s world is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 via-amber-600 to-teal-700">
                bigger than a diagnosis.
              </span>
            </h2>
          </div>

          {/* Interactive Words Scrolling Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth px-1">
            {dimensions.map((dim, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={dim.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-4 py-2 rounded-2xl text-sm font-black whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md scale-102"
                      : "bg-white text-slate-700 border border-stone-200 shadow-xs"
                  }`}
                >
                  {dim.verb}
                </button>
              );
            })}
          </div>

          {/* Clean Mobile Full-Color Photo Viewport */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDim.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white flex flex-col"
            >
              {/* Photo Viewport */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src={activeDim.image}
                  alt={activeDim.headline}
                  className={`w-full h-full object-cover ${activeDim.imagePos} filter contrast-[1.06] saturate-[1.08]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 z-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md ${activeDim.badgeBg}`}>
                    <activeDim.icon className="w-3.5 h-3.5" />
                    <span>{activeDim.verb}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-amber-300 block mb-1">
                    {activeDim.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {activeDim.headline}
                  </h3>
                </div>
              </div>

              {/* Text & Action */}
              <div className="p-5 space-y-3">
                <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                  &ldquo;{activeDim.quote}&rdquo;
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-terracotta-600 hover:text-terracotta-700"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/register/parent"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xs"
                  >
                    <span>Find Providers</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mini Pagination / Dots */}
          <div className="flex items-center justify-center gap-2 pt-1">
            {dimensions.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  activeIdx === i ? "w-6 bg-terracotta-500" : "w-2 bg-stone-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
