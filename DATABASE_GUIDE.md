# Swift Room Haven - Complete Setup Guide

## 🎯 Quick Start

### Step 1: Setup Supabase Database

1. **Go to Supabase SQL Editor**
   - Visit: https://ziydtipspgbsrawpdvyi.supabase.co
   - Navigate to: SQL Editor (in left sidebar)
   - Click: "+ New Query"

2. **Execute the Database Schema**
   - Open the file: `supabase-schema.sql` in your project root
   - Copy ALL the content (it's a long file!)
   - Paste into Supabase SQL Editor
   - Click "Run" or press Cmd/Ctrl + Enter
   - Wait for success message (should take 5-10 seconds)

3. **Verify Database Setup**
   Run this query to verify all tables were created:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```
   
   You should see:
   - bookings
   - contact_messages
   - guests
   - pet_care_requests
   - reviews
   - rooms

### Step 2: Install & Run the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Visit: http://localhost:5173

## 📊 Database Tables Overview

### 1. **rooms** - Hotel Room Information
Stores all available rooms with details, pricing, and amenities.

**Key Fields:**
- `id`: Room identifier
- `name`: Room name (e.g., "Presidential Suite")
- `description`: Detailed description
- `price`: Price per night
- `capacity`: Maximum guests
- `size`: Room size (e.g., "1,200 sq ft")
- `bed_type`: Type of bed (e.g., "King Bed")
- `amenities`: Array of amenities
- `available`: Availability status

**Sample Data:**
Three rooms are pre-populated:
- Presidential Suite ($899/night)
- Deluxe Room ($399/night)
- Standard Room ($249/night)

### 2. **guests** - Guest Profiles
Stores guest information. Automatically creates or updates on booking.

**Key Fields:**
- `id`: UUID (auto-generated)
- `first_name`, `last_name`: Guest name
- `email`: Unique email (used for lookups)
- `phone`: Contact number
- `address`: Full address

### 3. **bookings** - Reservations
Main booking records with all reservation details.

**Key Fields:**
- `id`: UUID (auto-generated)
- `room_id`: Links to rooms table
- `guest_id`: Links to guests table
- `check_in_date`, `check_out_date`: Stay dates
- `number_of_guests`: Guest count
- `total_nights`: Calculated nights
- `total_price`: Total cost
- `status`: pending | confirmed | checked_in | checked_out | cancelled
- `special_requests`: Optional guest requests

**Status Flow:**
```
pending → confirmed → checked_in → checked_out
           ↓
        cancelled
```

### 4. **contact_messages** - Contact Form Submissions
Stores messages from the contact form.

**Key Fields:**
- `name`, `email`, `phone`: Contact details
- `subject`, `message`: Message content
- `status`: new | read | replied | archived

### 5. **pet_care_requests** - Pet Service Requests
Stores pet care service requests.

**Key Fields:**
- `booking_id`: Optional link to booking
- `guest_name`, `email`, `phone`: Contact info
- `pet_type`, `pet_name`: Pet details
- `service_type`: sitting | walking | grooming | daycare | overnight
- `start_date`, `end_date`: Service dates
- `status`: pending | approved | in_progress | completed | cancelled

### 6. **reviews** - Guest Reviews (Ready for implementation)
Structure ready for adding review functionality.

## 🔧 Database Functions

### check_room_availability()
Checks if a room is available for given dates.

**Usage:**
```sql
SELECT check_room_availability(1, '2025-10-10', '2025-10-15');
-- Returns: true or false
```

**How it works:**
- Checks for overlapping bookings
- Excludes cancelled bookings
- Returns true if no conflicts

## 📊 Database Views

### booking_details
Complete booking information with guest and room details joined.

**Usage:**
```sql
SELECT * FROM booking_details 
ORDER BY check_in_date DESC 
LIMIT 10;
```

**Returns:** All booking info with guest names, contact, room details, prices, etc.

### room_availability_summary
Quick overview of room availability.

**Usage:**
```sql
SELECT * FROM room_availability_summary;
```

**Returns:** Room info with active bookings count and next available date.

## 🔒 Row Level Security (RLS)

All tables have RLS enabled for security:

**Public Access (No Authentication Required):**
- ✅ Read all rooms
- ✅ Create bookings
- ✅ Read own bookings
- ✅ Create contact messages
- ✅ Create pet care requests
- ✅ Read approved reviews

**Restricted (Service Role Only):**
- ❌ Update/Delete bookings
- ❌ Manage guests
- ❌ Update room information
- ❌ Moderate reviews

## 🧪 Testing Your Setup

### Test 1: View Rooms
```sql
SELECT * FROM rooms;
```
Should return 3 rooms.

### Test 2: Create a Test Booking

```sql
-- 1. Create a test guest
INSERT INTO guests (first_name, last_name, email, phone, address)
VALUES ('John', 'Doe', 'john.doe@test.com', '+1234567890', '123 Test St')
RETURNING id;

-- 2. Create a booking (replace <guest_id> with ID from above)
INSERT INTO bookings (
  room_id,
  guest_id,
  check_in_date,
  check_out_date,
  number_of_guests,
  total_nights,
  total_price,
  status
) VALUES (
  1,  -- Presidential Suite
  '<guest_id>',  -- Replace with actual guest ID
  '2025-11-01',
  '2025-11-04',
  2,
  3,
  2697.00,
  'confirmed'
);

-- 3. View the booking
SELECT * FROM booking_details WHERE email = 'john.doe@test.com';
```

### Test 3: Check Availability
```sql
-- Check if room 1 is available for specific dates
SELECT check_room_availability(1, '2025-11-01', '2025-11-04');

-- Should return false if you created the booking above
-- Try different dates:
SELECT check_room_availability(1, '2025-12-01', '2025-12-05');
-- Should return true
```

### Test 4: Contact Message
```sql
INSERT INTO contact_messages (name, email, subject, message)
VALUES (
  'Test User',
  'test@example.com',
  'Test Subject',
  'This is a test message'
);

SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5;
```

## 📈 Useful Queries for Management

### View Today's Check-ins
```sql
SELECT * FROM booking_details 
WHERE check_in_date = CURRENT_DATE
AND booking_status = 'confirmed'
ORDER BY room_name;
```

### View Upcoming Bookings (Next 7 Days)
```sql
SELECT * FROM booking_details 
WHERE check_in_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
AND booking_status IN ('pending', 'confirmed')
ORDER BY check_in_date, room_name;
```

### Revenue Report (Current Month)
```sql
SELECT 
  COUNT(*) as total_bookings,
  SUM(total_price) as total_revenue,
  AVG(total_price) as avg_booking_value,
  SUM(total_nights) as total_room_nights
FROM bookings
WHERE booking_status NOT IN ('cancelled')
AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE);
```

### Popular Rooms
```sql
SELECT 
  r.name,
  r.price,
  COUNT(b.id) as booking_count,
  SUM(b.total_price) as total_revenue
