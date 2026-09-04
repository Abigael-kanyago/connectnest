"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Clock, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Loader2,
  DollarSign,
  User,
  Phone,
  Mail,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { parentService } from "@/lib/supabase/services";

export default function RequestServicePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Step 1: Parent Information
    fullName: "",
    email: "",
    phone: "",
    location: "Nairobi",
    // Step 2: Child Details
    childName: "",
    childAge: "",
    interests: "",
    diagnosisTags: [] as string[],
    // Step 3: Service & Budget
    requiredServices: ["Speech Therapy"] as string[],
    sessionMode: "both" as "online" | "in-person" | "both",
    budgetPerHour: 3000 as string | number,
    notes: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const diagnosisOptions = [
    "Autism Spectrum", 
    "ADHD / Focus needs", 
    "Sensory Processing", 
    "Speech & Language Delay", 
    "Fine Motor & Handwriting", 
    "Down Syndrome",
    "Social Communication"
  ];

  const serviceOptions = [
    "Speech Therapy", 
    "Occupational Therapy (OT)", 
    "Behavioral Coaching", 
    "Sensory Integration",
    "Special Education Tutoring", 
    "Swimming Therapy", 
    "Art Therapy", 
    "Music & Expression"
  ];

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email) {
        setError("Please enter your name and email address.");
        return;
      }
      setError(null);
    }
    if (step === 2) {
      if (!formData.childName || !formData.childAge) {
        setError("Please enter your child's name and age.");
        return;
      }
      setError(null);
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const handlePrev = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleDiagnosisToggle = (opt: string) => {
    setFormData((prev) => ({
      ...prev,
      diagnosisTags: prev.diagnosisTags.includes(opt)
        ? prev.diagnosisTags.filter((x) => x !== opt)
        : [...prev.diagnosisTags, opt],
    }));
  };

  const handleServiceToggle = (opt: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredServices: prev.requiredServices.includes(opt)
        ? prev.requiredServices.filter((x) => x !== opt)
        : [...prev.requiredServices, opt],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await parentService.submitIntakeRequest({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        childName: formData.childName || "Child",
        childAge: Number(formData.childAge) || 5,
        diagnosisTags: formData.diagnosisTags,
        interests: formData.interests,
        requiredServices: formData.requiredServices,
        sessionMode: formData.sessionMode,
        location: formData.location || "Nairobi",
        budgetPerHour: Number(formData.budgetPerHour) || 3000,
        notes: formData.notes
      });

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/parent");
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "Failed to submit request.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-slate-50/60 pt-28 sm:pt-32 pb-24 flex flex-col items-center justify-start">
      <div className="max-w-2xl w-full px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-700 text-xs font-bold mb-3 border border-terracotta-200/60">
            <Heart className="w-3.5 h-3.5 fill-terracotta-500 text-terracotta-500" />
            <span>Frictionless Clinical Intake</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Request Specialist Matching
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Tell us about your child's needs and target budget. You will be taken straight to your dashboard to track specialist allocation.
          </p>
        </div>

        {/* Progress Stepper */}
        {!isSuccess && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
              <span>Step {step} of 3</span>
              <span>
                {step === 1 && "1. Parent & Contact"}
                {step === 2 && "2. Child Profile"}
                {step === 3 && "3. Services & Budget"}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-terracotta-500 to-teal-500 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg shadow-slate-200/40">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 flex flex-col items-center gap-4"
            >
              <div className="h-16 w-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-1">
                <Check className="h-9 w-9" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Request Received!</h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
                We are setting up your personal dashboard for <strong>{formData.childName || "your child"}</strong>. Redirecting now...
              </p>
              <Loader2 className="w-5 h-5 animate-spin text-terracotta-500 mt-2" />
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: PARENT DETAILS */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Parent / Guardian Information</h2>
                    <p className="text-xs text-slate-400">How our clinical team and allocated therapists can contact you.</p>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Your Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        required
                        type="text"
                        placeholder="E.g., Sarah Miller"
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          required
                          type="email"
                          placeholder="sarah@example.com"
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Phone / WhatsApp</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          placeholder="+254 700 000 000"
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">City / Location</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="E.g., Nairobi / Westlands / Karen"
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CHILD PROFILE */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Child's Profile & Needs</h2>
                    <p className="text-xs text-slate-400">Helps our clinical team pair the best certified specialist.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Child's First Name</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., Leo"
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800"
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Child's Age (Years)</label>
                      <input
                        required
                        type="number"
                        min={1}
                        max={18}
                        placeholder="E.g., 6"
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800"
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-700">Focus Areas & Neurotype (Select all that apply)</label>
                    <div className="flex flex-wrap gap-2">
                      {diagnosisOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleDiagnosisToggle(opt)}
                          className={`text-xs px-3.5 py-2 rounded-xl border transition-all font-semibold ${
                            formData.diagnosisTags.includes(opt)
                              ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Child's Favorite Interests & Motivators</label>
                    <input
                      type="text"
                      placeholder="E.g., Dinosaur models, puzzles, water play, space rockets"
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: SERVICES & BUDGET */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Services Requested & Budget</h2>
                    <p className="text-xs text-slate-400">Define your preferences for specialist matching.</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-700">Specialist Type Needed</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {serviceOptions.map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => handleServiceToggle(srv)}
                          className={`text-xs px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all font-semibold ${
                            formData.requiredServices.includes(srv)
                              ? "bg-terracotta-50 border-terracotta-500 text-terracotta-800"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <span>{srv}</span>
                          {formData.requiredServices.includes(srv) && <Check className="w-4 h-4 text-terracotta-600" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Session Mode</label>
                      <select
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 bg-white text-slate-800 font-medium"
                        value={formData.sessionMode}
                        onChange={(e) => setFormData({ ...formData, sessionMode: e.target.value as any })}
                      >
                        <option value="both">Hybrid (In-Person & Online)</option>
                        <option value="in-person">In-Person Only</option>
                        <option value="online">Online Virtual Only</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700">Target Budget (KSh / Hour)</label>
                      <input
                        type="number"
                        step={500}
                        placeholder="3000"
                        className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800 font-bold"
                        value={formData.budgetPerHour}
                        onChange={(e) => setFormData({ ...formData, budgetPerHour: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Any Special Notes or Goals for the Specialist?</label>
                    <textarea
                      rows={3}
                      placeholder="E.g., Prefers visual schedules, sensory breaks every 15 minutes, focus on articulation drills."
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 text-slate-800"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl font-medium">
                  {error}
                </div>
              )}

              {/* Buttons Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-all shadow-sm active:scale-95"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-extrabold shadow-lg shadow-terracotta-900/20 transition-all active:scale-95 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit & View Dashboard</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
