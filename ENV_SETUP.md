# 🔐 Environment Variables Setup

## ✅ Quick Setup

Your `.env` file has been created with your Supabase credentials. The application is now using environment variables instead of hardcoded values.

## 📁 Files Created

1. **`.env`** - Your actual credentials (already configured, **not tracked by git**)
2. **`.env.example`** - Template file (tracked by git, safe to commit)

## 🔒 Security

✅ The `.env` file is automatically ignored by git (added to `.gitignore`)
✅ Your API keys are now loaded from environment variables
✅ The code validates that environment variables are present

## 📋 Environment Variables

Your `.env` file contains:

```env
VITE_SUPABASE_URL=https://ziydtipspgbsrawpdvyi.supabase.co
VITE_SUPABASE_ANON_KEY=your_service_role_key
```

## 🔄 How It Works

The `src/lib/supabase.ts` file now:
1. ✅ Reads credentials from `import.meta.env`
2. ✅ Validates that both variables are present
3. ✅ Throws a helpful error if missing
4. ✅ No hardcoded credentials in the code

## 🚀 For Development

Just run as normal:
```bash
npm run dev
```

Vite automatically loads the `.env` file.

## 📦 For Production Deployment

### Vercel
1. Go to Project Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = `https://ziydtipspgbsrawpdvyi.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your_key`

### Netlify
1. Go to Site Settings → Environment Variables
2. Add the same variables as above

### Other Platforms
Add the environment variables in your platform's dashboard.

## 🔧 For Team Members

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the actual values (ask team lead for credentials)

3. Never commit the `.env` file to git

## ⚠️ Important Notes

- ✅ `.env` is in `.gitignore` - your keys are safe
- ✅ `.env.example` is tracked - safe template for others
- ✅ Use the service role key (not anon key) for full access
- ✅ Vite requires `VITE_` prefix for environment variables
- ✅ Restart dev server if you change `.env` values

## 🧪 Test It

Run this to verify environment variables are loaded:
```bash
npm run dev
```

If environment variables are missing, you'll see:
```
Error: Missing Supabase environment variables. 
Please check your .env file.
Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

## ✅ You're All Set!

Your credentials are now secure and not hardcoded. The application will work exactly the same, but now it's production-ready and secure! 🎉
