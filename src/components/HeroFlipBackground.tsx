"use client";

import React from "react";

interface HeroColumn {
  id: string;
  image: string;
  imagePos: string;
  alt: string;
}

const heroColumns: HeroColumn[] = [
  {
    id: "hero-col-1",
    image: "/image/home.jpeg",
    imagePos: "object-[center_20%]",
    alt: "Individualized Tutoring and Homeschooling",
  },
  {
    id: "hero-col-2",
    image: "/image/ot.jpeg",
    imagePos: "object-[center_35%]",
    alt: "Occupational Therapy and Motor Skills",
  },
  {
    id: "hero-col-3",
    image: "/image/Outdoor.jpeg",
    imagePos: "object-[center_50%]",
    alt: "Outdoor Exploration and Child Wonder",
  },
];

export default function HeroFlipBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* 3-COLUMN VERTICAL PHOTO TRIPTYCH BACKDROP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-3 w-full h-full p-0 sm:p-1 scale-[1.01]">
        {heroColumns.map((col) => (
          <div 
            key={col.id} 
            className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
          >
            <img 
              src={col.image} 
              alt={col.alt}
              className={`w-full h-full object-cover ${col.imagePos} filter contrast-[1.04] brightness-100`}
            />
          </div>
        ))}
      </div>

      {/* Gentle, soft translucent scrim so photos remain bright, vivid and natural */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}

