"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Heart, 
  Menu, 
  X, 
  User, 
  Briefcase, 
  ShieldAlert, 
  LayoutDashboard, 
  Home, 
  LogOut, 
  Bell, 
  Settings,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "@/lib/supabase/services";
import type { Profile } from "@/types/database.types";
import BrandLogo from "@/components/BrandLogo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New session request from Clara (Autism Specialist)" },
    { id: 2, text: "Verification status update: approved" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    authService.getCurrentProfile().then(p => {
      setProfile(p);
    });
  }, [pathname]);

  const getDashboardType = () => {
    if (pathname.includes("/parent")) return "parent";
    if (pathname.includes("/provider")) return "provider";
    return "admin";
  };

  const currentRole = getDashboardType();

  const menuItems = {
    parent: [
      { name: "Parent Dashboard", href: "/dashboard/parent", icon: <LayoutDashboard className="h-4.5 w-4.5" /> },
      { name: "Request Support", href: "/register/parent", icon: <Heart className="h-4.5 w-4.5 text-terracotta-500" /> },
      { name: "Services Guide", href: "/services", icon: <HelpCircle className="h-4.5 w-4.5" /> },
    ],
    provider: [
      { name: "Provider Dashboard", href: "/dashboard/provider", icon: <LayoutDashboard className="h-4.5 w-4.5" /> },
      { name: "Directory FAQ", href: "/faq", icon: <HelpCircle className="h-4.5 w-4.5" /> },
    ],
    admin: [
      { name: "Verification Panel", href: "/dashboard/admin", icon: <ShieldAlert className="h-4.5 w-4.5" /> },
    ],
  };

  const links = menuItems[currentRole] || [];

  const handleLogout = async () => {
    await authService.logout();
    router.push("/");
  };

  return (
    <div className="flex h-screen w-full bg-zinc-50 overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-zinc-150 shrink-0">
        {/* Brand */}
        <div className="h-16 px-6 border-b border-zinc-100 flex items-center">
          <BrandLogo size="sm" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
            Navigation Menu
          </div>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  active 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}

          <div className="my-6 border-t border-zinc-100 pt-6" />
          
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <Home className="h-4.5 w-4.5" />
            Back to Home
          </Link>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-xs text-primary-950 uppercase border border-zinc-200">
              {currentRole.substring(0, 2)}
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 capitalize truncate max-w-[130px]">
                {profile?.full_name || `${currentRole} User`}
              </div>
              <div className="text-[10px] text-zinc-400 truncate max-w-[130px]">
                {profile?.email || 'demo@connectnest.org'}
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-zinc-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Dashboard Header */}
        <header className="h-16 bg-white border-b border-zinc-150 px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-zinc-500 hover:bg-zinc-50 rounded-xl"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-bold text-zinc-800 capitalize">
              {currentRole} Dashboard Interface
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Button */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-zinc-500 hover:bg-zinc-50 rounded-xl relative transition-colors"
              >
                <Bell className="h-4.5 w-4.5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-teal-500 rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 z-20 border border-zinc-100"
                    >
                      <div className="px-3 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-50 mb-1 flex justify-between">
                        <span>Notifications</span>
                        <button 
                          onClick={() => setNotifications([])}
                          className="text-[9px] text-zinc-500 hover:text-zinc-800 normal-case font-semibold"
                        >
                          Clear all
                        </button>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <div key={n.id} className="p-3 text-[11px] text-zinc-600 hover:bg-zinc-50 rounded-xl border-b last:border-b-0 border-zinc-50/50">
                            {n.text}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-zinc-400 text-xs">No new notifications</div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            <span className="text-xs bg-teal-50 border border-teal-200 text-teal-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider select-none">
              Demo Portal
            </span>
          </div>
        </header>

        {/* Children Render */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-zinc-50/50">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 shadow-2xl flex flex-col justify-between md:hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div onClick={() => setIsMobileOpen(false)}>
                    <BrandLogo size="sm" />
                  </div>
                  <button onClick={() => setIsMobileOpen(false)} className="p-1 hover:bg-zinc-50 rounded-lg">
                    <X className="h-5 w-5 text-zinc-500" />
                  </button>
                </div>

                <nav className="space-y-1 pt-6">
                  {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                          active 
                            ? "bg-primary-50 text-primary-700" 
                            : "text-zinc-600 hover:bg-zinc-50"
                        }`}
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    );
                  })}
                  <div className="my-6 border-t border-zinc-150 pt-6" />
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-50"
                  >
                    <Home className="h-4.5 w-4.5" />
                    Back to Home
                  </Link>
                </nav>
              </div>

              <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-xs text-primary-950 uppercase border border-zinc-200">
                    {currentRole.substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 capitalize truncate max-w-[130px]">
                      {profile?.full_name || `${currentRole} User`}
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate max-w-[130px]">
                      {profile?.email || 'demo@connectnest.org'}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-zinc-400 hover:text-red-500 p-1.5 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
