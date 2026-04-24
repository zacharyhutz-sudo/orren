-- Create a table for financial accounts (Assets/Liabilities)
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('asset', 'liability')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for monthly balance snapshots
CREATE TABLE account_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(account_id, snapshot_date)
);

-- Set up Row Level Security (RLS)
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_snapshots ENABLE ROW LEVEL SECURITY;

-- Policies for accounts
CREATE POLICY "Users can manage their own accounts" ON accounts
  FOR ALL USING (auth.uid() = user_id);

-- Policies for snapshots
CREATE POLICY "Users can manage their own snapshots" ON account_snapshots
  FOR ALL USING (auth.uid() = user_id);
