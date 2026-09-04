"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, Send, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { contactService } from "@/lib/supabase/services";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "parent",
    subject: "general",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await contactService.submitInquiry(formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-zinc-50/50 pt-28 sm:pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Have questions about registration, verifications, or child settings? We are here to support you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Left */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Email Us</h3>
                <span className="text-xs text-zinc-500">support@connectnest.org</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Call Support</h3>
                <span className="text-xs text-zinc-500">+254 769 251 932 / +254 757 729 411</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-lavender-50 text-lavender-600 flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Main Office</h3>
                <span className="text-xs text-zinc-500">Kahawa Sukari, Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Contact Form Right */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center gap-4"
              >
                <div className="h-16 w-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-2">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">Thank you for reaching out!</h2>
                <p className="text-sm text-zinc-500 max-w-md">
                  Our team has received your inquiry and will get back to you within 24 business hours. We look forward to connecting.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", role: "parent", subject: "general", message: "" });
                  }}
                  className="mt-4 bg-primary-50 text-primary-700 text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-primary-100 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-zinc-700"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-zinc-700"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700">I am a...</label>
                    <select
                      className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white text-zinc-700"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="parent">Parent / Guardian</option>
                      <option value="provider">Service Provider</option>
                      <option value="other">Interested Supporter</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Subject</label>
                    <select
                      className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white text-zinc-700"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="verification">Verification & Credentials</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Session Help</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700">Message Details</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help your family or practice?"
                    className="border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-zinc-700"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-2xl flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-70 text-white font-extrabold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-terracotta-900/20 transition-all self-start w-full sm:w-auto active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
