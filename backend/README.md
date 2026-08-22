# Backend

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

1. Firebase Console → enable Cloud Firestore and Storage
2. Create collection `hackathon_registrations` (or let the first submit create it)
3. Project Settings → Service Accounts → Generate new private key
4. Put `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, and `FIREBASE_STORAGE_BUCKET` in `.env.local`

Keep the `\n` characters in `FIREBASE_PRIVATE_KEY`.

Recommended Firestore rules (writes only via Admin SDK):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /hackathon_registrations/{docId} {
      allow read, write: if false;
    }
  }
}
```
