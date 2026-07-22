# هاكاثون قمة الابتكار الطلابي 2026

موقع تسجيل ومعلومات رسمي لـ **Student Innovation Summit Hackathon 2026** — هاكاثون قمة الابتكار الطلابي، بإشراف **جامعة اليمامة** ودعم **رؤية السعودية 2030**.

## Tech Stack

- **Next.js 15+** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS v4**
- **Firebase Firestore** (via Firebase Admin SDK)
- **Lucide React** icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

#### Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Cloud Firestore** in production or test mode

#### Create Firestore collection

Create a collection named `hackathon_registrations` (it will also be created automatically on first submission).

Recommended Firestore security rules (client-side reads disabled; writes via Admin SDK only):

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

#### Generate a service account key

1. Firebase Console → Project Settings → Service Accounts
2. Click **Generate new private key**
3. Download the JSON file

#### Configure environment variables

Copy the example file:

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
# Optional: client-side config (for future client features)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Required: server-side registration API
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

> **Important:** Keep the `\n` characters in `FIREBASE_PRIVATE_KEY` — they represent line breaks in the PEM key.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/register/route.ts   # Registration API → Firestore
│   ├── layout.tsx              # RTL Arabic layout + Cairo font
│   ├── page.tsx                # Main landing page
│   └── globals.css             # Brand colors & styles
├── components/
│   ├── layout/                 # Header, Footer, SectionHeading
│   ├── sections/               # Hero, About, Tracks, Timeline, etc.
│   ├── registration/           # Registration modal form
│   └── ui/                     # Reusable UI components
├── context/                    # Registration modal state
├── data/content.ts             # Arabic content & static data
├── lib/
│   ├── firebase/admin.ts       # Firebase Admin initialization
│   └── validations/            # Form validation
└── types/                      # TypeScript interfaces
```

## Registration Flow

1. User clicks **سجّل الآن** (Register Now)
2. Modal form collects student & team data
3. Client validates input, then POSTs to `/api/register`
4. Server validates again and writes to Firestore `hackathon_registrations` collection
5. Success confirmation is shown to the user

### Registration document schema

```typescript
{
  fullName: string;
  universityId: string;
  universityName: string;
  email: string;
  phone: string;
  track: "mowajjih" | "muhaffiz" | "jisr";
  teamName: string;
  memberCount: number;        // 3–5
  members: { name: string; email: string }[];
  projectIdea: string;
  status: "pending";
  createdAt: Timestamp;
  submittedAt: string;
}
```

## Brand Colors

| Token   | HEX       | Usage                          |
|---------|-----------|--------------------------------|
| Navy    | `#1B365D` | Headers, primary branding      |
| Gold    | `#D9822B` | Accents, CTAs, highlights      |
| Surface | `#F8F9FA` | Section backgrounds            |

## Deploy

Deploy to [Vercel](https://vercel.com) or any Node.js host:

```bash
npm run build
npm start
```

Add the Firebase environment variables in your hosting platform's settings.

## License

© 2026 Al Yamamah University. All rights reserved.
