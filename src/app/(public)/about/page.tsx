"use client";

import { Heart, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-6 w-6 text-teal-600" />,
      title: "Neuro-Affirming Stance",
      desc: "We support strengths-based, respectful care. We believe autistic and neurodivergent children don't need to be cured—they need to be understood, accommodated, and set up for success.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: "Family-Centered Solutions",
      desc: "Therapy and support work best when parents are active partners. We design tools to keep parents in the loop with goals and direct therapist messaging.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-lavender-600" />,
      title: "Quality and Security First",
      desc: "Our vetting team manually inspects educational credentials, licenses, and background checks so you can connect with ultimate confidence.",
    },
  ];

  return (
    <div className="flex-1 w-full bg-zinc-50/50 pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            Our Story & Mission
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Learn why we are building a safer, warmer space for neurodivergent children and their families to thrive.
          </p>
        </div>

        {/* Story Grid */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Born from Personal Experiences</h2>
            <div className="space-y-4 text-zinc-600 text-sm leading-relaxed">
              <p>
                Finding the right specialist for an autistic child is rarely simple. Parents often spend months on waitlists, scrolling through confusing listings, and scheduling consultation calls, only to find the therapist's style does not fit their child's sensory profile.
              </p>
              <p>
                ConnectNest was created to transform this journey. We replace long directories and generic profiles with a warm, kid-first matching tool that highlights the things that actually matter: sensory-friendly spaces, communication methodologies, and child-led approaches.
              </p>
              <p>
                Today, ConnectNest is a community where therapists, homeschool coaches, speech pathologists, and parents connect directly to celebrate and support each child's unique developmental timeline.
              </p>
            </div>
          </div>
          <div className="bg-primary-50 rounded-2xl p-8 flex flex-col justify-center border border-primary-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <blockquote className="text-md italic text-primary-950 font-medium mb-4">
              &ldquo;We don't focus on compliance. We focus on connection, communication, and confidence. When a child feels safe, growth happens naturally.&rdquo;
            </blockquote>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
              — ConnectNest Core Philosophy
            </span>
          </div>
        </div>

        {/* Our Values */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 flex flex-col gap-4">
                <div className="h-12 w-12 rounded-xl bg-zinc-50 flex items-center justify-center shadow-sm">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{val.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
