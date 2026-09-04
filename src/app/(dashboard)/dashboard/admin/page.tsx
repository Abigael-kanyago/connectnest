"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Users, 
  UserCheck, 
  Clock, 
  FileText, 
  Check, 
  X, 
  ExternalLink,
  Award,
  AlertCircle,
  DollarSign,
  UserPlus,
  Heart,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { adminService } from "@/lib/supabase/services";

interface PendingProvider {
  id: string;
  name: string;
  role: string;
  licenseType: string;
  licenseNumber: string;
  experience: string;
  appliedDate: string;
  rate: number;
}

interface ParentRequest {
  id: string;
  parentName: string;
  childName: string;
  childAge: number;
  serviceRequested: string;
  statedPrice: number;
  location: string;
  appliedDate: string;
  status: "unassigned" | "allocated" | "completed" | "cancelled";
  allocatedProvider?: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState<PendingProvider[]>([]);
  const [verifiedList, setVerifiedList] = useState<PendingProvider[]>([]);
  const [parentRequests, setParentRequests] = useState<ParentRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ParentRequest | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [pending, verified, requests] = await Promise.all([
        adminService.getPendingProviders(),
        adminService.getVerifiedProviders(),
        adminService.getParentRequests()
      ]);
      setQueue(pending);
      setVerifiedList(verified);
      setParentRequests(requests as ParentRequest[]);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id: string) => {
    const provider = queue.find(p => p.id === id);
    if (!provider) return;

    await adminService.approveProvider(id);
    setVerifiedList([provider, ...verifiedList]);
    setQueue(queue.filter(p => p.id !== id));
    
    setActionSuccess(`Approved ${provider.name} and added to Verified Specialist Pool.`);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleReject = async (id: string) => {
    await adminService.rejectProvider(id);
    setQueue(queue.filter(p => p.id !== id));
    setActionSuccess("Provider application rejected.");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleAllocateProvider = async (requestId: string) => {
    if (!selectedProviderId) return;
    const provider = verifiedList.find(p => p.id === selectedProviderId);
    if (!provider) return;

    await adminService.allocateProvider(requestId, selectedProviderId, provider.name);

    setParentRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: "allocated",
          allocatedProvider: provider.name
        };
      }
      return req;
    }));

    setActionSuccess(`Specialist ${provider.name} successfully allocated to parent request.`);
    setTimeout(() => setActionSuccess(null), 3500);

    setSelectedRequest(null);
    setSelectedProviderId("");
  };

  const stats = [
    { name: "Parent Applications", value: parentRequests.length.toString(), icon: <Heart className="h-5 w-5 text-terracotta-500" /> },
    { name: "Verified Providers (Private Pool)", value: verifiedList.length.toString(), icon: <UserCheck className="h-5 w-5 text-teal-600" /> },
    { name: "Pending Provider Vetting", value: queue.length.toString(), icon: <Clock className="h-5 w-5 text-amber-600" /> }
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        <span className="text-xs font-semibold">Loading ConnectNest Admin Console...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {actionSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-teal-50 border border-teal-200 text-teal-800 px-4 py-3 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-sm"
          >
            <Check className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{actionSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">{stat.name}</span>
              <span className="text-2xl font-extrabold text-zinc-950 block">{stat.value}</span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Admin Provider-to-Parent Allocation Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-300 text-xs font-bold mb-2 border border-terracotta-500/30">
              <UserPlus className="w-3.5 h-3.5" />
              Private Allocation System
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Parent Requests & Provider Allocation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Review parent applications with stated hourly budget and assign vetted specialists.
            </p>
          </div>
        </div>

        {/* Parent Requests Grid */}
        <div className="space-y-4">
          {parentRequests.length > 0 ? (
            parentRequests.map((req) => (
              <div key={req.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-bold text-white">{req.parentName} (Child: {req.childName}, Age {req.childAge})</h4>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      req.status === "allocated" 
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" 
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {req.status === "allocated" ? `Allocated: ${req.allocatedProvider}` : "Needs Provider"}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300 font-medium">
                    <span>Service: <strong className="text-white">{req.serviceRequested}</strong></span>
                    <span>Stated Price: <strong className="text-amber-300">KSh {Number(req.statedPrice).toLocaleString()}/hr</strong></span>
                    <span>Location: <strong className="text-white">{req.location}</strong></span>
                  </div>
                </div>

                <div className="shrink-0">
                  {req.status === "unassigned" ? (
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all active:scale-95"
                    >
                      Allocate Specialist
                    </button>
                  ) : (
                    <span className="text-xs text-teal-300 font-bold inline-flex items-center gap-1">
                      <Check className="w-4 h-4" /> Allocated
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              No parent matching requests found.
            </div>
          )}
        </div>
      </div>

      {/* Allocation Modal Dialog */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Allocate Specialist to Parent</h3>
                  <span className="text-xs text-slate-500 font-medium">Matching request for {selectedRequest.parentName}</span>
                </div>
                <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs space-y-1">
                <div><span className="text-slate-500">Child:</span> <strong className="text-slate-900">{selectedRequest.childName} ({selectedRequest.childAge} yrs)</strong></div>
                <div><span className="text-slate-500">Service:</span> <strong className="text-slate-900">{selectedRequest.serviceRequested}</strong></div>
                <div><span className="text-slate-500">Parent Target Price:</span> <strong className="text-terracotta-600">KSh {Number(selectedRequest.statedPrice).toLocaleString()}/hr</strong></div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Select Vetted Provider from Private Pool</label>
                <select
                  value={selectedProviderId}
                  onChange={(e) => setSelectedProviderId(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white font-semibold text-slate-800"
                >
                  <option value="">-- Choose Vetted Specialist --</option>
                  {verifiedList.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.role}) - KSh {Number(p.rate).toLocaleString()}/hr
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={!selectedProviderId}
                  onClick={() => handleAllocateProvider(selectedRequest.id)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white font-bold text-xs py-3 rounded-xl shadow transition-colors"
                >
                  Confirm Allocation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Verification Queue (Vetting Queue) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-teal-600" />
              Credentials Verification Queue ({queue.length})
            </h3>
            
            <AnimatePresence mode="popLayout">
              {queue.length > 0 ? (
                <div className="space-y-4">
                  {queue.map((provider) => (
                    <motion.div
                      key={provider.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="border border-zinc-100 rounded-2xl p-5 hover:bg-zinc-50/20 transition-colors flex flex-col md:flex-row justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-zinc-900">{provider.name}</h4>
                          <span className="text-[9px] bg-primary-50 border border-primary-200 text-primary-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            {provider.licenseType}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">{provider.role}</span>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2 text-[10px] text-zinc-500">
                          <div>License No: <span className="font-semibold text-zinc-800">{provider.licenseNumber}</span></div>
                          <div>Rate: <span className="font-semibold text-zinc-800">KSh {Number(provider.rate).toLocaleString()}/hr</span></div>
                          <div className="col-span-2 mt-1">Applied: <span className="font-semibold text-zinc-800">{provider.appliedDate}</span></div>
                        </div>

                        {/* Document review link */}
                        <div className="pt-2 flex gap-3">
                          <button className="text-[10px] text-primary-600 hover:text-primary-700 font-bold flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" /> View Certification.pdf <ExternalLink className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      </div>

                      {/* Verification Actions */}
                      <div className="flex md:flex-col justify-end gap-2 shrink-0 self-center">
                        <button
                          onClick={() => handleApprove(provider.id)}
                          className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-4 py-2 text-[10px] font-bold shadow-sm transition-colors flex items-center gap-1 active:scale-95"
                        >
                          <Check className="h-3.5 w-3.5" /> Approve & Add to Pool
                        </button>
                        <button
                          onClick={() => handleReject(provider.id)}
                          className="border border-zinc-200 text-zinc-500 hover:bg-zinc-50 rounded-xl px-4 py-2 text-[10px] font-bold transition-colors flex items-center gap-1 active:scale-95"
                        >
                          <X className="h-3.5 w-3.5" /> Reject
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-zinc-400 text-xs flex flex-col items-center gap-2">
                  <UserCheck className="h-8 w-8 text-zinc-300" />
                  No pending provider verifications in queue.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Recently Approved list */}
        <div className="lg:col-span-4 bg-white border border-zinc-150 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-50 pb-3 flex items-center gap-2">
            <Award className="h-4.5 w-4.5 text-teal-600" />
            Approved Provider Pool ({verifiedList.length})
          </h3>
          <div className="space-y-3">
            {verifiedList.length > 0 ? (
              verifiedList.map((p) => (
                <div key={p.id} className="p-3 border border-zinc-100 rounded-xl flex items-center justify-between hover:bg-zinc-50/20 transition-colors">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800">{p.name}</h4>
                    <span className="text-[9px] text-teal-600 font-bold uppercase tracking-wider">{p.role} (KSh {Number(p.rate).toLocaleString()}/hr)</span>
                  </div>
                  <span className="bg-teal-50 text-teal-700 p-1 rounded-full border border-teal-150">
                    <Check className="h-3 w-3" />
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-zinc-400 text-xs flex flex-col items-center gap-1">
                <AlertCircle className="h-6 w-6 text-zinc-300" />
                No approved listings recorded.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
