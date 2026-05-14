-- ==============================================================================
-- INITIAL SCHEMA: SAAS MANAJEMEN SEKOLAH (MULTI-TENANT)
-- ==============================================================================
-- Eksekusi script ini di SQL Editor Supabase Anda.

-- 1. Buat tabel 'schools' (Tenants)
-- Menyimpan data sekolah yang berlangganan.
CREATE TABLE public.schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE, -- misal: sma1 untuk sma1.sekolah.app
    address TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Buat tabel 'profiles' (Pengguna)
-- Meng-extend tabel auth.users bawaan Supabase.
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE, -- Null jika Superadmin
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('SUPERADMIN', 'SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'CASHIER')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Trigger untuk otomatis membuat 'profile' saat ada user baru mendaftar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'STUDENT'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Ini adalah inti dari keamanan Multi-Tenant. Memastikan Sekolah A tidak bisa melihat data Sekolah B.

-- Aktifkan RLS
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy untuk 'schools'
-- 1. Semua orang bisa melihat data sekolah (diperlukan untuk Landing Page / Subdomain routing)
CREATE POLICY "Public profiles are viewable by everyone."
ON public.schools FOR SELECT
USING ( true );

-- Policy untuk 'profiles'
-- 1. User bisa melihat datanya sendiri
CREATE POLICY "Users can view own profile."
ON public.profiles FOR SELECT
USING ( auth.uid() = id );

-- 2. (MULTI-TENANT) Admin Sekolah, Guru, Siswa HANYA bisa melihat profile dari sekolah yang sama
CREATE POLICY "Users can view profiles from the same school."
ON public.profiles FOR SELECT
USING ( 
  school_id IN (
    SELECT school_id FROM public.profiles WHERE id = auth.uid()
  )
);

-- 3. Superadmin bisa melihat semua profil
CREATE POLICY "Superadmins can view all profiles."
ON public.profiles FOR SELECT
USING ( 
  EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'SUPERADMIN'
  )
);

-- 4. User bisa mengupdate profilnya sendiri
CREATE POLICY "Users can update own profile."
ON public.profiles FOR UPDATE
USING ( auth.uid() = id );
