export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'parent' | 'provider' | 'admin';
export type SessionModeType = 'online' | 'in-person' | 'both';
export type RequestStatusType = 'unassigned' | 'allocated' | 'completed' | 'cancelled';
export type SessionStatusType = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type InquiryStatusType = 'unread' | 'read' | 'resolved';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ParentProfile {
  id: string;
  child_name: string;
  child_age: number;
  diagnosis_tags: string[];
  interests: string | null;
  required_services: string[];
  session_mode: SessionModeType;
  location: string;
  budget_per_hour: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface ProviderProfile {
  id: string;
  license_type: string;
  license_number: string;
  license_file_url: string | null;
  cv_file_url: string | null;
  years_exp: number;
  services_offered: string[];
  bio: string | null;
  hourly_rate: number;
  availability: string[];
  is_verified: boolean;
  vetting_agreed: boolean;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface ParentRequest {
  id: string;
  parent_id: string;
  parent_name: string | null;
  child_name: string;
  child_age: number;
  service_requested: string;
  stated_price: number;
  location: string;
  status: RequestStatusType;
  allocated_provider_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  allocated_provider?: Profile;
}

export interface Session {
  id: string;
  parent_id: string;
  provider_id: string;
  child_name: string;
  service_type: string;
  session_mode: SessionModeType;
  scheduled_at: string;
  status: SessionStatusType;
  notes: string | null;
  created_at: string;
}

export interface SessionNote {
  id: string;
  provider_id: string;
  parent_id: string | null;
  client_label: string;
  session_type: string;
  notes: string;
  created_at: string;
}

export interface Goal {
  id: string;
  parent_id: string;
  child_name: string;
  text: string;
  completed: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  role: string;
  subject: string;
  message: string;
  status: InquiryStatusType;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email: string;
          role?: UserRole;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: UserRole;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      parent_profiles: {
        Row: ParentProfile;
        Insert: {
          id: string;
          child_name: string;
          child_age: number;
          diagnosis_tags?: string[];
          interests?: string | null;
          required_services?: string[];
          session_mode?: SessionModeType;
          location: string;
          budget_per_hour?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          child_name?: string;
          child_age?: number;
          diagnosis_tags?: string[];
          interests?: string | null;
          required_services?: string[];
          session_mode?: SessionModeType;
          location?: string;
          budget_per_hour?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      provider_profiles: {
        Row: ProviderProfile;
        Insert: {
          id: string;
          license_type: string;
          license_number: string;
          license_file_url?: string | null;
          cv_file_url?: string | null;
          years_exp?: number;
          services_offered?: string[];
          bio?: string | null;
          hourly_rate?: number;
          availability?: string[];
          is_verified?: boolean;
          vetting_agreed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          license_type?: string;
          license_number?: string;
          license_file_url?: string | null;
          cv_file_url?: string | null;
          years_exp?: number;
          services_offered?: string[];
          bio?: string | null;
          hourly_rate?: number;
          availability?: string[];
          is_verified?: boolean;
          vetting_agreed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      parent_requests: {
        Row: ParentRequest;
        Insert: {
          id?: string;
          parent_id: string;
          parent_name?: string | null;
          child_name: string;
          child_age: number;
          service_requested: string;
          stated_price: number;
          location: string;
          status?: RequestStatusType;
          allocated_provider_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          parent_id?: string;
          parent_name?: string | null;
          child_name?: string;
          child_age?: number;
          service_requested?: string;
          stated_price?: number;
          location?: string;
          status?: RequestStatusType;
          allocated_provider_id?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      sessions: {
        Row: Session;
        Insert: {
          id?: string;
          parent_id: string;
          provider_id: string;
          child_name: string;
          service_type: string;
          session_mode?: SessionModeType;
          scheduled_at: string;
          status?: SessionStatusType;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          parent_id?: string;
          provider_id?: string;
          child_name?: string;
          service_type?: string;
          session_mode?: SessionModeType;
          scheduled_at?: string;
          status?: SessionStatusType;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      session_notes: {
        Row: SessionNote;
        Insert: {
          id?: string;
          provider_id: string;
          parent_id?: string | null;
          client_label: string;
          session_type: string;
          notes: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          parent_id?: string | null;
          client_label?: string;
          session_type?: string;
          notes?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      goals: {
        Row: Goal;
        Insert: {
          id?: string;
          parent_id: string;
          child_name: string;
          text: string;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          parent_id?: string;
          child_name?: string;
          text?: string;
          completed?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: Message;
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          content?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_inquiries: {
        Row: ContactInquiry;
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: string;
          subject?: string;
          message: string;
          status?: InquiryStatusType;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: string;
          subject?: string;
          message?: string;
          status?: InquiryStatusType;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      session_mode_type: SessionModeType;
      request_status_type: RequestStatusType;
      session_status_type: SessionStatusType;
      inquiry_status_type: InquiryStatusType;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