FROM rooms r
LEFT JOIN bookings b ON r.id = b.room_id AND b.status != 'cancelled'
GROUP BY r.id, r.name, r.price
ORDER BY booking_count DESC;
```

### Guest Booking History
```sql
-- Replace with actual email
SELECT 
  first_name || ' ' || last_name as guest_name,
  email,
  COUNT(*) as total_bookings,
  SUM(total_price) as total_spent,
  MAX(check_out_date) as last_stay
FROM booking_details
WHERE email = 'john.doe@test.com'
GROUP BY guest_id, first_name, last_name, email;
```

### Unread Contact Messages
```sql
SELECT * FROM contact_messages 
WHERE status = 'new'
ORDER BY created_at DESC;
```

### Pending Pet Care Requests
```sql
SELECT * FROM pet_care_requests 
WHERE status = 'pending'
ORDER BY start_date;
```

## 🚨 Common Issues & Solutions

### Issue: "relation does not exist"
**Solution:** Run the complete `supabase-schema.sql` file again.

### Issue: Bookings not saving
**Problem:** RLS policy blocking inserts
**Solution:** Verify you're using the service role key (already configured in code)

### Issue: Can't see all bookings
**Problem:** Using anon key instead of service role
**Solution:** Check `src/lib/supabase.ts` - should use service_role key

### Issue: Dates not validating
**Problem:** Check constraints on bookings table
**Solution:** Ensure check-out date is after check-in date

## 🔄 Database Maintenance

### Clear Test Data
```sql
-- WARNING: This deletes all data!
TRUNCATE bookings, contact_messages, pet_care_requests, reviews CASCADE;
-- Guests are preserved (referenced by bookings)
```

### Reset Rooms to Default
```sql
-- Delete all bookings first
TRUNCATE bookings CASCADE;

-- Reset rooms
DELETE FROM rooms;

-- Re-run the INSERT statements from supabase-schema.sql
-- (Lines with INSERT INTO rooms...)
```

### Backup Important Data
```sql
-- Export bookings
SELECT * FROM booking_details;

-- Export guests
SELECT * FROM guests ORDER BY created_at;
```

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify SQL script ran successfully
3. Check Supabase logs in Dashboard
4. Review RLS policies in Supabase Authentication section

---

**Ready to go!** After completing Step 1 & 2 above, your hotel booking website will be fully functional! 🎉
