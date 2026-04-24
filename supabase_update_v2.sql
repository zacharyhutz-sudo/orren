-- 1. Ensure snapshots are unique per account per day for clean historical graphing
CREATE UNIQUE INDEX IF NOT EXISTS idx_account_snapshot_date ON account_snapshots (account_id, snapshot_date);

-- 2. Add category to accounts (re-included for completeness)
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS category TEXT;
