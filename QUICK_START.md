# 🚀 QUICK SETUP - COPY & PASTE THIS INTO SUPABASE

## Step 1: Go to Supabase SQL Editor
Visit: https://ziydtipspgbsrawpdvyi.supabase.co/project/_/sql

## Step 2: Copy the SQL File
The complete database schema is in: **`supabase-schema.sql`**

Open that file, copy ALL content, paste into Supabase SQL Editor, and click Run.

## Step 3: Verify Setup
Paste this query to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see these tables:
- bookings
- contact_messages  
- guests
- pet_care_requests
- reviews
- rooms

## Step 4: Test with Sample Query

```sql
-- View all rooms
SELECT * FROM rooms;

-- Should show 3 rooms:
-- - Presidential Suite ($899)
-- - Deluxe Room ($399)
-- - Standard Room ($249)
```

## ✅ That's It!

Your database is ready. Now run:

```bash
npm install  # if not already done
npm run dev
```

Visit: http://localhost:5173

---

## 🔧 Quick Test Booking (Optional)

Want to test the system? Paste this:

```sql
-- Create test guest
INSERT INTO guests (first_name, last_name, email, phone, address)
VALUES ('Jane', 'Smith', 'jane.smith@test.com', '+1555000000', '456 Demo Ave')
RETURNING id;

-- Note the ID returned above, then:

-- Create test booking (replace YOUR_GUEST_ID with the ID from above)
INSERT INTO bookings (
  room_id, guest_id, check_in_date, check_out_date,
  number_of_guests, total_nights, total_price, status
) VALUES (
  2,  -- Deluxe Room
  'YOUR_GUEST_ID',  -- Replace this!
  CURRENT_DATE + 7,  -- 7 days from now
  CURRENT_DATE + 10, -- 10 days from now
  2, 3, 1197.00, 'confirmed'
);

-- View the booking
SELECT * FROM booking_details 
WHERE email = 'jane.smith@test.com';
```

Then go to the website, click "My Bookings", enter `jane.smith@test.com`, and you'll see the booking!

---

## 📊 Quick Reports

### See all bookings:
```sql
SELECT * FROM booking_details ORDER BY created_at DESC;
```

### Check room availability:
```sql
SELECT * FROM room_availability_summary;
```

### View contact messages:
```sql
SELECT * FROM contact_messages ORDER BY created_at DESC;
```

### View pet care requests:
```sql
SELECT * FROM pet_care_requests ORDER BY created_at DESC;
```

---

## 🎉 You're All Set!

Everything is configured and ready to use. Just copy the `supabase-schema.sql` file content into Supabase and you're done!
