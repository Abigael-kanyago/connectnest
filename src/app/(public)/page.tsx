"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  Play,
  Zap,
  Users,
  GraduationCap,
  MessageSquare,
  Hand,
  Brain,
  Activity,
  CheckCircle2,
  UserCheck
} from "lucide-react";

const carouselPhotos = [
  {
    id: "homeschooling",
    title: "Individualized Homeschool Tutoring",
    subtitle: "Custom Pacing & Stress-Free Learning",
    image: "/image/homeschooling.png",
    tag: "Homeschooling",
    badgeColor: "bg-amber-500 text-white",
    desc: "Empathetic educators adapting curriculum to your child's unique interests and learning rhythm."
  },
  {
    id: "ot",
    title: "Occupational Therapy & Motor Skills",
    subtitle: "Sensory Integration & Daily Independence",
    image: "/image/ot.png",
    tag: "Occupational Therapy",
    badgeColor: "bg-teal-600 text-white",
    desc: "Hands-on fine motor practice, sensory tools, and ring-stacking exercises that build daily confidence."
  },
  {
    id: "speech",
    title: "Speech & Language Communication",
    subtitle: "Visual Cards & Expressive Growth",
    image: "/image/speech.png",
    tag: "Speech Therapy",
    badgeColor: "bg-slate-teal-600 text-white",
    desc: "Interactive vocabulary cards and conversational guidance helping every child communicate with joy."
  },
  {
    id: "bs",
    title: "Behavioral & Emotional Support",
    subtitle: "Calming Strategies & Positive Guidance",
    image: "/image/bs.png",
    tag: "Behavioral Support",
    badgeColor: "bg-terracotta-600 text-white",
    desc: "Safe, play-based environments equipped with calming strategy walls and emotional identification tools."
  },
  {
    id: "activity",
    title: "Adaptive Sports & Movement Therapy",
    subtitle: "Climbing Walls & Motor Coordination",
    image: "/image/activity.png",
    tag: "Adaptive Sports",
    badgeColor: "bg-emerald-600 text-white",
    desc: "Confidence-building movement coaches encouraging strength, balance, and proprioceptive growth."
  }
];

const categories = [
  { 
    name: "Homeschooling", 
    icon: GraduationCap, 
    image: "/image/homeschooling.png", 
    color: "from-amber-500 to-terracotta-500", 
    slug: "tutor", 
    desc: "Dedicated educators tailoring lessons to neurodivergent learning styles." 
  },
  { 
    name: "Speech Therapy", 
    icon: MessageSquare, 
    image: "/image/speech.png", 
    color: "from-slate-teal-500 to-slate-teal-700", 
    slug: "speech", 
    desc: "Card-based articulation, vocabulary building, and social speech skills." 
  },
  { 
    name: "Occupational Therapy", 
    icon: Hand, 
    image: "/image/ot.png", 
    color: "from-teal-500 to-emerald-600", 
    slug: "occupational", 
    desc: "Sensory integration, fine motor tools, and self-care independence." 
  },
  { 
    name: "Behavioral Support", 
    icon: Brain, 
    image: "/image/bs.png", 
    color: "from-terracotta-500 to-terracotta-700", 
    slug: "behavior", 
    desc: "Emotional self-regulation, calming routines, and positive guidance." 
  },
  { 
    name: "Physical & Adaptive", 
    icon: Activity, 
    image: "/image/activity.png", 
    color: "from-emerald-500 to-slate-teal-800", 
    slug: "activity", 
    desc: "Rock climbing, sensory swings, and motor skill development." 
  },
];

const steps = [
  {
    num: "01",
    title: "Tell us about your child",
    desc: "Share your child's unique needs, goals, and budget so we can find the perfect match.",
    color: "text-terracotta-400"
  },
  {
    num: "02",
    title: "We find your nest",
    desc: "Our team personally reviews your application to connect you with vetted specialists.",
    color: "text-amber-400"
  },
  {
    num: "03",
    title: "Meet & Schedule",
    desc: "Connect with providers who feel like family, and set up flexible in-person or remote sessions.",
    color: "text-emerald-400"
  },
  {
    num: "04",
    title: "Watch them soar",
    desc: "Begin your journey and watch your child thrive in a warm, understanding environment.",
    color: "text-teal-300"
  }
];

export default function HomePage() {
  const [hoveredService, setHoveredService] = useState(categories[0]);

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-teal-950 relative overflow-hidden text-white">
      
      {/* 1. FULL-BLEED HERO SECTION WITH BACKGROUND BACKDROP */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        
        {/* Full-Bleed Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/image/bs.png" 
            alt="Behavioral Support & Learning Environment" 
            className="w-full h-full object-cover filter contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-teal-950/85 via-slate-teal-950/75 to-slate-teal-950"></div>
          <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none"></div>
        </div>

        {/* Hero Headline & Content Container */}
        <div className="mx-auto max-w-5xl text-center relative z-20 space-y-6 flex flex-col items-center">

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-lg"
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
            className="text-base sm:text-xl lg:text-2xl text-slate-teal-100/90 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow"
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
              className="group relative bg-terracotta-500 hover:bg-terracotta-600 text-white font-extrabold text-base px-9 py-4 rounded-full flex items-center justify-center gap-2.5 transition-all active:scale-95 w-full sm:w-auto shadow-2xl shadow-terracotta-950/40"
            >
              <Heart className="h-5 w-5 fill-white/90" />
              <span>Request a Service</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>

      </section>

      {/* 2. AREAS OF EXPERTISE - WARM LIGHT CANVAS SECTION */}
      <section className="pt-10 pb-10 sm:pt-12 sm:pb-12 bg-[#FAF8F5] text-slate-900 relative overflow-hidden border-y border-amber-100/60">
        
        {/* Soft Ambient Radial Warm Tint */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Clean Section Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Specialized therapies <span className="text-terracotta-600">tailored to your child.</span>
              </h2>
            </div>
            
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-700 hover:text-terracotta-600 transition-colors shrink-0 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 text-terracotta-500" />
            </Link>
          </div>

          {/* 5 Crisp White Cards Grid — ALL VISIBLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 w-full">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href="/register/parent"
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:border-terracotta-400/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-2"
              >
                {/* Image Header */}
                <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4 shrink-0 bg-slate-100">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>

                {/* Title & Description */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-terracotta-600 transition-colors leading-snug mb-1.5">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-terracotta-600 group-hover:text-terracotta-700 transition-colors">
                    <span>Find Specialists</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* 4. HOW IT WORKS (FROSTED GLASS BENTO GRID) */}
      <section className="pt-10 pb-16 sm:pt-12 sm:pb-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              A simpler path to <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-400 via-amber-300 to-teal-300">
                extraordinary care.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-teal-200/90 font-medium max-w-xl mx-auto leading-relaxed">
              We've created a supportive pathway to help your child thrive. No confusing directories—just genuine, vetted connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel-dark rounded-[2.2rem] p-8 shadow-xl border border-white/20 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-terracotta-500/20 to-transparent rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className={`text-5xl font-black ${step.color} opacity-40 mb-6 font-mono tracking-tighter`}>
                  {step.num}
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-terracotta-300 transition-colors">{step.title}</h3>
                <p className="text-sm sm:text-base text-slate-teal-200/80 leading-relaxed font-medium">{step.desc}</p>
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
          
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-terracotta-50 border border-terracotta-200/60 text-xs font-black text-terracotta-700 uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            ConnectNest Community
          </span>
          
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
