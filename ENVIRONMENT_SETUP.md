# Environment Variables Setup Guide

## ✅ .env File Created!

Your `.env` file has been created automatically in your project root. Now you just need to update it with your actual Supabase credentials.

### Step 1: Check Your .env File
Your `.env` file should contain:

```bash
# Supabase Configuration - Environment Variables
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 2: Get Your Supabase Credentials

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select Your Project**: Click on your project name
3. **Go to API Settings**: Settings → API (in the left sidebar)
4. **Copy Project URL**: Copy the "Project URL" value
5. **Copy Anonymous Key**: Copy the "anon/public" key

### Step 3: Update .env File
Replace the placeholder values in your `.env` file:
- Replace `https://your-project-id.supabase.co` with your actual Project URL
- Replace `your-anon-key-here` with your actual Anonymous Key

### Step 4: Security Best Practices
- ✅ **Add .env to .gitignore**: Make sure `.env` is in your `.gitignore` file
- ❌ **Never commit .env**: Your credentials should never be in version control
- 🔐 **Use different keys**: Use separate projects/keys for development and production
- 🚫 **Don't share keys**: Keep your Supabase keys private

### Step 5: Verify Setup
After creating the `.env` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npx expo start
```

## 🔍 How Environment Variables Work

- **EXPO_PUBLIC_** prefix makes variables available in your React Native app
- Variables are automatically loaded by Expo
- Access them using `process.env.EXPO_PUBLIC_SUPABASE_URL`

## 🐛 Troubleshooting

**App crashes or shows undefined values?**
- Check that your `.env` file is in the project root
- Verify the variable names match exactly (including EXPO_PUBLIC_ prefix)
- Restart your development server after creating `.env`

**Database connection fails?**
- Double-check your Supabase URL and key
- Make sure your Supabase project is active
- Verify the database schema has been run

## 📁 File Structure
```
vote-me/
├── .env                    ✅ Created - Update with real credentials
├── lib/
│   └── supabase.ts         ← Uses environment variables
├── database/
│   └── schema.sql          ← Database setup
├── SUPABASE_SETUP.md       ← Complete setup guide
└── ENVIRONMENT_SETUP.md   ← This file
```

## 🎯 **Next Steps Summary**

1. ✅ **.env file created** with placeholder values
2. 🔄 **Update .env** with your real Supabase credentials
3. 🗄️ **Run database schema** in Supabase SQL editor
4. 🔄 **Restart development server**
5. 🧪 **Test signup flow** to verify database integration

**Your .env file is ready! Just replace the placeholder values with your actual Supabase credentials.**
