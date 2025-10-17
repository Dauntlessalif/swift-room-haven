# 📋 SQL COMMAND FOR SUPABASE

## 🎯 What You Need To Do

### Option 1: Use the SQL File (RECOMMENDED)

1. **Open the file:** `supabase-schema.sql` in this project
2. **Copy ALL its content** (it's about 500 lines)
3. **Go to Supabase:** https://ziydtipspgbsrawpdvyi.supabase.co
4. **Click:** SQL Editor (left sidebar)
5. **Paste** the entire content
6. **Click:** Run (or press Cmd/Ctrl + Enter)
7. **Wait** 5-10 seconds for completion

✅ **Done!** All tables, functions, and sample data are created.

### Option 2: What the SQL Does

The `supabase-schema.sql` file contains everything needed:

**Creates 6 Tables:**
1. `rooms` - Hotel rooms (with 3 sample rooms)
2. `guests` - Guest profiles
3. `bookings` - Reservations
4. `contact_messages` - Contact form data
5. `pet_care_requests` - Pet service requests
6. `reviews` - Guest reviews

**Creates Functions:**
- `check_room_availability()` - Checks if room is available for dates
- `update_updated_at_column()` - Auto-updates timestamps

**Creates Views:**
- `booking_details` - Complete booking info with joins
- `room_availability_summary` - Room availability overview

**Sets Up Security:**
- Row Level Security (RLS) policies
- Public read access for rooms
- Authenticated access for bookings

**Inserts Sample Data:**
```
Presidential Suite - $899/night
Deluxe Room - $399/night
Standard Room - $249/night
```

## ✅ Verify It Worked

Run this in Supabase SQL Editor:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' ORDER BY table_name;

-- Check rooms were added
SELECT id, name, price FROM rooms;
```

You should see 6 tables and 3 rooms.

## 🧪 Test the System

### Quick Test Query:

```sql
-- View all rooms
SELECT * FROM rooms;

-- Check availability function
SELECT check_room_availability(1, '2025-11-01', '2025-11-05');

-- View booking details (will be empty initially)
SELECT * FROM booking_details;
```

## 🔥 That's It!

After running the SQL file:
1. Run `npm run dev`
2. Go to http://localhost:5173
3. Start booking rooms!

The website will automatically connect to your Supabase database and everything will work.

## 📄 The SQL File Location

```
swift-room-haven/
└── supabase-schema.sql  ← This file!
```

**Size:** ~25 KB
**Lines:** ~570
**Time to run:** ~5-10 seconds

## 🆘 Troubleshooting

**Error: "relation already exists"**
- Tables are already created, you're good!

**Error: "permission denied"**
- Make sure you're logged into Supabase
- Use the project: https://ziydtipspgbsrawpdvyi.supabase.co

**Can't find SQL Editor**
- Look for "SQL Editor" in the left sidebar
- Or go to: https://ziydtipspgbsrawpdvyi.supabase.co/project/_/sql

## 📚 More Info

- Full setup guide: `SETUP.md`
- Quick start: `QUICK_START.md`
- Database guide: `DATABASE_GUIDE.md`
- Summary: `IMPLEMENTATION_SUMMARY.md`

---

**Ready?** Just copy the `supabase-schema.sql` file into Supabase SQL Editor and click Run! 🚀
