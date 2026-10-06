"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, 
  ArrowRight,
  UserCheck
} from "lucide-react";
import HeroFlipBackground from "@/components/HeroFlipBackground";
import ChildsWorldExperience from "@/components/ChildsWorldExperience";

const steps = [
  {
    num: "01",
    title: "Tell us about your child",
    desc: "Share your child's unique needs, goals, and budget so we can find the perfect match.",
    color: "text-terracotta-600"
  },
  {
    num: "02",
    title: "We find your nest",
    desc: "Our team personally reviews your application to connect you with vetted specialists.",
    color: "text-amber-600"
  },
  {
    num: "03",
    title: "Meet & Schedule",
    desc: "Connect with providers who feel like family, and set up flexible in-person or remote sessions.",
    color: "text-teal-700"
  },
  {
    num: "04",
    title: "Watch them soar",
    desc: "Begin your journey and watch your child thrive in a warm, understanding environment.",
    color: "text-emerald-700"
  }
];

export default function HomePage() {

  return (
    <div className="flex-1 w-full flex flex-col bg-[#FAF8F5] relative overflow-hidden text-slate-900">
      
      {/* 1. FULL-BLEED HERO SECTION WITH 3D FLIP BACKGROUND BACKDROP */}
      <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 min-h-[540px] sm:min-h-[580px] flex items-center justify-center text-white">
        
        {/* Full-Bleed 3-Column Vertical Background Layer */}
        <HeroFlipBackground />

        {/* Hero Headline & Content Container */}
        <div className="mx-auto max-w-5xl text-center relative z-20 space-y-6 flex flex-col items-center">

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-2xl"
          >
            Connecting every child to <br className="hidden sm:block"/>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-terracotta-400 via-amber-300 to-teal-300 drop-shadow-sm">
                a place they belong.
              </span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-terracotta-500/40 -z-10 -rotate-1 rounded-sm" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl lg:text-2xl text-slate-teal-100/95 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md"
          >
            Trusted tutors, speech specialists, occupational therapists, and activity coaches—working together to empower neurodivergent children.
          </motion.p>

          {/* Hero Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
          >
            <Link
              href="/register/parent"
              className="group relative bg-terracotta-500 hover:bg-terracotta-600 text-white font-extrabold text-base px-9 py-4 rounded-full flex items-center justify-center gap-2.5 transition-all active:scale-95 w-full sm:w-auto shadow-2xl shadow-terracotta-950/50"
            >
              <Heart className="h-5 w-5 fill-white/90" />
              <span>Request a Service</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>

      </section>

      {/* 2. A CHILD'S WORLD IS BIGGER THAN A DIAGNOSIS - LIVING COLLAGE EXPERIENCE */}
      <ChildsWorldExperience />



      {/* 4. HOW IT WORKS (WARM EDITORIAL BENTO GRID) */}
      <section className="pt-8 pb-14 sm:pt-10 sm:pb-18 bg-[#FAF8F5] relative overflow-hidden border-t border-amber-200/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9 space-y-2.5">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              A simpler path to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 via-amber-600 to-teal-700">
                extraordinary care.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
              We&apos;ve created a supportive pathway to help your child thrive. No confusing directories—just genuine, vetted connections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl border border-stone-200/80 hover:border-terracotta-300 transition-all duration-300 group hover:-translate-y-1 flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500" />
                <div className={`text-3xl sm:text-4xl font-black ${step.color} opacity-85 mb-3 font-mono tracking-tighter`}>
                  {step.num}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-terracotta-600 transition-colors leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLEAN 2-BUTTON CTA SECTION ON WARM CANVAS */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] text-slate-900 border-t border-amber-100/60 relative overflow-hidden">
        
        {/* Soft Ambient Radial Warm Tint */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-terracotta-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Ready to find <span className="text-terracotta-600">your nest?</span>
          </h2>
          
          <p className="text-base sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Whether you are searching for dedicated child support or offering specialized therapy, we are here to connect you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register/parent"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-extrabold text-base px-9 py-4.5 rounded-full inline-flex items-center justify-center gap-2.5 shadow-xl shadow-terracotta-900/20 transition-all hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto min-w-[220px]"
            >
              <Heart className="w-5 h-5 fill-white/90" />
              <span>Apply as a Parent</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/register/provider"
              className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base px-9 py-4.5 rounded-full inline-flex items-center justify-center gap-2.5 shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto min-w-[220px]"
            >
              <UserCheck className="w-5 h-5 text-teal-300" />
              <span>Apply as a Provider</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
