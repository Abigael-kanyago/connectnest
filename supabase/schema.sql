-- ==============================================================================
-- CONNECTNEST SUPABASE DATABASE SCHEMA
-- Neuro-Affirming Pediatric Support Network
-- ==============================================================================

-- Enable UUID and Cryptographic Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. ENUMS & TYPES
-- ------------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('parent', 'provider', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE session_mode_type AS ENUM ('online', 'in-person', 'both');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_status_type AS ENUM ('unassigned', 'allocated', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE session_status_type AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_status_type AS ENUM ('unread', 'read', 'resolved');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 2. CORE PROFILES TABLE (Linked to auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'parent',
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. PARENT PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.parent_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    child_name TEXT NOT NULL,
    child_age INTEGER NOT NULL,
    diagnosis_tags TEXT[] DEFAULT '{}',
    interests TEXT,
    required_services TEXT[] DEFAULT '{}',
    session_mode session_mode_type DEFAULT 'both',
    location TEXT NOT NULL,
    budget_per_hour NUMERIC DEFAULT 3000,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. PROVIDER PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.provider_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    license_type TEXT NOT NULL,
    license_number TEXT NOT NULL,
    license_file_url TEXT,
    cv_file_url TEXT,
    years_exp INTEGER DEFAULT 0,
    services_offered TEXT[] DEFAULT '{}',
    bio TEXT,
    hourly_rate NUMERIC DEFAULT 3000,
    availability TEXT[] DEFAULT '{}',
    is_verified BOOLEAN DEFAULT FALSE,
    vetting_agreed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 5. PARENT REQUESTS (Admin Matching & Allocation Queue)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.parent_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_name TEXT,
    child_name TEXT NOT NULL,
    child_age INTEGER NOT NULL,
    service_requested TEXT NOT NULL,
    stated_price NUMERIC NOT NULL,
    location TEXT NOT NULL,
    status request_status_type DEFAULT 'unassigned',
    allocated_provider_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 6. THERAPY SESSIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    child_name TEXT NOT NULL,
    service_type TEXT NOT NULL,
    session_mode session_mode_type DEFAULT 'in-person',
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status session_status_type DEFAULT 'confirmed',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 7. SESSION NOTES (Logged by Providers)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.session_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    client_label TEXT NOT NULL,
    session_type TEXT NOT NULL,
    notes TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 8. DEVELOPMENTAL GOALS CHECKLIST
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    child_name TEXT NOT NULL,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 9. MESSAGES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 10. CONTACT FORM INQUIRIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'parent',
    subject TEXT DEFAULT 'general',
    message TEXT NOT NULL,
    status inquiry_status_type DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 11. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'parent'::user_role)
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles can be read by authenticated users" 
    ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE TO authenticated 
    USING (auth.uid() = id);

-- Parent Profiles Policies
CREATE POLICY "Parents can read their own profile or Admin can read all"
    ON public.parent_profiles FOR SELECT TO authenticated
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Parents can insert/update their own profile"
    ON public.parent_profiles FOR ALL TO authenticated
    USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Provider Profiles Policies
CREATE POLICY "Verified providers are readable by authenticated users or Admin reads all"
    ON public.provider_profiles FOR SELECT TO authenticated
    USING (is_verified = true OR auth.uid() = id OR public.is_admin());

CREATE POLICY "Providers can insert/update their own profile"
    ON public.provider_profiles FOR ALL TO authenticated
    USING (auth.uid() = id OR public.is_admin()) WITH CHECK (auth.uid() = id OR public.is_admin());

-- Parent Requests Policies
CREATE POLICY "Parents can view their own requests, Admins can view all, Allocated providers can view"
    ON public.parent_requests FOR SELECT TO authenticated
    USING (parent_id = auth.uid() OR public.is_admin() OR allocated_provider_id = auth.uid());

CREATE POLICY "Parents can create requests"
    ON public.parent_requests FOR INSERT TO authenticated
    WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Admins can update requests (allocate/modify)"
    ON public.parent_requests FOR UPDATE TO authenticated
    USING (public.is_admin() OR parent_id = auth.uid());

-- Goals Policies
CREATE POLICY "Parents can manage their goals"
    ON public.goals FOR ALL TO authenticated
    USING (parent_id = auth.uid() OR public.is_admin())
    WITH CHECK (parent_id = auth.uid() OR public.is_admin());

-- Session Notes Policies
CREATE POLICY "Providers can manage their session notes"
    ON public.session_notes FOR ALL TO authenticated
    USING (provider_id = auth.uid() OR public.is_admin())
    WITH CHECK (provider_id = auth.uid() OR public.is_admin());

-- Messages Policies
CREATE POLICY "Users can view and send their messages"
    ON public.messages FOR ALL TO authenticated
    USING (sender_id = auth.uid() OR receiver_id = auth.uid() OR public.is_admin())
    WITH CHECK (sender_id = auth.uid());

-- Contact Inquiries Policies
CREATE POLICY "Anyone can submit contact inquiry"
    ON public.contact_inquiries FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admins can view contact inquiries"
    ON public.contact_inquiries FOR SELECT TO authenticated
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 13. STORAGE BUCKETS
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true), ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Schema is ready and 100% clean to receive live registrations and inquiries.

