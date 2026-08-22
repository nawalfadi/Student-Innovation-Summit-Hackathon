# Back end

Server only: registration API, Firebase, and validation.

No pages, components, or website UI.

## What’s inside

- `src/app/api/register/route.ts` — POST `/api/register` (saves to Firestore, uploads files)
- `src/lib/firebase/admin.ts` — Firebase Admin (Firestore + Storage)
- `src/lib/validations/registration.ts` — server-side form checks
- `src/types/registration.ts` — registration data shape
- `src/i18n/dictionaries.ts` — validation messages
- `.env.local.example` — required server environment variables

## Environment

Copy `.env.local.example` to `.env.local` and fill in Firebase Admin keys.
