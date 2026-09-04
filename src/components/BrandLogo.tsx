import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showTagline?: boolean;
  theme?: "light" | "dark";
  asLink?: boolean;
  href?: string;
  className?: string;
  variant?: "horizontal" | "full" | "icon-only";
}

export function LogoIcon({ 
  className = "w-8 h-8",
  theme = "light"
}: { 
  className?: string;
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";
  
  return (
    <div className={`relative overflow-hidden rounded-full flex items-center justify-center ${className} ${isDark ? "bg-[#FAF7F2]/95 ring-1 ring-white/20" : "bg-[#FAF7F2]"}`}>
      <Image
        src="/logo.png"
        alt="ConnectNest Logo Emblem"
        width={160}
        height={160}
        className="w-full h-full object-cover object-[50%_25%] scale-[1.58] select-none"
        priority
      />
    </div>
  );
}

export default function BrandLogo({
  size = "md",
  showText = true,
  showTagline = false,
  theme = "light",
  asLink = true,
  href = "/",
  className = "",
  variant = "horizontal",
}: BrandLogoProps) {
  const isDark = theme === "dark";

  // Size configurations
  const iconSizeMap = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14",
  };

  const badgeSizeMap = {
    sm: "w-9 h-9 p-0.5 rounded-xl",
    md: "w-11 h-11 p-1 rounded-2xl",
    lg: "w-13 h-13 p-1 rounded-2xl",
    xl: "w-16 h-16 p-1.5 rounded-3xl",
  };

  const titleSizeMap = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const badgeBg = isDark
    ? "bg-slate-800/90 border border-slate-700/80 shadow-md ring-1 ring-white/10"
    : "bg-[#FAF7F2] border border-stone-200/80 shadow-xs ring-1 ring-black/5";

  const textColor = isDark ? "text-white" : "text-[#224F50]";
  const terracottaColor = isDark ? "text-amber-400" : "text-[#C86D44]";

  if (variant === "full") {
    const content = (
      <div className={`flex flex-col items-center gap-2 group transition-transform duration-300 ${className}`}>
        <div className="relative overflow-hidden rounded-2xl shadow-sm border border-stone-200/60 bg-[#FAF7F2] p-2 hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
          <Image
            src="/logo.png"
            alt="ConnectNest - The right support. Right when you need it."
            width={320}
            height={320}
            className="w-auto h-auto max-h-36 sm:max-h-44 object-contain rounded-xl"
            priority
          />
        </div>
      </div>
    );

    if (asLink) {
      return (
        <Link href={href} className="inline-flex items-center no-underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-400 rounded-2xl">
          {content}
        </Link>
      );
    }
    return content;
  }

  const content = (
    <div className={`inline-flex items-center gap-3 group transition-transform duration-300 ${className}`}>
      {/* Crisp Shared Logo Emblem Badge */}
      <div className={`flex items-center justify-center shrink-0 ${badgeSizeMap[size]} ${badgeBg} transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}>
        <LogoIcon className={iconSizeMap[size]} theme={theme} />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center select-none">
          <span className={`${titleSizeMap[size]} font-serif font-black tracking-tight ${textColor} leading-tight`}>
            Connect<span className={`ml-1 font-serif ${terracottaColor}`}>Nest</span>
          </span>
          {showTagline && (
            <span className={`text-[11px] sm:text-xs font-medium tracking-wide mt-0.5 ${isDark ? "text-amber-300/90" : "text-stone-600"}`}>
              The right support. Right when you need it.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="inline-flex items-center no-underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-terracotta-400 rounded-2xl">
        {content}
      </Link>
    );
  }

  return content;
}

