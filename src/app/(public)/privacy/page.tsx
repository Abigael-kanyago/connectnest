"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-700 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ConnectNest Privacy Commitment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-zinc-600 font-medium">
            Last updated: September 2026. How we protect family and provider privacy.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-100 space-y-8 text-zinc-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-600" />
              1. Information We Collect
            </h2>
            <p>
              ConnectNest collects minimal information necessary to coordinate child developmental support. For parents, this includes contact details, general child developmental milestones, and preferred session formats. For specialists, we collect professional licensing documentation, credentials, and verification references.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-terracotta-500" />
              2. Private Allocation & Matching
            </h2>
            <p>
              ConnectNest does not publish open public provider directories or public parent profiles. All application data, child developmental goals, and therapist credential files are reviewed privately by our administrative vetting team solely for match facilitation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              3. Data Security & Child Privacy
            </h2>
            <p>
              We take the privacy of children and families with extreme seriousness. We do not sell, rent, or monetize personal information. All communications between allocated therapists and families within our portal are encrypted in transit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary-600" />
              4. Contact Our Privacy Officer
            </h2>
            <p>
              If you have any questions or wish to request data updates or deletion, please reach out to our team at{" "}
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
