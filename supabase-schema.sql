-- ============================================================
-- MYAN SCHOLAR — Supabase Database Schema
-- Run this in your Supabase project → SQL Editor → New Query
-- ============================================================

-- SCHOLARSHIPS table (core record)
create table if not exists scholarships (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),

  -- Basic info (English)
  name          text not null,
  country       text not null,
  level         text not null,         -- undergraduate | masters | phd | any
  field         text,                  -- e.g. "Engineering, Science, Arts"
  deadline      date,
  source_url    text not null,
  host_org      text,                  -- e.g. "Japanese Government (MEXT)"
  covers        text,                  -- e.g. "Tuition, airfare, monthly allowance"
  requirements  text not null,         -- raw English requirements text

  -- AI-generated content (Burmese)
  name_mm             text,            -- scholarship name in Burmese
  requirements_mm     text,            -- translated requirements
  instructions_mm     text,            -- step-by-step preparation guide
  checklist_mm        text,            -- document checklist (JSON string)

  -- Status
  is_published        boolean default false,
  ai_generated        boolean default false,   -- true = found by daily AI job
  ai_processed        boolean default false    -- true = Gemini has processed it
);

-- INDEX for fast filtering
create index if not exists idx_scholarships_country   on scholarships(country);
create index if not exists idx_scholarships_level     on scholarships(level);
create index if not exists idx_scholarships_deadline  on scholarships(deadline);
create index if not exists idx_scholarships_published on scholarships(is_published);

-- AUTO-UPDATE updated_at on any row change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger scholarships_updated_at
  before update on scholarships
  for each row execute function update_updated_at();

-- ENABLE Row Level Security (RLS)
alter table scholarships enable row level security;

-- PUBLIC can read published scholarships
create policy "Public can read published scholarships"
  on scholarships for select
  using (is_published = true);

-- SERVICE ROLE (your backend) can do everything
-- (service_role key bypasses RLS automatically in Supabase)
