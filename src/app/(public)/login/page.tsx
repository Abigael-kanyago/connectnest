"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  AlertCircle,
  Loader2,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { authService } from "@/lib/supabase/services";
import BrandLogo from "@/components/BrandLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const { profile, error: loginError } = await authService.login(email, password);

      if (loginError) {
        setError(loginError);
        setLoading(false);
        return;
      }

      // Redirect based on role
      const role = profile?.role || 'parent';
      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else if (role === 'provider') {
        router.push('/dashboard/provider');
      } else {
        router.push('/dashboard/parent');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickDemo = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    setLoading(true);
    setError(null);

    try {
      const { profile } = await authService.login(demoEmail, "password123");
      const role = profile?.role || 'parent';
      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else if (role === 'provider') {
        router.push('/dashboard/provider');
      } else {
        router.push('/dashboard/parent');
      }
    } catch (err: any) {
      setError(err?.message || 'Quick login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-slate-50/70 pt-28 sm:pt-32 pb-24 flex flex-col items-center justify-center min-h-[85vh]">
      <div className="max-w-md w-full px-4">
        
        {/* Header Branding */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-4">
            <BrandLogo size="xl" showTagline={false} />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm">
            Sign in to access your parent portal, provider workspace, or admin console.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-2xl flex items-center gap-2.5 font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800 bg-white placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <span className="text-[11px] text-slate-400 font-medium hover:text-slate-600 cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800 bg-white placeholder:text-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 1-Click Quick Demo Login Section */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                1-Click Demo Login
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("sarah.miller@example.com")}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-terracotta-500/40 hover:bg-terracotta-50/50 text-left transition-all group flex flex-col items-center text-center gap-1"
              >
                <div className="w-7 h-7 rounded-lg bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-slate-700 group-hover:text-terracotta-700">Parent</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("sarah.jenkins@connectnest.org")}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-500/40 hover:bg-teal-50/50 text-left transition-all group flex flex-col items-center text-center gap-1"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-slate-700 group-hover:text-teal-700">Provider</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("admin@connectnest.org")}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-500/40 hover:bg-indigo-50/50 text-left transition-all group flex flex-col items-center text-center gap-1"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-slate-700 group-hover:text-indigo-700">Admin</span>
              </button>
            </div>
          </div>

          {/* Registration Options Footer */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2 text-xs text-slate-500">
            <div>
              Don&apos;t have an account yet?
            </div>
            <div className="flex justify-center gap-4 font-bold text-slate-800">
              <Link href="/register/parent" className="hover:text-terracotta-600 transition-colors">
                Register as Parent &rarr;
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/register/provider" className="hover:text-teal-600 transition-colors">
                Become a Provider &rarr;
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
