"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Heart, 
  Menu, 
  X, 
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-0" 
        : "bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-0.5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-bold transition-all duration-200 rounded-full ${
                    active
                      ? "text-teal-700 bg-teal-50/90 font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button: Request Specialist */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/register/parent"
              className="flex items-center gap-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 px-5 py-2.5 text-xs font-extrabold text-white transition-all duration-200 shadow-md shadow-terracotta-900/10 active:scale-95"
            >
              <Heart className="h-3.5 w-3.5 fill-white text-white" />
              <span>Request Specialist</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white/98 backdrop-blur-2xl px-4 py-5"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-base font-bold transition-colors ${
                    isActive(link.href)
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="my-3 border-t border-slate-100" />
              
              <Link
                href="/register/parent"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-terracotta-500 text-white px-4 py-3.5 text-sm font-extrabold shadow-md"
              >
                <Heart className="h-4 w-4 fill-white text-white" />
                <span>Request Specialist</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
