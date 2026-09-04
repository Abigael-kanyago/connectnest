"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, 
  Calendar, 
  CheckSquare, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Smile, 
  Send,
  Loader2,
  Plus,
  UserCheck,
  Hourglass,
  ShieldCheck,
  MapPin,
  DollarSign,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { parentService, authService } from "@/lib/supabase/services";

export default function ParentDashboard() {
  const [loading, setLoading] = useState(true);
  const [parentRequest, setParentRequest] = useState<any | null>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoalText, setNewGoalText] = useState("");
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "therapist", text: "Hello! Our clinical team has received your request. Once a specialist is allocated, they will introduce themselves right here." }
  ]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const req = await parentService.getActiveRequest();
        setParentRequest(req);

        const userGoals = await parentService.getGoals(req?.parentId);
        setGoals(userGoals);

        if (req?.allocatedProvider) {
          setMessages([
            { sender: "therapist", text: `Hello! I am ${req.allocatedProvider}. I have reviewed ${req.childName}'s profile and look forward to our first session together!` },
            { sender: "parent", text: "Thank you so much! We are excited to get started." }
          ]);
        }
      } catch (err) {
        console.error("Error loading parent dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const toggleGoal = async (id: string | number) => {
    const target = goals.find(g => g.id === id);
    if (!target) return;
    const newStatus = !target.completed;

    setGoals(goals.map(g => g.id === id ? { ...g, completed: newStatus } : g));
    await parentService.toggleGoal(id, newStatus);
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;

    const childName = parentRequest?.childName || "Child";
    const created = await parentService.addGoal(parentRequest?.parentId || "parent-1", childName, newGoalText);
    setGoals([...goals, created]);
    setNewGoalText("");
    setIsAddingGoal(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages(prev => [...prev, { sender: "parent", text: chatMessage }]);
    const currentInput = chatMessage;
    setChatMessage("");
    
    setTimeout(() => {
      const specialistName = parentRequest?.allocatedProvider || "Clinical Coordinator";
      setMessages(m => [...m, { 
        sender: "therapist", 
        text: `Got your message regarding "${currentInput.substring(0, 24)}...". ${specialistName} will coordinate this for your next session schedule!` 
      }]);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta-500" />
        <span className="text-xs font-semibold">Loading Parent Portal...</span>
      </div>
    );
  }

  // If no intake has been submitted yet
  if (!parentRequest) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="h-20 w-20 bg-terracotta-50 text-terracotta-500 rounded-3xl flex items-center justify-center mx-auto border border-terracotta-100 shadow-sm">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900">Welcome to Your Parent Dashboard</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You haven't submitted a specialist matching request yet. Tell us about your child to get matched with a certified therapist.
          </p>
        </div>
        <Link
          href="/register/parent"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm shadow-lg shadow-terracotta-900/20 transition-all active:scale-95"
        >
          <span>Request Specialist Matching Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const isAllocated = parentRequest.status === "allocated" && Boolean(parentRequest.allocatedProvider);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold mb-2 border border-teal-500/30">
            <Smile className="w-3.5 h-3.5" />
            <span>Parent Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome, {parentRequest.parentName || "Parent"}!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            Active developmental intake and specialist allocation for <strong className="text-white font-bold">{parentRequest.childName}</strong> (Age {parentRequest.childAge}).
          </p>
        </div>

        {/* Quick Stated Budget / City Badge */}
        <div className="flex gap-4 shrink-0 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
          <div className="text-center px-2">
            <div className="text-xs text-slate-400 font-medium">Target Budget</div>
            <div className="text-base sm:text-lg font-extrabold text-amber-300">
              KSh {Number(parentRequest.statedPrice || 3000).toLocaleString()}/hr
            </div>
          </div>
          <div className="border-l border-white/10 pl-4 text-center px-2">
            <div className="text-xs text-slate-400 font-medium">Location</div>
            <div className="text-base sm:text-lg font-extrabold text-teal-300">
              {parentRequest.location || "Nairobi"}
            </div>
          </div>
        </div>
      </div>

      {/* LIVE SPECIALIST ALLOCATION TRACKER CARD */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm transition-all ${
        isAllocated 
          ? "bg-gradient-to-r from-teal-900/90 to-emerald-950 text-white border-teal-500/40" 
          : "bg-gradient-to-r from-amber-950/80 to-slate-900 text-white border-amber-500/30"
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${
              isAllocated ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
            }`}>
              {isAllocated ? <UserCheck className="w-6 h-6" /> : <Hourglass className="w-6 h-6 animate-pulse" />}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">Specialist Matching Status</span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                  isAllocated 
                    ? "bg-teal-400 text-teal-950 font-black" 
                    : "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                }`}>
                  {isAllocated ? "Specialist Allocated" : "Review in Progress"}
                </span>
              </div>
              
              {isAllocated ? (
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Allocated Specialist: <span className="text-teal-300">{parentRequest.allocatedProvider}</span>
                </h3>
              ) : (
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Matching with Certified Specialist
                </h3>
              )}

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
                {isAllocated 
                  ? `${parentRequest.allocatedProvider} has been assigned to ${parentRequest.childName} for ${parentRequest.serviceRequested}. You can message them below to coordinate schedule!` 
                  : `Our clinical director is currently reviewing ${parentRequest.childName}'s needs (${parentRequest.serviceRequested}) to allocate the best specialist matching your budget.`}
              </p>
            </div>
          </div>

          <div className="shrink-0 self-end sm:self-center">
            {isAllocated ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 text-white font-bold text-xs shadow-md">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Specialist Ready</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-bold text-xs">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Est. Allocation: ~24 Hours</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Child Profile Details & Goals */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Child Intake Details Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider block mb-1">
                  Submitted Child Profile
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  {parentRequest.childName} <span className="text-xs text-slate-400 font-medium">({parentRequest.childAge} years old)</span>
                </h2>
              </div>
              <Link
                href="/register/parent"
                className="text-xs font-bold text-slate-500 hover:text-terracotta-600 flex items-center gap-1 transition-colors"
              >
                <span>Edit / New Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Diagnosis / Focus Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Identified Needs & Neurotypes</label>
              <div className="flex flex-wrap gap-1.5">
                {parentRequest.diagnosisTags && parentRequest.diagnosisTags.length > 0 ? (
                  parentRequest.diagnosisTags.map((tag: string, idx: number) => (
                    <span key={idx} className="bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-xl border border-teal-100">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No specific neurotype tags specified</span>
                )}
              </div>
            </div>

            {/* Request Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Service Requested</span>
                <span className="text-sm font-bold text-slate-800 block">{parentRequest.serviceRequested}</span>
              </div>
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Interests & Motivators</span>
                <span className="text-sm font-bold text-slate-800 block">{parentRequest.interests || "Space, building blocks, music"}</span>
              </div>
            </div>

            {parentRequest.notes && (
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-1 text-xs">
                <span className="font-bold text-amber-900 block">Parent Clinical Notes:</span>
                <p className="text-amber-800 leading-relaxed">{parentRequest.notes}</p>
              </div>
            )}
          </div>

          {/* Interactive Developmental Goals Checklist */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-teal-600" />
                  Developmental Goals Checklist ({goals.filter(g => g.completed).length}/{goals.length})
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Track milestone progress set by you and your allocated therapist.</p>
              </div>
              <button
                onClick={() => setIsAddingGoal(!isAddingGoal)}
                className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Goal</span>
              </button>
            </div>

            {isAddingGoal && (
              <form onSubmit={handleAddGoal} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`E.g., ${parentRequest.childName}: Practice turn-taking during puzzle play`}
                  className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-teal-500/20 text-slate-800 outline-none"
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                >
                  Save Goal
                </button>
              </form>
            )}

            <div className="space-y-3">
              {goals.length > 0 ? (
                goals.map(goal => (
                  <label key={goal.id} className="flex items-start gap-3 p-3.5 border border-slate-100 rounded-2xl hover:bg-slate-50/60 transition-colors cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal(goal.id)}
                      className="mt-0.5 rounded border-slate-300 text-teal-600 accent-teal-600 focus:ring-teal-500 h-4 w-4"
                    />
                    <span className={`text-xs text-slate-700 font-medium leading-relaxed ${goal.completed ? "line-through text-slate-400" : ""}`}>
                      {goal.text}
                    </span>
                  </label>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  No active goals created yet. Click "Add Goal" above to create milestones!
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Direct Specialist Chat & Coordination */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col h-[560px]">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="h-10 w-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
              {isAllocated ? parentRequest.allocatedProvider.substring(0, 2).toUpperCase() : "CN"}
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {isAllocated ? parentRequest.allocatedProvider : "ConnectNest Clinical Team"}
              </h3>
              <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">
                {isAllocated ? "Allocated Specialist" : "Support Desk"}
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "parent" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === "parent"
                    ? "bg-terracotta-500 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-700 rounded-bl-none border border-slate-200/60"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="border-t border-slate-100 pt-3 flex gap-2">
            <input
              type="text"
              placeholder={isAllocated ? `Message ${parentRequest.allocatedProvider}...` : "Send question to clinical team..."}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-terracotta-500/20 text-slate-800"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit" className="bg-terracotta-500 hover:bg-terracotta-600 text-white p-2.5 rounded-xl transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
