# CCTV Security Business App - Setup Guide

## Overview
This is a React + Vite + Firebase application for managing a CCTV/security business with multi-role support (admin, technician, vendor).

## Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- A Firebase project created at https://console.firebase.google.com

## Quick Start

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing one
3. Enable the following services:
   - **Authentication** (Email/Password provider)
   - **Firestore Database**
   - **Storage** (optional for file uploads)

4. Register a Web App:
   - Go to Project Settings > General > Your apps
   - Click "Add app" > Web
   - Copy the configuration values

5. Update `.env` file with your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 3. Deploy Security Rules
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if needed)
firebase init

# Deploy security rules
firebase deploy --only firestore:rules
```

### 4. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

Production files will be in the `dist/` folder.

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy automatically on every push

### Option 2: Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

## Project Structure

```
├── src/
│   ├── app/              # Main application components
│   │   ├── App.tsx       # Root component
│   │   └── components/   # Feature components
│   ├── styles/           # CSS styles
│   ├── firebase.ts       # Firebase configuration
│   └── main.tsx          # Entry point
├── .env                  # Environment variables (DO NOT COMMIT)
├── .env.example          # Example env file (safe to commit)
├── firebase.json         # Firebase configuration
├── firestore.rules       # Security rules
├── package.json          # Dependencies
└── vite.config.ts        # Vite configuration
```

## Features

- **Multi-role Authentication**: Vendor and Technician roles
- **Customer Management**: Add, view, and manage customers
- **Job/Work Management**: Track CCTV installation and maintenance jobs
- **Expense Tracking**: Calculate and track project expenses
- **Billing System**: Generate and manage invoices
- **Team Management**: Vendor can manage technician team
- **Dark/Light Theme**: Toggle between themes

## Important Notes

⚠️ **Security**: Never commit `.env` file with real credentials to Git. The `.env.example` file is provided as a template.

⚠️ **Firestore Rules**: Make sure to deploy the security rules before going to production to protect your data.

⚠️ **Environment Variables**: All Firebase config variables must be prefixed with `VITE_` for Vite to expose them to the client.

## Troubleshooting

### Build fails with module not found
```bash
rm -rf node_modules
npm install
```

### Firebase connection issues
1. Check that all `.env` variables are set correctly
2. Verify Firebase services are enabled in console
3. Check browser console for specific error messages

### Port already in use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

## Next Steps

1. Set up your Firebase project
2. Configure environment variables
3. Deploy security rules
4. Customize the app for your business needs
5. Deploy to production

For more help, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
