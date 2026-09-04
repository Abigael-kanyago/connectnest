"use client";

import Link from "next/link";
import { FileCheck, Shield, HelpCircle, ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="flex-1 w-full bg-zinc-50/50 pt-28 sm:pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700 mb-4">
            <FileCheck className="w-3.5 h-3.5" />
            <span>ConnectNest Platform Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-zinc-600 font-medium">
            Last updated: September 2026. Terms governing the use of ConnectNest.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-100 space-y-8 text-zinc-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-600" />
              1. Platform Purpose & Community Standards
            </h2>
            <p>
              ConnectNest connects families with qualified neuro-affirming specialists, therapists, and tutors. Users agree to engage with respect, dignity, and a positive mindset prioritizing the safety and comfort of each child.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-terracotta-500" />
              2. Specialist Credentials & Verification
            </h2>
            <p>
              All service providers submitted to ConnectNest undergo review of licensing, certifications, and background verification. Providers represent and warrant that their submitted credentials are valid and active.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              3. Rates & Sessions
            </h2>
            <p>
              ConnectNest facilitates connections based on parental goals and stated hourly budgets in KSh. Direct session agreements, schedules, and clinical guidance are managed cooperatively between vetted specialists and guardians.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900">
              4. Questions & Support
            </h2>
            <p>
              For inquiries regarding these terms, please contact us at{" "}
              <a href="mailto:hello@connectnest.co.ke" className="text-teal-600 font-bold hover:underline">
                hello@connectnest.co.ke
              </a>{" "}
              or via our{" "}
              <Link href="/contact" className="text-terracotta-600 font-bold hover:underline">
                Contact Page
              </Link>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
