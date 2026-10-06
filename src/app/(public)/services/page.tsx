"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, 
  Search, 
  ShieldCheck, 
  Award, 
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
  Zap,
  Star,
  MessageSquare,
  Hand,
  GraduationCap,
  Brain,
  Activity
} from "lucide-react";

export default function ServicesPage() {
  const [selectedTag, setSelectedTag] = useState("all");

  const serviceCategories = [
    {
      id: "speech",
      title: "Speech & Language Pathology",
      subtitle: "Communication & Expression",
      icon: MessageSquare,
      image: "/image/speech2.jpeg",
      imagePos: "object-[center_25%]",
      desc: "For children working on verbal articulation, social-pragmatic language, AAC devices, or speech delays through gentle play therapy.",
      points: [
        "AAC Device Scaffolding",
        "Articulation & Phonology",
        "Social Communication Groups",
        "Sensory Articulation Games"
      ],
      badge: "SLP Certified",
      badgeColor: "bg-slate-teal-600 text-white",
      slug: "speech"
    },
    {
      id: "ot",
      title: "Occupational Therapy (OT)",
      subtitle: "Sensory & Motor Integration",
      icon: Hand,
      image: "/image/ot.jpeg",
      imagePos: "object-[center_35%]",
      desc: "Gross and fine motor development, sensory integration, and self-care skills validating sensory preferences without compliance pressure.",
      points: [
        "Fine Motor Skill Stacking",
        "Sensory Integration Diets",
        "Self-Regulation Support",
        "Feeding & Daily Self-Care"
      ],
      badge: "OTR/L Verified",
      badgeColor: "bg-teal-600 text-white",
      slug: "occupational"
    },
    {
      id: "tutor",
      title: "Adaptive Homeschool & Tutoring",
      subtitle: "Strengths-Based Academics",
      icon: GraduationCap,
      image: "/image/home.jpeg",
      imagePos: "object-[center_20%]",
      desc: "Specialized educators adapting lessons to ADHD, Dyslexia, and Autistic learning styles structured around children's special interests.",
      points: [
        "Special Interest Curriculum",
        "Stress-Free Learning Pacing",
        "Sensory Break Schedules",
        "Executive Function Guidance"
      ],
      badge: "Educator Approved",
      badgeColor: "bg-amber-500 text-white",
      slug: "tutor"
    },
    {
      id: "behavior",
      title: "Behavioral & Social Coaching",
      subtitle: "Self-Advocacy & Emotional Regulation",
      icon: Brain,
      image: "/image/ott.jpeg",
      imagePos: "object-[center_40%]",
      desc: "Positive-reinforcement coaching focused on building emotional self-regulation, identifying triggers, and authentic social connection.",
      points: [
        "Collaborative Problem Solving",
        "Calming Wall Chart Routines",
        "Healthy Boundary Setting",
        "Anti-Masking Affirmations"
      ],
      badge: "Positive Guidance",
      badgeColor: "bg-terracotta-600 text-white",
      slug: "behavior"
    },
    {
      id: "activity",
      title: "Physical & Adaptive Sports",
      subtitle: "Hydrotherapy & Motor Skills",
      icon: Activity,
      image: "/image/swimmo.jpeg",
      imagePos: "object-[center_45%]",
      desc: "Confidence-building sports coaches guiding children through adaptive swimming, hydrotherapy, and gross motor coordination.",
      points: [
        "Adaptive Swim Coaching",
        "Hydrotherapy & Water Safety",
        "Balance & Proprioception",
        "Confidence & Courage Support"
      ],
      badge: "Adaptive Coach",
      badgeColor: "bg-emerald-600 text-white",
      slug: "activity"
    }
  ];

  const filteredCategories = selectedTag === "all" 
    ? serviceCategories 
    : serviceCategories.filter(cat => cat.id === selectedTag);

  return (
    <div className="flex-1 w-full bg-slate-50/70 pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Streamlined Compact Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pediatric Services <span className="text-terracotta-600">& Therapies</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Vetted, child-led, neuro-affirming specialists verified by background checks.
            </p>
          </div>

          {/* Filter Pills Bar */}
          <div className="flex items-center flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                selectedTag === "all"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              All ({serviceCategories.length})
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedTag(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                  selectedTag === cat.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                <span>{cat.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Compact, Creative Grid — ALL CARDS FULLY VISIBLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-terracotta-400/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Header with Badge & Icon */}
                <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className={`w-full h-full object-cover ${cat.imagePos || "object-center"} group-hover:scale-105 transition-transform duration-500`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  
                  <span className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-md ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-terracotta-600 block mb-1">
                  {cat.subtitle}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-terracotta-600 transition-colors leading-snug mb-2">
                  {cat.title}
                </h3>
                
                <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4 line-clamp-3">
                  {cat.desc}
                </p>

                {/* 4 Feature Point Chips */}
                <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                  {cat.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 text-slate-700 text-[11px] font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Button */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/register/parent"
                  className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-extrabold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 group/btn shadow-sm"
                >
                  <span>Apply for Support</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust & Safety Verification Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-extrabold text-teal-300 mb-6 border border-white/15">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              ConnectNest Trust & Safety Guarantee
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              How we verify every provider in your nest.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-2xl">
              We understand that trust is everything when connecting a specialist with your child. Every profile undergoes rigorous vetting before onboarding.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <Award className="h-8 w-8 text-amber-400 mb-3" />
                <h3 className="font-extrabold text-sm mb-1">Credential Audits</h3>
                <p className="text-xs text-slate-300 font-medium">State medical board, OT/SLP board, and degree registry verification.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <UserCheck className="h-8 w-8 text-teal-400 mb-3" />
                <h3 className="font-extrabold text-sm mb-1">Identity & BG Checks</h3>
                <p className="text-xs text-slate-300 font-medium">National criminal database and identity screening for all specialists.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <Zap className="h-8 w-8 text-terracotta-400 mb-3" />
                <h3 className="font-extrabold text-sm mb-1">Neuro-Affirming Pledge</h3>
                <p className="text-xs text-slate-300 font-medium">Practitioners pledge child-led, positive reinforcement philosophies.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
