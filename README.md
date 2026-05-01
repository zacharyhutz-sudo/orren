# Orren

Orren is a simple, private-first money command center. Track your budget, monitor your net worth, and plan your future with integrated money calculators.

## Features

- **Dashboard:** At-a-glance view of your net worth, monthly income, and spending.
- **Budgeting:** Manual-first transaction tracking with spending groups (Needs, Wants, Savings), recurring transactions, and rollover categories.
- **Net Worth:** Track assets and liabilities over time with milestone-based updates.
- **Money Calculators:** Integrated tools for retirement planning and debt payoff (Snowball/Avalanche) that sync with your real data.
- **CSV Import:** Quickly add data from your bank statements with basic duplicate detection.

## Tech Stack

- **Framework:** Astro
- **Styling:** Tailwind CSS
- **Database/Auth:** Supabase
- **Charts:** Chart.js

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Supabase project

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zacharyhutz-sudo/orren.git
   cd orren
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Initialize Database:**
   Run the SQL scripts in `supabase/migrations/` in your Supabase SQL Editor to set up the required tables and RLS policies.

5. **Run local development server:**
   ```bash
   npm run dev
   ```

## Deployment

Orren is designed to be deployed on platforms like **Netlify** or **Vercel**.

1. Connect your GitHub repository to your hosting provider.
2. Add your `SUPABASE_URL` and `SUPABASE_ANON_KEY` to the provider's Environment Variables settings.
3. Deploy!

## License

Personal project of Zachary Hutzell.
