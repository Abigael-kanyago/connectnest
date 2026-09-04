import Link from "next/link";
import { Heart, Mail, Phone, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white relative border-t border-slate-800 overflow-hidden">
      {/* Top Gradient Accent Line */}
      <div className="w-full h-1 bg-gradient-to-r from-terracotta-500 via-amber-400 to-teal-400" />

      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-terracotta-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

          {/* Logo and About */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <BrandLogo size="lg" theme="dark" showTagline={true} />
            <p className="text-sm leading-relaxed text-slate-300 max-w-md font-medium">
              Connecting families of autistic and neurodivergent children with verified therapists, tutors, and coaches. Warm, calming, and dedicated to child development.
            </p>
            <div className="mt-2 flex gap-3">
              <div className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-800 flex items-center justify-center hover:bg-terracotta-500/20 hover:border-terracotta-400 transition-colors cursor-pointer group">
                <div className="w-4 h-4 bg-terracotta-400 group-hover:bg-terracotta-300 rounded-[2px]" />
              </div>
              <div className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-800 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-400 transition-colors cursor-pointer group">
                <div className="w-4 h-4 bg-teal-400 group-hover:bg-teal-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Platform</h3>
            <ul className="space-y-3.5 text-sm font-medium">
              <li><Link href="/" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta-400" /> Home</Link></li>
              <li><Link href="/services" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta-400" /> Services</Link></li>
              <li><Link href="/register/parent" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta-400" /> Request Specialist</Link></li>
              <li><Link href="/become-provider" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta-400" /> Become Provider</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Resources</h3>
            <ul className="space-y-3.5 text-sm font-medium">
              <li><Link href="/about" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta-400" /> About Us</Link></li>
              <li><a href="https://www.neurodiversityhub.org/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta-400" /> Neurodiversity Hub <ExternalLink className="h-3 w-3 ml-1 opacity-60" /></a></li>
              <li><a href="https://www.autismspeaks.org/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta-400" /> Autism Resources <ExternalLink className="h-3 w-3 ml-1 opacity-60" /></a></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-terracotta-400" /> Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Get in Touch</h3>
            <ul className="space-y-3.5 text-sm font-medium">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0"><Mail className="h-4 w-4 text-amber-400" /></div>
                <span className="hover:text-white transition-colors cursor-pointer">hello@connectnest.co.ke</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0"><Phone className="h-4 w-4 text-teal-400" /></div>
                <span className="hover:text-white transition-colors cursor-pointer">0769251932/0757729411</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0"><MapPin className="h-4 w-4 text-terracotta-400" /></div>
                <span>Kahawa Sukari, Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-400">
            &copy; {new Date().getFullYear()} ConnectNest. All rights reserved. Made with love for neurodiverse families.
          </p>
          <div className="flex gap-6 text-xs font-bold text-slate-400">
            <Link href="/privacy" className="hover:text-amber-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
