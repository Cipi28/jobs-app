/*
  # Jobs App Database Schema Migration

  1. New Tables
    - `users` - User accounts with authentication
    - `companies` - Company profiles with job listings
    - `jobs` - Job postings with detailed information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure user data access

  3. Features
    - Full-text search on jobs
    - Proper relationships between tables
    - Optimized indexes for performance
    - JSON fields for flexible data storage
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (maps to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  city text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  location text NOT NULL,
  logo_image text NOT NULL,
  domain integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  work_mode jsonb NOT NULL DEFAULT '{"type": "full time"}',
  location text NOT NULL,
  experience_level integer NOT NULL DEFAULT 1,
  aptitudes jsonb,
  job_image text,
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz,
  -- Add search vector for full-text search
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', name || ' ' || description || ' ' || location)
  ) STORED
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_search ON public.jobs USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON public.jobs (company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs (location);
CREATE INDEX IF NOT EXISTS idx_jobs_experience_level ON public.jobs (experience_level);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_companies_name ON public.companies (name);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for companies table (public read access)
CREATE POLICY "Companies are publicly readable"
  ON public.companies
  FOR SELECT
  TO anon, authenticated
  USING (deleted_at IS NULL);

-- RLS Policies for jobs table (public read access)
CREATE POLICY "Jobs are publicly readable"
  ON public.jobs
  FOR SELECT
  TO anon, authenticated
  USING (deleted_at IS NULL);

-- Insert sample data from backup
INSERT INTO public.companies (id, name, description, url, location, logo_image, domain, created_at, updated_at, deleted_at) VALUES
(gen_random_uuid(), 'Trust Euro Therm', 'De 30 de ani, ne-am impus ca experti in materie de sisteme de incalzire si climatizare moderne, energie regenerabila si solutii de proiectare. Suntem o companie cu expunere nationala, dinamica, inovatoare, cu un mediu de lucru orientat catre perfectionare continua.', 'https://www.trust-expert.ro/', 'Piatra Neamț, Romania', 'https://www.bestjobs.eu/_next/image?url=https%3A%2F%2Fimgcdn.bestjobs.eu%2Fcdn%2Fel%2Fplain%2Femployer_logo%2F58318a6fc3ad8.jpg&w=128&q=75', 1, now(), now(), NULL),
(gen_random_uuid(), 'RED BULL', 'In 1987 Red Bull not only launched a completely new product, but it also created and has led ever since a whole new product category, Energy Drinks. Nowadays, Red Bull employs over people throughout 172 nations, are selling 10 billion+ cans a year.', 'https://www.redbull.com/ro-ro', 'București, România', 'https://www.bestjobs.eu/_next/image?url=https%3A%2F%2Fimgcdn.bestjobs.eu%2Fcdn%2Fel%2Fplain%2Femployer_logo%2F63be8dccb3319.png&w=128&q=75', 1, now(), now(), NULL),
(gen_random_uuid(), 'prohuman apt', 'Cu o prezență de peste 25 de ani pe piața românească de resurse umane, grupul de firme PROHUMAN APT este prezent în avangarda primilor 3 furnizori de servicii complexe de HR din România.', 'https://www.prohuman.ro/', 'București, România', 'https://www.bestjobs.eu/_next/image?url=https%3A%2F%2Fimgcdn.bestjobs.eu%2Fcdn%2Fel%2Fplain%2Femployer_logo%2F672e8ff6d89d1.png&w=128&q=75', 1, now(), now(), NULL),
(gen_random_uuid(), 'ALTEX', 'ALTEX is a Romanian investment group born in 1992 and the market leader in electro-IT retail for over 10 years. With 116 ALTEX and Media Galaxy stores plus e-commerce, and over 4000 employees, ALTEX reached in 2015 revenues of 430 million EUR.', 'https://altex.ro/', 'București, România', 'https://www.bestjobs.eu/_next/image?url=https%3A%2F%2Fimgcdn.bestjobs.eu%2Fcdn%2Fel%2Fplain%2Femployer_logo%2F58318a7765651.jpg&w=128&q=75', 1, now(), now(), NULL);

-- Insert sample jobs (will be linked to companies via triggers or manual updates)
DO $$
DECLARE
  trust_euro_id uuid;
  red_bull_id uuid;
  prohuman_id uuid;
  altex_id uuid;
BEGIN
  -- Get company IDs
  SELECT id INTO trust_euro_id FROM public.companies WHERE name = 'Trust Euro Therm' LIMIT 1;
  SELECT id INTO red_bull_id FROM public.companies WHERE name = 'RED BULL' LIMIT 1;
  SELECT id INTO prohuman_id FROM public.companies WHERE name = 'prohuman apt' LIMIT 1;
  SELECT id INTO altex_id FROM public.companies WHERE name = 'ALTEX' LIMIT 1;

  -- Insert jobs
  INSERT INTO public.jobs (name, description, work_mode, location, experience_level, aptitudes, company_id) VALUES
  ('Inginer Vanzari Pompe de caldura NIBE Suedia', '<div>Candidatul ideal va configura și prezenta soluții cu pompe de căldură, climatizare și ventilație pentru instalații complete cu eficiență energetică ridicată.</div>', '{"type": "full time"}', 'Hunedoara, Romania', 3, '["HVAC", "Vanzari", "Energie regenerabila"]', trust_euro_id),
  ('Specialist relatii cu clientii service', '<div>Asigurarea de suport in activitatile de Customer Relations și comunicare rapidă cu clienții.</div>', '{"type": "full time"}', 'Piatra Neamț, Romania', 2, '["Customer Service", "Comunicare", "Suport tehnic"]', trust_euro_id),
  ('Business Development Innovation Expert', '<div>Dezvoltarea strategiilor de business și implementarea soluțiilor inovatoare pentru creșterea companiei.</div>', '{"type": "remote"}', 'București, Romania', 4, '["Business Development", "Inovatie", "Strategie"]', red_bull_id),
  ('Agent Call Center', '<div>Oferirea de suport clienților prin telefon și rezolvarea solicitărilor acestora în mod eficient.</div>', '{"type": "full time"}', 'București, Romania', 1, '["Call Center", "Comunicare", "Suport clienti"]', prohuman_id),
  ('Specialist IT Support', '<div>Menținerea și suportul sistemelor IT, rezolvarea problemelor tehnice și asistența utilizatorilor.</div>', '{"type": "hybrid"}', 'București, România', 2, '["IT Support", "Troubleshooting", "Sisteme IT"]', altex_id);
END $$;