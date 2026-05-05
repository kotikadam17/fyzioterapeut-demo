-- Spusť v Supabase SQL Editoru (dashboard.supabase.com → SQL Editor)

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  user_id text not null unique,  -- Clerk user ID
  name text not null,
  email text not null,
  phone text not null default '',
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists consultations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  notes text not null default '',
  date date not null,
  created_at timestamptz not null default now()
);

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  url text not null,
  label text,
  created_at timestamptz not null default now()
);

create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  product_name text not null,
  type text not null check (type in ('fyzioterapie', 'rehab', 'program')),
  date date not null default current_date,
  price numeric(10,2) not null
);

-- Storage bucket pro fotky
insert into storage.buckets (id, name, public)
values ('client-photos', 'client-photos', true)
on conflict (id) do nothing;
