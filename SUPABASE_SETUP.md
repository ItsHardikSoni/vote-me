# Supabase Setup Guide

## 1. Install Supabase CLI (Optional but recommended)
```bash
npm install -g supabase
```

## 2. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Fill in your project details
5. Wait for the project to be set up

## 3. Get Your Project Credentials
1. Go to your project dashboard
2. Go to Settings → API
3. Copy your Project URL and anon/public key

## 4. Install Dependencies
```bash
npm install @supabase/supabase-js
```

## 5. Environment Variables
Create a `.env` file in your project root with:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**📖 Detailed Setup Instructions**: See `ENVIRONMENT_SETUP.md` for complete step-by-step guide on creating and configuring your `.env` file.

## 6. Database Setup
1. Go to your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Run the query to create all tables

## 7. Row Level Security (RLS)
The schema includes RLS policies that are already configured in the SQL file.

## 8. Test the Integration
1. Try registering a new user in your app
2. Check your Supabase dashboard to see if the user data was saved
3. Verify that OTP verification updates the user's verification status

## Database Tables Created:
- `users` - Stores all user registration data
- `states` - Stores Indian states
- `districts` - Stores districts for each state

## Security Features:
- Password hashing (implement proper hashing in production)
- Email and phone number uniqueness
- Data validation constraints
- Row Level Security policies
- Input sanitization

## Next Steps for Production:
1. Implement proper password hashing (bcrypt, argon2)
2. Add email verification system
3. Set up authentication flows
4. Add data encryption for sensitive fields
5. Implement rate limiting
6. Add audit logging
