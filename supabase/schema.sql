-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Budget Items table
create table public.budget_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  category text not null,
  budgeted_amount decimal(12,2) default 0.00,
  spent_amount decimal(12,2) default 0.00,
  month date default date_trunc('month', current_date)::date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Net Worth Assets/Liabilities table
create table public.net_worth_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  value decimal(12,2) default 0.00,
  type text check (type in ('asset', 'liability')) not null,
  classification text, -- e.g., 'Checking', 'Savings', 'Credit Card'
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.budget_items enable row level security;
alter table public.net_worth_items enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can manage own budget items" on public.budget_items 
  for all using (auth.uid() = user_id);

create policy "Users can manage own net worth items" on public.net_worth_items 
  for all using (auth.uid() = user_id);
