-- Add category to accounts
ALTER TABLE accounts ADD COLUMN category TEXT;

-- Migration: Set default categories for existing accounts if any
UPDATE accounts SET category = 'Cash' WHERE type = 'asset' AND category IS NULL;
UPDATE accounts SET category = 'Other' WHERE type = 'liability' AND category IS NULL;
