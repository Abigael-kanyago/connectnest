"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Clock, 
  MessageSquare, 
  Check, 
  Plus, 
  BookOpen, 
  TrendingUp, 
  ChevronRight,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { providerService, authService } from "@/lib/supabase/services";

export default function ProviderDashboard() {
  const [loading, setLoading] = useState(true);
  const [providerId, setProviderId] = useState<string | undefined>();
  const [sessionNotes, setSessionNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState({ client: "Ethan (Age 7)", type: "Speech & OT Integration", notes: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    async function loadProviderData() {
      try {
        const profile = await authService.getCurrentProfile();
        if (profile) setProviderId(profile.id);

        const notes = await providerService.getSessionNotes(profile?.id);
        setSessionNotes(notes);
      } catch (err) {
        console.error("Error loading provider dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProviderData();
  }, []);

  const stats = [
    { name: "Monthly Earnings", value: "KSh 95,000", icon: <DollarSign className="h-5 w-5 text-teal-600" />, trend: "+12.4%" },
    { name: "Hours Logged", value: "28.5 hrs", icon: <Clock className="h-5 w-5 text-primary-600" />, trend: "On Track" },
    { name: "Active Clients", value: "5 Children", icon: <Users className="h-5 w-5 text-lavender-600" />, trend: "+1 new" }
  ];

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.notes.trim()) return;

    setIsSaving(true);
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    await providerService.addSessionNote({
      providerId,
      clientLabel: newNote.client,
      sessionType: newNote.type,
      notes: newNote.notes
    });

    setSessionNotes([
      { client: newNote.client, date: dateStr, type: newNote.type, notes: newNote.notes },
      ...sessionNotes
    ]);

    setNewNote({ client: "Ethan (Age 7)", type: "Speech & OT Integration", notes: "" });
    setIsSaving(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  const clientRoster = [
    { name: "Ethan K.", parent: "Sarah K.", goals: "Articulation, toy sharing", sessions: "2x / week" },
    { name: "Lily K.", parent: "Sarah K.", goals: "Sensory diet, pen grip", sessions: "1x / week" },
    { name: "Benjamin M.", parent: "James M.", goals: "AAC tablet navigation", sessions: "1x / week" }
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        <span className="text-xs font-semibold">Loading Provider Workspace...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">{stat.name}</span>
              <span className="text-2xl font-extrabold text-zinc-950 block">{stat.value}</span>
              <span className="text-[9px] font-semibold text-teal-600">{stat.trend}</span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Client roster & Logger */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Client Roster list */}
          <div className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-primary-600" />
              Active Client Roster
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-600">
                <thead>
                  <tr className="border-b border-zinc-100 pb-2 text-[10px] uppercase font-bold text-zinc-400">
                    <th className="py-2">Child Name</th>
                    <th className="py-2">Parent / Contact</th>
                    <th className="py-2">Primary Goals</th>
                    <th className="py-2 text-right">Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {clientRoster.map((client, i) => (
                    <tr key={i} className="hover:bg-zinc-50/20 transition-colors">
                      <td className="py-3.5 font-bold text-zinc-900">{client.name}</td>
                      <td className="py-3.5">{client.parent}</td>
                      <td className="py-3.5 text-zinc-500 italic">{client.goals}</td>
                      <td className="py-3.5 text-right text-teal-600 font-bold">{client.sessions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Session Notes Logger */}
          <div className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-teal-600" />
              Log New Session Activity
            </h3>
            <form onSubmit={handleAddNote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Select Client</label>
                  <select
                    className="border border-zinc-200 rounded-xl px-3 py-2.5 text-xs bg-white text-zinc-700"
                    value={newNote.client}
                    onChange={(e) => setNewNote({ ...newNote, client: e.target.value })}
                  >
                    <option value="Ethan (Age 7)">Ethan (Age 7)</option>
                    <option value="Lily (Age 4)">Lily (Age 4)</option>
                    <option value="Benjamin (Age 8)">Benjamin (Age 8)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Session Focus / Type</label>
                  <select
                    className="border border-zinc-200 rounded-xl px-3 py-2.5 text-xs bg-white text-zinc-700"
                    value={newNote.type}
                    onChange={(e) => setNewNote({ ...newNote, type: e.target.value })}
                  >
                    <option value="Speech Therapy">Speech Therapy</option>
                    <option value="Occupational Therapy">Occupational Therapy</option>
                    <option value="Behavioral (ABA) Therapy">Behavioral (ABA) Therapy</option>
                    <option value="Sensory Diet & Regulation">Sensory Diet & Regulation</option>
                    <option value="Fine Motor Coordination">Fine Motor Coordination</option>
                  </select>
                </div>
              </div>

              {successMsg && (
                <div className="flex items-center gap-1.5 text-teal-600 text-xs font-semibold pb-1">
                  <Check className="h-4.5 w-4.5" /> Note Saved and Persisted to Database!
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Activity Summary & Progress Remarks</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Record articulation trials, fine motor task completion, sensory break counts, etc..."
                  className="border border-zinc-200 rounded-xl p-3 text-xs w-full focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-zinc-700"
                  value={newNote.notes}
                  onChange={(e) => setNewNote({ ...newNote, notes: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white rounded-xl px-5 py-2.5 text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 active:scale-95"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                <span>Save Session Note</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Session Logs History */}
        <div className="lg:col-span-4 bg-white border border-zinc-150 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-50 pb-3">
            Recent Session Logs ({sessionNotes.length})
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {sessionNotes.map((note, idx) => (
              <div key={idx} className="p-4 border border-zinc-100 rounded-2xl flex flex-col gap-1 hover:bg-zinc-50/20 transition-colors">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-teal-600 uppercase tracking-wider">{note.type}</span>
                  <span className="text-zinc-400">{note.date}</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-800 mt-1">{note.client}</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">{note.notes}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
