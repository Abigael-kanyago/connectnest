import { createClient } from './client';
import type { 
  Profile, 
  ParentProfile, 
  ProviderProfile, 
  ParentRequest, 
  Session, 
  SessionNote, 
  Goal, 
  Message, 
  ContactInquiry,
  UserRole
} from '@/types/database.types';

// Helper to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes('placeholder') && !key.includes('placeholder'));
}

// Helper to access LocalStorage safely in Next.js SSR/Client
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

// Helper to wipe local mock data when starting fresh
export function clearLocalMockData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('connectnest_parent_requests');
  localStorage.removeItem('connectnest_pending_providers');
  localStorage.removeItem('connectnest_verified_providers');
  localStorage.removeItem('connectnest_session_notes');
  localStorage.removeItem('connectnest_goals');
  localStorage.removeItem('connectnest_inquiries');
  localStorage.removeItem('connectnest_active_request');
}

// ------------------------------------------------------------------------------
// 1. AUTH SERVICE
// ------------------------------------------------------------------------------
export const authService = {
  async login(email: string, password?: string) {
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password: password || 'password123',
        });

        if (!authError && authData.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

          const resolvedProfile = (profile as Profile) || {
            id: authData.user.id,
            email,
            role: (authData.user.user_metadata?.role as UserRole) || 'parent',
            full_name: authData.user.user_metadata?.full_name || email.split('@')[0],
            phone: null,
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          setLocalItem('connectnest_user', resolvedProfile);
          return { user: authData.user, profile: resolvedProfile, error: null };
        }

        if (authError) {
          console.warn('Supabase Auth warning:', authError.message);
        }
      } catch (networkErr: any) {
        console.warn('Supabase connection offline. Using local session:', networkErr?.message);
      }
    }

    const role: UserRole = email.includes('admin') 
      ? 'admin' 
      : email.includes('provider') || email.includes('specialist') || email.includes('dr.')
      ? 'provider' 
      : 'parent';

    const mockProfile: Profile = {
      id: `local-${role}-${Date.now()}`,
      email,
      role,
      full_name: email.split('@')[0],
      phone: null,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setLocalItem('connectnest_user', mockProfile);
    return { user: { id: mockProfile.id, email }, profile: mockProfile, error: null };
  },

  async signupParent(params: {
    email: string;
    fullName?: string;
    phone?: string;
    childName: string;
    childAge: number;
    diagnosisTags: string[];
    interests: string;
    requiredServices: string[];
    sessionMode: 'online' | 'in-person' | 'both';
    location: string;
    budgetPerHour: number;
    notes: string;
  }) {
    return parentService.submitIntakeRequest(params);
  },

  async signupProvider(params: {
    email: string;
    password?: string;
    name: string;
    licenseType: string;
    licenseNumber: string;
    yearsExp: number;
    servicesOffered: string[];
    bio: string;
    hourlyRate: number;
    availability: string[];
    agreeToVetting: boolean;
  }) {
    let createdUserId = `provider-${Date.now()}`;

    const newPendingProvider = {
      id: `prov-${Date.now()}`,
      name: params.name,
      role: `${params.licenseType} Specialist`,
      licenseType: params.licenseType,
      licenseNumber: params.licenseNumber,
      experience: `${params.yearsExp || 1} years`,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      rate: Number(params.hourlyRate) || 3000
    };

    const existingQueue = getLocalItem<any[]>('connectnest_pending_providers', []);
    setLocalItem('connectnest_pending_providers', [newPendingProvider, ...existingQueue]);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: params.email,
          password: 'password123',
          options: {
            data: {
              full_name: params.name,
              role: 'provider' as UserRole,
            },
          },
        });

        if (!authError && authData?.user) {
          createdUserId = authData.user.id;

          try {
            await supabase.from('provider_profiles').insert({
              id: createdUserId,
              license_type: params.licenseType,
              license_number: params.licenseNumber,
              years_exp: Number(params.yearsExp) || 0,
              services_offered: params.servicesOffered,
              bio: params.bio,
              hourly_rate: Number(params.hourlyRate) || 3000,
              availability: params.availability,
              is_verified: false,
              vetting_agreed: params.agreeToVetting,
            } as any);
          } catch (dbErr) {
            console.warn('Database insert warning for provider:', dbErr);
          }
        }
      } catch (netErr) {
        console.warn('Supabase Auth network error:', netErr);
      }
    }

    const localProfile: Profile = {
      id: createdUserId,
      email: params.email,
      role: 'provider',
      full_name: params.name,
      phone: null,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setLocalItem('connectnest_user', localProfile);
    return { success: true, profile: localProfile, error: null };
  },

  async logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('connectnest_user');
    }
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    return { success: true };
  },

  async getCurrentProfile(): Promise<Profile | null> {
    const local = getLocalItem<Profile | null>('connectnest_user', null);
    if (local) return local;

    if (!isSupabaseConfigured()) return null;

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return profile as Profile | null;
    } catch {
      return null;
    }
  }
};

