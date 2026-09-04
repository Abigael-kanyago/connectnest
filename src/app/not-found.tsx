"use client";

import Link from "next/link";
import { Heart, Home, ArrowLeft, Search, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
        
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-terracotta-50 border border-terracotta-100 flex items-center justify-center text-terracotta-600 mx-auto shadow-sm">
          <Heart className="w-8 h-8 fill-terracotta-500/20 text-terracotta-600" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black text-slate-900 tracking-tight block">404</span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            We couldn't find the page you're looking for. It may have been moved or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/"
            className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-extrabold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md shadow-terracotta-900/20 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/services"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs py-2.5 px-6 rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>Contact Support</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
