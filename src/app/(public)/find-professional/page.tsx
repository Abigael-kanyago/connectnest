"use client";

import Link from "next/link";
import { ShieldCheck, Heart, UserCheck, ArrowRight, Lock } from "lucide-react";

export default function FindProfessionalPage() {
  return (
    <div className="flex-1 w-full bg-slate-50/70 pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Admin Matching Model Card */}
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-xl text-center space-y-8 relative overflow-hidden">
          
          <div className="h-16 w-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8 text-teal-600" />
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-black text-slate-700 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Private Admin Allocation Model
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Matched & Allocated by <br className="hidden sm:block"/>
              <span className="text-terracotta-600">ConnectNest Clinical Admin</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              ConnectNest does not publish open public provider directories. Parents submit their child's support goals and target budget. Our admin team reviews verified credentials and allocates the perfect specialist directly.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-3xl mx-auto">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-2">
              <div className="text-xs font-black text-terracotta-600 uppercase tracking-wider">Step 1</div>
              <h3 className="font-extrabold text-sm text-slate-900">Parent Applies & States Price</h3>
              <p className="text-xs text-slate-500 font-medium leading-normal">Specify your child's goals, preferred schedule, and target hourly rate.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-2">
              <div className="text-xs font-black text-teal-600 uppercase tracking-wider">Step 2</div>
              <h3 className="font-extrabold text-sm text-slate-900">Provider Vetting to Admin</h3>
              <p className="text-xs text-slate-500 font-medium leading-normal">Provider applications and license files are reviewed by Admin only.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-2">
              <div className="text-xs font-black text-amber-600 uppercase tracking-wider">Step 3</div>
              <h3 className="font-extrabold text-sm text-slate-900">Admin Allocates Match</h3>
              <p className="text-xs text-slate-500 font-medium leading-normal">Admin matches parents and providers directly through the dashboard.</p>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-100">
            <Link
              href="/register/parent"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-extrabold text-sm px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 shadow-lg shadow-terracotta-900/20 transition-all w-full sm:w-auto min-w-[220px]"
            >
              <Heart className="w-4 h-4 fill-white/90" />
              <span>Apply as a Parent</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register/provider"
              className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 shadow-lg shadow-slate-900/20 transition-all w-full sm:w-auto min-w-[220px]"
            >
              <UserCheck className="w-4 h-4 text-teal-300" />
              <span>Become a Provider</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