// ------------------------------------------------------------------------------
// 2. ADMIN SERVICE
// ------------------------------------------------------------------------------
export const adminService = {
  async getPendingProviders() {
    let cloudResults: any[] = [];

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('provider_profiles')
          .select('*, profiles:id (full_name, email)')
          .eq('is_verified', false);

        if (!error && data && data.length > 0) {
          cloudResults = data.map((p: any) => ({
            id: p.id,
            name: p.profiles?.full_name || 'Specialist',
            role: `${p.license_type} Specialist`,
            licenseType: p.license_type,
            licenseNumber: p.license_number,
            experience: `${p.years_exp} years`,
            appliedDate: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            rate: p.hourly_rate
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch pending providers from Supabase:', err);
      }
    }

    const localSubmitted = getLocalItem<any[]>('connectnest_pending_providers', []);
    const combined = [...localSubmitted, ...cloudResults];
    const seen = new Set<string>();
    return combined.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  },

  async getVerifiedProviders() {
    let cloudResults: any[] = [];

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('provider_profiles')
          .select('*, profiles:id (full_name, email)')
          .eq('is_verified', true);

        if (!error && data && data.length > 0) {
          cloudResults = data.map((p: any) => ({
            id: p.id,
            name: p.profiles?.full_name || 'Specialist',
            role: `${p.license_type} Specialist`,
            licenseType: p.license_type,
            licenseNumber: p.license_number,
            experience: `${p.years_exp} years`,
            appliedDate: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            rate: p.hourly_rate
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch verified providers from Supabase:', err);
      }
    }

    const localVerified = getLocalItem<any[]>('connectnest_verified_providers', []);
    const combined = [...localVerified, ...cloudResults];
    const seen = new Set<string>();
    return combined.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  },

  async approveProvider(providerId: string) {
    const pendingList = getLocalItem<any[]>('connectnest_pending_providers', []);
    const target = pendingList.find(p => p.id === providerId);
    if (target) {
      setLocalItem('connectnest_pending_providers', pendingList.filter(p => p.id !== providerId));
      const verifiedList = getLocalItem<any[]>('connectnest_verified_providers', []);
      setLocalItem('connectnest_verified_providers', [target, ...verifiedList]);
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase
          .from('provider_profiles')
          .update({ is_verified: true })
          .eq('id', providerId);
      } catch (e) {
        console.warn('Approve provider error:', e);
      }
    }
    return { success: true };
  },

  async rejectProvider(providerId: string) {
    const pendingList = getLocalItem<any[]>('connectnest_pending_providers', []);
    setLocalItem('connectnest_pending_providers', pendingList.filter(p => p.id !== providerId));

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase
          .from('provider_profiles')
          .delete()
          .eq('id', providerId);
      } catch (e) {
        console.warn('Reject provider error:', e);
      }
    }
    return { success: true };
  },

  async getParentRequests() {
    let cloudResults: any[] = [];

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('parent_requests')
          .select('*, allocated_provider:allocated_provider_id(full_name)')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          cloudResults = data.map((r: any) => ({
            id: r.id,
            parentName: r.parent_name || 'Parent',
            childName: r.child_name,
            childAge: r.child_age,
            serviceRequested: r.service_requested,
            statedPrice: r.stated_price,
            location: r.location,
            appliedDate: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: r.status,
            allocatedProvider: r.allocated_provider?.full_name
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch parent requests from Supabase:', err);
      }
    }

    const localSubmitted = getLocalItem<any[]>('connectnest_parent_requests', []);
    const combined = [...localSubmitted, ...cloudResults];
    const seen = new Set<string>();
    return combined.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  },

  async allocateProvider(requestId: string, providerId: string, providerName?: string) {
    const requests = getLocalItem<any[]>('connectnest_parent_requests', []);
    const updated = requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'allocated',
          allocatedProvider: providerName || 'Allocated Specialist'
        };
      }
      return req;
    });
    setLocalItem('connectnest_parent_requests', updated);

    // Also update active request if it matches
    const active = getLocalItem<any>('connectnest_active_request', null);
    if (active && active.id === requestId) {
      setLocalItem('connectnest_active_request', {
        ...active,
        status: 'allocated',
        allocatedProvider: providerName || 'Allocated Specialist'
      });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase
          .from('parent_requests')
          .update({
            allocated_provider_id: providerId,
            status: 'allocated'
          })
          .eq('id', requestId);
      } catch (e) {
        console.warn('Allocate provider error:', e);
      }
    }
    return { success: true };
  }
};

