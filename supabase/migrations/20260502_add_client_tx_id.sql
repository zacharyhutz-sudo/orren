-- Add client_tx_id to transactions for idempotency
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS client_tx_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS transactions_user_client_tx_id_idx ON public.transactions(user_id, client_tx_id);
