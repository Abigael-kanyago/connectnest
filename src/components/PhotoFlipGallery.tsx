"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  RotateCw, 
  Sparkles, 
  GraduationCap, 
  MessageSquare, 
  Hand, 
  Activity, 
  Brain, 
  HeartHandshake
} from "lucide-react";

export interface FlipItem {
  tag: string;
  category: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  imagePos?: string;
  badgeBg: string;
  accentColor: string;
  icon: React.ElementType;
  slug: string;
}

export interface FlipColumn {
  id: string;
  columnLabel: string;
  front: FlipItem;
  back: FlipItem;
}

const defaultColumns: FlipColumn[] = [
  {
    id: "col-1",
    columnLabel: "Academics & Speech",
    front: {
      tag: "Homeschooling",
      category: "Adaptive Academics",
      title: "Individualized Tutoring",
      subtitle: "Pacing & Strengths-Based Learning",
      desc: "Empathetic educators tailoring lessons to neurodivergent learning rhythms and special interests.",
      image: "/image/home.jpeg",
      imagePos: "object-[center_20%]",
      badgeBg: "bg-amber-500/90 border-amber-300/40 text-white",
      accentColor: "text-amber-300",
      icon: GraduationCap,
      slug: "tutor",
    },
    back: {
      tag: "Speech Therapy",
      category: "Communication & Voice",
      title: "Speech & Articulation",
      subtitle: "Visual Cards & Expressive Growth",
      desc: "Play-based flashcards, vocal exercises, and conversational guidance building joyful communication.",
      image: "/image/speech2.jpeg",
      imagePos: "object-[center_25%]",
      badgeBg: "bg-slate-teal-600/90 border-teal-300/40 text-white",
      accentColor: "text-teal-300",
      icon: MessageSquare,
      slug: "speech",
    },
  },
  {
    id: "col-2",
    columnLabel: "Sensory & Physical",
    front: {
      tag: "Occupational Therapy",
      category: "Sensory Integration",
      title: "Motor Skills & Daily Care",
      subtitle: "Sensory Diets & Independence",
      desc: "Hands-on fine motor tools, gym ball therapy, and ring-stacking exercises that cultivate real confidence.",
      image: "/image/ot.jpeg",
      imagePos: "object-[center_35%]",
      badgeBg: "bg-teal-600/90 border-emerald-300/40 text-white",
      accentColor: "text-teal-300",
      icon: Hand,
      slug: "occupational",
    },
    back: {
      tag: "Adaptive Sports",
      category: "Movement & Aquatic",
      title: "Hydrotherapy & Movement",
      subtitle: "Water Safety & Coordination",
      desc: "Confidence-building swim coaching and aquatic movement therapy tailored to sensory regulation.",
      image: "/image/swimmo.jpeg",
      imagePos: "object-[center_45%]",
      badgeBg: "bg-emerald-600/90 border-emerald-300/40 text-white",
      accentColor: "text-emerald-300",
      icon: Activity,
      slug: "activity",
    },
  },
  {
    id: "col-3",
    columnLabel: "Behavioral & Social",
    front: {
      tag: "Behavioral Support",
      category: "Self-Regulation",
      title: "Positive Behavior Coaching",
      subtitle: "Emotional Regulation & Trust",
      desc: "Play-based emotional coaching, self-regulation routines, and collaborative, neuro-affirming guidance.",
      image: "/image/ott.jpeg",
      imagePos: "object-[center_40%]",
      badgeBg: "bg-terracotta-600/90 border-terracotta-300/40 text-white",
      accentColor: "text-terracotta-300",
      icon: Brain,
      slug: "behavior",
    },
    back: {
      tag: "Social Connection",
      category: "Peer Connection",
      title: "Collaborative Play Therapy",
      subtitle: "Authentic Peer Exploration",
      desc: "Hands-on creative play and cooperative building games encouraging spontaneous, authentic connection.",
      image: "/image/out.jpeg",
      imagePos: "object-[center_30%]",
      badgeBg: "bg-amber-600/90 border-amber-300/40 text-white",
      accentColor: "text-amber-300",
      icon: HeartHandshake,
      slug: "behavior",
    },
  },
];

