"use client";

import Link from "next/link";
import { CheckCircle, ShieldCheck, Heart, Sparkles, TrendingUp, Calendar, Zap, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function BecomeProviderPage() {
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
      title: "Set your own rates",
      desc: "Keep 100% of your listed session fees. ConnectNest does not take cuts or charge commission on client appointments."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary-600" />,
      title: "Flexible scheduling blocks",
      desc: "Manage your client base entirely online. Update calendar slots, accept consultations, and coordinate schedules via your dashboard."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-lavender-600" />,
      title: "Build trusted credibility",
      desc: "Get our ConnectNest Verification Badge shown next to your listings after manual license and credential check audits."
    }
  ];

  return (
    <div className="flex-1 w-full bg-zinc-50/50 pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Area */}
        <div className="bg-gradient-to-br from-primary-900 to-teal-900 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-teal-300 mb-4">
              <Zap className="h-3.5 w-3.5" />
              Specialist, Therapist, & Coach Onboarding
            </span>
            <h1 className="text-3xl font-extrabold sm:text-4xl leading-tight">
              Grow your neuro-affirming practice
            </h1>
            <p className="mt-4 text-primary-100 text-sm leading-relaxed">
              Join ConnectNest to showcase your speech, occupational, academic therapies, or coaching activities (swimming, skating, art, singing) directly to families searching in your community.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/register/provider"
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors"
              >
                Apply to offer services
              </Link>
              <Link
                href="/faq?tab=provider"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors border border-white/10"
              >
                Read Provider FAQ
              </Link>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full md:w-80 flex flex-col gap-4 self-stretch justify-center">
            <div className="text-center font-bold text-xs uppercase tracking-wider text-teal-400">
              Provider Network Stats
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-extrabold text-white">100%</div>
                <div className="text-[10px] text-primary-200">Rate Ownership</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">4.9/5</div>
                <div className="text-[10px] text-primary-200">Parent Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 text-center mb-12">Why join our network?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm flex flex-col gap-4">
                <div className="h-12 w-12 rounded-xl bg-zinc-50 flex items-center justify-center shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-md font-bold text-zinc-900">{benefit.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-zinc-100 shadow-sm max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-sm">
            <FileText className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">Application process is straightforward</h2>
          <p className="text-xs text-zinc-500 max-w-md leading-relaxed">
            Fill out the 4-step provider registration form with your license files, session availability, and profile tags. Our vetting team will review your application within 2-3 business days.
          </p>
          <Link
            href="/register/provider"
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-sm transition-colors"
          >
            Apply to offer services
          </Link>
        </div>

      </div>
    </div>
  );
}
