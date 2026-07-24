# SmartKhata

A frontend-only, production-quality digital udhaar (credit) ledger for small Indian shopkeepers — built as a portfolio-ready SaaS demo. No backend, no database, no APIs: everything runs on mock data and React state.

## Tech stack

- React + Vite
- Tailwind CSS (custom "ledger book" design system)
- Framer Motion
- React Router
- Recharts
- React Icons

## Design concept

The visual language is drawn from the traditional Indian **bahi-khata** (paper account ledger): a red-covered register with ruled paper, red/black ink, and tabular jama-udhaar entries. That's translated into a modern SaaS UI — a ledger-red accent stripe on every card, ruled-paper texture in the hero mockup, a serif display face (Fraunces) for headings, and a monospace face (IBM Plex Mono) for all rupee amounts so numbers line up the way they do in a real register.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Log in with **any email and password** — authentication is simulated entirely on the frontend.

## Pages

- **Landing** — hero, features, "Why SmartKhata", testimonials, FAQ, CTA
- **Login** — dummy authentication
- **Dashboard** — animated stats, recovery/weekly/credit-vs-payment charts, recent activity, upcoming dues, top pending customers
- **Customers** — search, filter (pending/paid/all), sort (name/balance/recent)
- **Customer Detail** — profile, repayment progress ring, transaction timeline
- **Add Transaction** — form with a simulated voice-input button and an editable confirmation preview
- **Analytics** — recovery trend, risk distribution, payment delay, top customers by balance
- **Settings** — dark mode, language selector, reminder message template, profile

## Notes

- All data lives in `src/data/mockData.js` and is seeded into React state via `src/context/DataContext.jsx`, so entries you add in the Add Transaction page update the Dashboard, Customers, and Analytics pages for the rest of the session.
- Voice input is a frontend simulation: it fills the form with a random sample entry after a short delay, then always shows an editable preview before saving.
- Dark mode, language selection, and the reminder template are functional UI state but don't persist across a page reload (frontend-only, by design).
