"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Briefcase, FileText, Upload, Shield, AlertCircle, Loader2 } from "lucide-react";
import { authService } from "@/lib/supabase/services";

export default function ProviderApplicationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    email: "",
    password: "",
    licenseType: "OTR/L",
    licenseNumber: "",
    licenseFile: "",
    cvFile: "",
    // Step 2
    yearsExp: "",
    servicesOffered: [] as string[],
    bio: "",
    // Step 3
    hourlyRate: 3000,
    availability: [] as string[],
    // Step 4
    profilePhoto: "",
    agreeToVetting: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const services = ["Speech Therapy", "Occupational Therapy", "Behavioral (ABA) Therapy", "Sensory Coaching", "Academic Tutoring", "Swimming Coaching", "Skating Coaching", "Art Classes", "Singing Lessons"];
  const timeSlots = ["Monday AM", "Monday PM", "Wednesday AM", "Wednesday PM", "Thursday AM", "Thursday PM", "Friday AM", "Friday PM"];

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      setError("Please fill out your name and email address.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, 4));
  };
  const handlePrev = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleServiceToggle = (opt: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(opt)
        ? prev.servicesOffered.filter((x) => x !== opt)
        : [...prev.servicesOffered, opt],
    }));
  };

  const handleSlotToggle = (slot: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter((x) => x !== slot)
        : [...prev.availability, slot],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authService.signupProvider({
        name: formData.name,
        email: formData.email,
        password: formData.password || "password123",
        licenseType: formData.licenseType,
        licenseNumber: formData.licenseNumber,
        yearsExp: Number(formData.yearsExp) || 0,
        servicesOffered: formData.servicesOffered,
        bio: formData.bio,
        hourlyRate: Number(formData.hourlyRate) || 3000,
        availability: formData.availability,
        agreeToVetting: formData.agreeToVetting
      });

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/provider");
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "Failed to submit provider application.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-zinc-50/50 pt-28 sm:pt-32 pb-24 flex flex-col items-center justify-start">
      <div className="max-w-xl w-full px-4">
        
        {/* Stepper */}
        {!isSuccess && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
              <span>Step {step} of 4</span>
              <span>
                {step === 1 && "Credentials & Credentials"}
                {step === 2 && "Expertise & Services"}
                {step === 3 && "Pricing & Calendar"}
                {step === 4 && "Vetting Consent"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-lavender-500 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Wizard Panel */}
        <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 flex flex-col items-center gap-3"
            >
              <div className="h-14 w-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-2">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900">Application Submitted!</h2>
              <p className="text-xs text-zinc-500 max-w-sm">
                Your credentials are now in the Admin Verification Queue. Redirecting you to your Provider Dashboard...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: CREDENTIALS */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-zinc-900">Professional credentials</h2>
                  <p className="text-xs text-zinc-400">All documents are processed privately by our licensing auditors.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-700">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., Dr. Sarah Jenkins"
                        className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-zinc-700"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-700">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="specialist@example.com"
                        className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-zinc-700"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-700">License / Board Certification Type</label>
                      <select
                        className="border border-zinc-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-zinc-700"
                        value={formData.licenseType}
                        onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                      >
                        <option value="OTR/L">OTR/L (Occupational Therapy)</option>
                        <option value="CCC-SLP">CCC-SLP (Speech-Language Pathology)</option>
                        <option value="BCBA">BCBA / BCBA-D (Behavior Analyst)</option>
                        <option value="TUTOR">Certified Special Educator / Tutor</option>
                        <option value="COACH">Activity Coach (Swimming, Art, etc.)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-700">License Number</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., CA-12345678"
                        className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-zinc-700"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-700">Upload Credentials File (PDF / Image)</label>
                      <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center hover:bg-zinc-50 transition-colors cursor-pointer flex flex-col items-center gap-2 h-full justify-center">
                        <Upload className="h-6 w-6 text-zinc-400" />
                        <span className="text-[10px] font-semibold text-zinc-800">Upload certificates</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-700">Upload CV / Resume (PDF / Doc)</label>
                      <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-6 text-center hover:bg-zinc-50 transition-colors cursor-pointer flex flex-col items-center gap-2 h-full justify-center">
                        <FileText className="h-6 w-6 text-zinc-400" />
                        <span className="text-[10px] font-semibold text-zinc-800">Upload CV</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: EXPERTISE */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-zinc-900">Experience & Bio</h2>
                  <p className="text-xs text-zinc-400">Describe your practice methods and specialties tags.</p>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Years of Experience</label>
                    <input
                      required
                      type="number"
                      placeholder="E.g., 6"
                      className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-zinc-700 w-full sm:w-1/2"
                      value={formData.yearsExp}
                      onChange={(e) => setFormData({ ...formData, yearsExp: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2">
                    <label className="text-xs font-semibold text-zinc-700">Services Offered</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((srv) => {
                        const selected = formData.servicesOffered.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => handleServiceToggle(srv)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                              selected
                                ? "bg-teal-50 border-teal-500 text-teal-700 shadow-sm"
                                : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2">
                    <label className="text-xs font-semibold text-zinc-700">Bio Statement (Child-led / Affirming focus)</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="E.g., Specializing in autism spectrum support. Focus is child-centered therapy that builds confidence..."
                      className="border border-zinc-200 rounded-xl p-3 text-xs w-full focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-zinc-700"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: PRICING & CALENDAR */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-zinc-900">Rates & Session Slots</h2>
                  <p className="text-xs text-zinc-400">Set your pricing models and general weekly hours.</p>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-semibold text-zinc-700">
                      <span>Hourly Billing Rate</span>
                      <span className="text-primary-600 font-bold">KSh {formData.hourlyRate.toLocaleString()}/hr</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={10000}
                      step={250}
                      className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 pt-4">
                    <label className="text-xs font-semibold text-zinc-700 font-medium">Select Availability Blocks</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const selected = formData.availability.includes(slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => handleSlotToggle(slot)}
                            className={`py-2 text-[10px] font-semibold rounded-xl text-center border transition-all ${
                              selected
                                ? "bg-primary-50 border-primary-500 text-primary-700 shadow-sm font-bold"
                                : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CONSENT */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-zinc-900">Vetting Audit & Verification</h2>
                  <p className="text-xs text-zinc-400">We inspect credentials for all active directory accounts.</p>

                  <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-4 flex gap-3">
                    <Shield className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Vetting Agreement</h4>
                      <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                        I hereby authorize ConnectNest verification administrators to run background audits, review state licensing registers, and cross-reference certificate documents matching my profile.
                      </p>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer pt-4">
                    <input
                      required
                      type="checkbox"
                      className="mt-1 rounded border-zinc-300 accent-primary-600 focus:ring-primary-500"
                      checked={formData.agreeToVetting}
                      onChange={(e) => setFormData({ ...formData, agreeToVetting: e.target.checked })}
                    />
                    <span className="text-[11px] text-zinc-600 leading-relaxed">
                      I agree to the verification process terms and certify that all submitted certificates represent legitimate active credentials.
                    </span>
                  </label>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-2xl flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="border border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-full px-6 py-3 text-xs font-extrabold transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-7 py-3 text-xs font-extrabold shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.agreeToVetting || loading}
                    className="bg-teal-600 hover:bg-teal-700 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-black text-sm px-8 py-3.5 rounded-full shadow-lg shadow-teal-950/20 transition-all flex items-center gap-2 active:scale-95"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Check className="h-4 w-4 stroke-[3]" />
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
