"use client";

import { useState } from "react";
import { ChevronDown, Search, Heart, Sparkles, User, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState<"all" | "parent" | "provider">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: "parent",
      q: "How do I choose the best therapist for my child's sensory needs?",
      a: "On ConnectNest, every provider list details their workspace setup (e.g. sensory rooms, low-lighting options, noise-canceling headphones availability) and their communication methods. You can filter for these specific accommodations on the 'Find a Professional' search page."
    },
    {
      category: "parent",
      q: "Can I use health insurance to pay for sessions?",
      a: "Yes, many therapists listed on ConnectNest are in-network with major insurance providers or can provide superbills for out-of-network reimbursement. Insurance details and session pricing are clearly noted on each provider's profile page."
    },
    {
      category: "parent",
      q: "Is there a trial or initial consult session?",
      a: "Almost all our registered providers offer a free 15-minute introductory consult call to ensure their style is a good fit for your child before scheduling formal therapy sessions."
    },
    {
      category: "provider",
      q: "What credentials do I need to register as a provider?",
      a: "You must hold an active state license or professional certification in your field (e.g., OTR/L for Occupational Therapy, CCC-SLP for Speech Therapy, BCBA for Behavior Analysis). During registration, you will need to upload copies of these documents."
    },
    {
      category: "provider",
      q: "How does billing and payout work on ConnectNest?",
      a: "ConnectNest makes it easy to bill clients directly. You set your own rates, and parents can pay securely through the platform. Payouts are transferred automatically to your bank account."
    },
    {
      category: "general",
      q: "How does ConnectNest ensure data privacy?",
      a: "We take medical and child information privacy seriously. All child details, goal sheets, and message logs are protected using advanced encryption standards and comply with HIPAA guidelines."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesTab = activeTab === "all" || faq.category === activeTab;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex-1 w-full bg-zinc-50/50 pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Find answers to common questions about parent listings, provider credentials, and platform security.
          </p>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Tabs */}
          <div className="flex gap-2 bg-white p-1.5 rounded-full border border-zinc-100 shadow-sm w-full md:w-auto">
            <button
              onClick={() => { setActiveTab("all"); setOpenFaq(null); }}
              className={`flex-1 md:flex-none text-xs font-semibold px-5 py-2.5 rounded-full transition-colors ${
                activeTab === "all" ? "bg-primary-600 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => { setActiveTab("parent"); setOpenFaq(null); }}
              className={`flex-1 md:flex-none text-xs font-semibold px-5 py-2.5 rounded-full transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === "parent" ? "bg-teal-600 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Heart className="h-3.5 w-3.5" />
              For Parents
            </button>
            <button
              onClick={() => { setActiveTab("provider"); setOpenFaq(null); }}
              className={`flex-1 md:flex-none text-xs font-semibold px-5 py-2.5 rounded-full transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === "provider" ? "bg-lavender-600 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              For Providers
            </button>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 bg-white border border-zinc-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
            <Search className="h-4 w-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search FAQ..."
              className="outline-none text-sm w-full text-zinc-700"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpenFaq(null); }}
            />
          </div>
        </div>

        {/* FAQs List */}
        <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <div key={idx} className="border-b border-zinc-100 last:border-b-0 pb-4 last:pb-0">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-4 text-zinc-950 font-bold hover:text-primary-600 transition-colors focus:outline-none"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-zinc-600 text-sm leading-relaxed pb-2"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500">
              No questions match your current search queries. Try other keywords!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
