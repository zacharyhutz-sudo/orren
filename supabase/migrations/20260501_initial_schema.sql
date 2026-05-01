-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create budget_categories table
CREATE TABLE IF NOT EXISTS budget_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  monthly_limit DECIMAL(12,2) DEFAULT 0,
  color TEXT DEFAULT '#B18B53',
  classification TEXT DEFAULT 'Wants',
  rollover BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES budget_categories(id) ON DELETE SET NULL,
  merchant TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL,
  type TEXT DEFAULT 'expense', -- 'income' or 'expense'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'asset' or 'liability'
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create account_snapshots table
CREATE TABLE IF NOT EXISTS account_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  balance DECIMAL(12,2) NOT NULL,
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create calculator_scenarios table
CREATE TABLE IF NOT EXISTS calculator_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'retirement' or 'debt-arbitrage'
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_scenarios ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can manage their own categories" ON budget_categories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own transactions" ON transactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own accounts" ON accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own snapshots" ON account_snapshots FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own scenarios" ON calculator_scenarios FOR ALL USING (auth.uid() = user_id);
