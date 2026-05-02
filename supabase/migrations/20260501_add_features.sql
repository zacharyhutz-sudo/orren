-- Add new columns to budget_categories
ALTER TABLE budget_categories ADD COLUMN IF NOT EXISTS classification TEXT DEFAULT 'Wants';
ALTER TABLE budget_categories ADD COLUMN IF NOT EXISTS rollover BOOLEAN DEFAULT false;

-- Create calculator_scenarios table
CREATE TABLE IF NOT EXISTS calculator_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'retirement' or 'debt-arbitrage'
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for calculator_scenarios
ALTER TABLE calculator_scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own scenarios"
  ON calculator_scenarios
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