// ------------------------------------------------------------------------------
// 3. PROVIDER SERVICE
// ------------------------------------------------------------------------------
export const providerService = {
  async getSessionNotes(providerId?: string) {
    let cloudNotes: any[] = [];

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        let query = supabase.from('session_notes').select('*').order('created_at', { ascending: false });
        if (providerId) query = query.eq('provider_id', providerId);

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          cloudNotes = data.map((n: any) => ({
            id: n.id,
            client: n.client_label,
            date: new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: n.session_type,
            notes: n.notes
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch session notes from Supabase:', err);
      }
    }

    const localNotes = getLocalItem<any[]>('connectnest_session_notes', []);
    const combined = [...localNotes, ...cloudNotes];
    const seen = new Set<string>();
    return combined.filter(item => {
      const key = item.id || `${item.client}-${item.date}-${item.notes}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  },

  async addSessionNote(params: { providerId?: string; clientLabel: string; sessionType: string; notes: string }) {
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newNote = {
      id: `sn-${Date.now()}`,
      client: params.clientLabel,
      date: dateStr,
      type: params.sessionType,
      notes: params.notes
    };

    const existingNotes = getLocalItem<any[]>('connectnest_session_notes', []);
    setLocalItem('connectnest_session_notes', [newNote, ...existingNotes]);

    if (isSupabaseConfigured() && params.providerId) {
      try {
        const supabase = createClient();
        await supabase.from('session_notes').insert({
          provider_id: params.providerId,
          client_label: params.clientLabel,
          session_type: params.sessionType,
          notes: params.notes
        } as any);
      } catch (e) {
        console.warn('Add session note error:', e);
      }
    }
    return { success: true };
  }
};

// ------------------------------------------------------------------------------
// 4. PARENT SERVICE (With frictionless intake and real-time request tracking)
// ------------------------------------------------------------------------------
export const parentService = {
  async submitIntakeRequest(params: {
    fullName?: string;
    email: string;
    phone?: string;
    childName: string;
    childAge: number;
    diagnosisTags: string[];
    interests: string;
    requiredServices: string[];
    sessionMode: 'online' | 'in-person' | 'both';
    location: string;
    budgetPerHour: number;
    notes: string;
  }) {
    const createdUserId = `parent-${Date.now()}`;
    const parentDisplayName = params.fullName || params.email.split('@')[0] || "Parent";

    const newParentRequest = {
      id: `req-${Date.now()}`,
      parentId: createdUserId,
      parentName: parentDisplayName,
      email: params.email,
      phone: params.phone || "",
      childName: params.childName,
      childAge: Number(params.childAge),
      diagnosisTags: params.diagnosisTags,
      interests: params.interests,
      serviceRequested: params.requiredServices.join(', ') || 'General Pediatric Support',
      sessionMode: params.sessionMode,
      statedPrice: Number(params.budgetPerHour) || 3000,
      location: params.location,
      notes: params.notes,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'unassigned' as const,
      allocatedProvider: null as string | null
    };

    // Store in active request & parent requests list
    setLocalItem('connectnest_active_request', newParentRequest);
    const existingRequests = getLocalItem<any[]>('connectnest_parent_requests', []);
    setLocalItem('connectnest_parent_requests', [newParentRequest, ...existingRequests]);

    // Set active parent profile
    const localProfile: Profile = {
      id: createdUserId,
      email: params.email,
      role: 'parent',
      full_name: parentDisplayName,
      phone: params.phone || null,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setLocalItem('connectnest_user', localProfile);

    // Initial goal creation tailored to their child
    const initialGoal = {
      id: `g-${Date.now()}`,
      text: `${params.childName}: Initial assessment & therapy milestones kickoff`,
      completed: false
    };
    setLocalItem('connectnest_goals', [initialGoal]);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.from('parent_requests').insert({
          parent_name: parentDisplayName,
          child_name: params.childName,
          child_age: Number(params.childAge),
          service_requested: newParentRequest.serviceRequested,
          stated_price: newParentRequest.statedPrice,
          location: params.location,
          status: 'unassigned',
          notes: params.notes,
        } as any);
      } catch (e) {
        console.warn('Cloud insert warning:', e);
      }
    }

    return { success: true, request: newParentRequest, profile: localProfile, error: null };
  },

  async getActiveRequest(): Promise<any | null> {
    const active = getLocalItem<any>('connectnest_active_request', null);
    if (active) {
      const allRequests = getLocalItem<any[]>('connectnest_parent_requests', []);
      const updated = allRequests.find(r => r.id === active.id);
      if (updated) return updated;
      return active;
    }

    const allRequests = getLocalItem<any[]>('connectnest_parent_requests', []);
    if (allRequests.length > 0) return allRequests[0];
    return null;
  },

  async getGoals(parentId?: string) {
    let cloudGoals: any[] = [];

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        let query = supabase.from('goals').select('*').order('created_at', { ascending: true });
        if (parentId) query = query.eq('parent_id', parentId);

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          cloudGoals = data.map((g: any) => ({
            id: g.id,
            text: g.text,
            completed: g.completed
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch goals from Supabase:', err);
      }
    }

    const localGoals = getLocalItem<any[]>('connectnest_goals', []);
    const combined = [...localGoals, ...cloudGoals];
    const seen = new Set<string>();
    return combined.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  },

  async toggleGoal(goalId: string | number, completed: boolean) {
    const goals = getLocalItem<any[]>('connectnest_goals', []);
    const updated = goals.map(g => g.id === goalId ? { ...g, completed } : g);
    setLocalItem('connectnest_goals', updated);

    if (isSupabaseConfigured() && typeof goalId === 'string' && goalId.length > 5) {
      try {
        const supabase = createClient();
        await supabase.from('goals').update({ completed }).eq('id', goalId);
      } catch (e) {
        console.warn('Toggle goal error:', e);
      }
    }
    return { success: true };
  },

  async addGoal(parentId: string, childName: string, text: string) {
    const newGoal = {
      id: `g-${Date.now()}`,
      text,
      completed: false
    };

    const existing = getLocalItem<any[]>('connectnest_goals', []);
    setLocalItem('connectnest_goals', [newGoal, ...existing]);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data } = await supabase.from('goals').insert({
          parent_id: parentId,
          child_name: childName,
          text,
          completed: false
        } as any).select().single();
        if (data) return data;
      } catch (e) {
        console.warn('Add goal error:', e);
      }
    }
    return newGoal;
  }
};

// ------------------------------------------------------------------------------
// 5. CONTACT SERVICE
// ------------------------------------------------------------------------------
export const contactService = {
  async submitInquiry(data: { name: string; email: string; role: string; subject: string; message: string }) {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString()
    };
    const existing = getLocalItem<any[]>('connectnest_inquiries', []);
    setLocalItem('connectnest_inquiries', [newInquiry, ...existing]);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.from('contact_inquiries').insert({
          name: data.name,
          email: data.email,
          role: data.role,
          subject: data.subject,
          message: data.message,
          status: 'unread'
        } as any);
      } catch (e) {
        console.warn('Submit inquiry Supabase error:', e);
      }
    }
    return { success: true };
  }
};