export default function PhotoFlipGallery({
  columns = defaultColumns,
}: {
  columns?: FlipColumn[];
}) {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (isPaused) {
      clearAllTimeouts();
      return;
    }

    let isMounted = true;

    const runFlipSequence = () => {
      clearAllTimeouts();

      // Step 1: Flip to BACK staggered (Column 1 -> Column 2 -> Column 3)
      const t1 = setTimeout(() => {
        if (!isMounted) return;
        setFlipped((prev) => [true, prev[1], prev[2]]);
      }, 4000);

      const t2 = setTimeout(() => {
        if (!isMounted) return;
        setFlipped((prev) => [prev[0], true, prev[2]]);
      }, 4900);

      const t3 = setTimeout(() => {
        if (!isMounted) return;
        setFlipped(() => [true, true, true]);
      }, 5800);

      // Step 2: Hold BACK, then flip back to FRONT staggered
      const t4 = setTimeout(() => {
        if (!isMounted) return;
        setFlipped((prev) => [false, prev[1], prev[2]]);
      }, 10200);

      const t5 = setTimeout(() => {
        if (!isMounted) return;
        setFlipped((prev) => [prev[0], false, prev[2]]);
      }, 11100);

      const t6 = setTimeout(() => {
        if (!isMounted) return;
        setFlipped(() => [false, false, false]);
      }, 12000);

      // Step 3: Loop cycle
      const tLoop = setTimeout(() => {
        if (isMounted) {
          runFlipSequence();
        }
      }, 16200);

      timeoutsRef.current = [t1, t2, t3, t4, t5, t6, tLoop];
    };

    runFlipSequence();

    return () => {
      isMounted = false;
      clearAllTimeouts();
    };
  }, [isPaused]);

  const toggleFlip = (index: number) => {
    setFlipped((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const flipAllTo = (state: boolean) => {
    setFlipped([state, state, state]);
  };

  return (
    <section 
      className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] text-slate-900 relative overflow-hidden border-y border-amber-100/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft Ambient Radial Warm Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-terracotta-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-50 border border-terracotta-200/70 text-xs font-black uppercase tracking-wider text-terracotta-700">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>ConnectNest Visual Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Every child’s growth, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 via-amber-600 to-teal-700">
                captured in motion.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Discover our vetted therapies and tutoring programs. Watch the photographic panels flip to explore the full spectrum of individualized care.
            </p>
          </div>

          {/* Action & Manual Flip Controls */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => flipAllTo(!flipped.every(Boolean))}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-full border border-slate-200 shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              title="Flip all panels"
            >
              <RotateCw className="w-3.5 h-3.5 text-terracotta-600" />
              <span>{flipped.some(Boolean) ? "Show Front Views" : "Flip All Panels"}</span>
            </button>

            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </Link>
          </div>
        </div>

        {/* 3-COLUMN VERTICAL PHOTO FLIP TRIPTYCH */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full">
          {columns.map((col, idx) => {
            const isFlipped = flipped[idx];
            return (
              <div 
                key={col.id}
                className="perspective-container w-full h-[520px] sm:h-[580px] md:h-[620px] lg:h-[680px] xl:h-[720px] cursor-pointer group select-none"
                onClick={() => toggleFlip(idx)}
              >
                {/* 3D Flipper Element */}
                <div 
                  className={`flip-card-inner rounded-[2rem] sm:rounded-[2.4rem] shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    isFlipped ? "is-flipped" : ""
                  }`}
                >
                  
                  {/* ================= FRONT FACE ================= */}
                  <div className="flip-card-face rounded-[2rem] sm:rounded-[2.4rem] bg-slate-950 border border-slate-900/40">
                    {/* Background Photograph */}
                    <img 
                      src={col.front.image} 
                      alt={col.front.title}
                      className={`w-full h-full object-cover ${col.front.imagePos || "object-center"} filter contrast-[1.06] group-hover:scale-105 transition-transform duration-700 ease-out`}
                    />

                    {/* Gradient Scrims for Editorial Readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent h-32 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />

                    {/* Top Scrim Header */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md border ${col.front.badgeBg}`}>
                        <col.front.icon className="w-3.5 h-3.5" />
                        <span>{col.front.tag}</span>
                      </span>

                      {/* Manual Flip Hint Icon */}
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(idx);
                        }}
                        className="w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white/90 flex items-center justify-center hover:bg-terracotta-500 hover:text-white transition-all shadow-md group/btn"
                        title="Click to flip photo"
                      >
                        <RotateCw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
                      </button>
                    </div>

                    {/* Bottom Scrim Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 space-y-3">
                      <div>
                        <span className={`text-[11px] font-mono tracking-widest uppercase font-bold ${col.front.accentColor} block mb-1`}>
                          {col.front.subtitle}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
                          {col.front.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200/90 font-medium leading-relaxed line-clamp-3">
                        {col.front.desc}
                      </p>

                      {/* Bottom Action Footer */}
                      <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                        <Link
                          href="/register/parent"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white hover:text-terracotta-300 transition-colors group/link"
                        >
                          <span>Connect Specialist</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>

                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <span>Side 1/2</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 inline-block"></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ================= BACK FACE ================= */}
                  <div className="flip-card-face flip-card-face-back rounded-[2rem] sm:rounded-[2.4rem] bg-slate-950 border border-slate-900/40">
                    {/* Background Photograph */}
                    <img 
                      src={col.back.image} 
                      alt={col.back.title}
                      className={`w-full h-full object-cover ${col.back.imagePos || "object-center"} filter contrast-[1.06] group-hover:scale-105 transition-transform duration-700 ease-out`}
                    />

                    {/* Gradient Scrims for Editorial Readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent h-32 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent pointer-events-none" />

                    {/* Top Scrim Header */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md border ${col.back.badgeBg}`}>
                        <col.back.icon className="w-3.5 h-3.5" />
                        <span>{col.back.tag}</span>
                      </span>

                      {/* Manual Flip Hint Icon */}
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(idx);
                        }}
                        className="w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white/90 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all shadow-md group/btn"
                        title="Click to flip photo"
                      >
                        <RotateCw className="w-3.5 h-3.5 group-hover/btn:-rotate-180 transition-transform duration-500" />
                      </button>
                    </div>

                    {/* Bottom Scrim Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 space-y-3">
                      <div>
                        <span className={`text-[11px] font-mono tracking-widest uppercase font-bold ${col.back.accentColor} block mb-1`}>
                          {col.back.subtitle}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
                          {col.back.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200/90 font-medium leading-relaxed line-clamp-3">
                        {col.back.desc}
                      </p>

                      {/* Bottom Action Footer */}
                      <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                        <Link
                          href="/register/parent"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white hover:text-teal-300 transition-colors group/link"
                        >
                          <span>Connect Specialist</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>

                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <span>Side 2/2</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"></span>
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle Bottom Loop Indicator & Instructions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium border-t border-slate-200/70 pt-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta-500"></span>
            </span>
            <span>Auto-rotating photographic triptych • Click any panel to manually flip</span>
          </div>

          <div className="flex items-center gap-4">
            {columns.map((col, i) => (
              <button
                key={col.id}
                onClick={() => toggleFlip(i)}
                className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <span className={`w-2 h-2 rounded-full transition-colors ${flipped[i] ? "bg-teal-600" : "bg-terracotta-500"}`} />
                <span className="font-bold text-[11px]">
                  {flipped[i] ? col.back.tag : col.front.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
