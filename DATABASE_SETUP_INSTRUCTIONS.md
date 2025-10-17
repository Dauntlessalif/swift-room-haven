# 🗄️ Database Setup Instructions - Room Data Migration

## 📋 Overview
The room data has been migrated from hardcoded arrays to Supabase database for better scalability and management.

---

## 🚀 Quick Setup (2 Steps)

### Step 1: Run the SQL in Supabase

1. **Open Supabase Dashboard**
   - Go to your Supabase project: https://supabase.com/dashboard
   - Navigate to **SQL Editor** (left sidebar)

2. **Copy & Paste the SQL**
   - Open the file: `INSERT_ROOMS_DHAKA.sql`
   - Copy ALL the SQL code
   - Paste it into the Supabase SQL Editor

3. **Execute**
   - Click **"Run"** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
   - Wait for confirmation: "Success. No rows returned"

4. **Verify** (Optional)
   - Run this query to confirm:
   ```sql
   SELECT id, name, price FROM rooms ORDER BY price;
   ```
   - You should see 9 rooms listed

### Step 2: That's It!
- The frontend is already configured to fetch from the database
- No code changes needed on the frontend
- Rooms will automatically appear in the app

---

## 📊 What Was Changed

### Before (Hardcoded)
```typescript
// src/data/rooms.ts
export const rooms: Room[] = [
  { id: 1, name: "Standard", price: 24999, ... },
  { id: 2, name: "Deluxe", price: 39999, ... },
  // ... hardcoded data
];
```

### After (Database-Driven)
```typescript
// src/data/rooms.ts
export const rooms: Room[] = []; // Empty - fetch from DB

// src/pages/Rooms.tsx
const data = await roomsApi.getAllRooms(); // Fetches from Supabase
```

---

## 🗄️ Database Schema

### Table: `rooms`
```sql
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    capacity INTEGER NOT NULL,
    size VARCHAR(100) NOT NULL,
    bed_type VARCHAR(100) NOT NULL,
    amenities TEXT[] NOT NULL,
    image_url TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📦 Data Included (9 Rooms)

| ID | Room Name | Price (BDT) | Capacity | Size |
|----|-----------|-------------|----------|------|
| 1 | Standard Room | ৳24,999 | 2 | 300 sq ft |
| 2 | Superior Room | ৳32,999 | 2 | 350 sq ft |
| 3 | Deluxe Room | ৳39,999 | 2 | 450 sq ft |
| 4 | Premium Deluxe | ৳49,999 | 3 | 550 sq ft |
| 5 | Junior Suite | ৳64,999 | 3 | 650 sq ft |
| 6 | Executive Suite | ৳74,999 | 3 | 800 sq ft |
| 7 | Family Suite | ৳79,999 | 6 | 1,000 sq ft |
| 8 | Presidential Suite | ৳89,999 | 4 | 1,200 sq ft |
| 9 | Honeymoon Suite | ৳99,999 | 2 | 900 sq ft |

---

## 🎯 Benefits of Database Approach

### ✅ Advantages
1. **Easy Management** - Add/edit rooms without code changes
2. **Scalability** - Handle unlimited rooms
3. **Real-time Updates** - Changes reflect immediately
4. **Better Performance** - Can use database queries and indexes
5. **Data Integrity** - Database constraints ensure valid data
6. **Availability Tracking** - Can track bookings and availability
7. **Multi-user Safe** - No merge conflicts with hardcoded data

### 📊 Features Now Available
- Real-time availability checking
- Dynamic pricing (can be added)
- Room inventory management
- Booking conflict detection
- Analytics and reporting
- Easy A/B testing of room descriptions

---

## 🔧 Managing Rooms After Setup

### Add a New Room
```sql
INSERT INTO rooms (name, description, price, capacity, size, bed_type, amenities, image_url, available) 
VALUES (
    'Garden Villa',
    'Private villa with garden access',
    119999.00,
    4,
    '1,500 sq ft',
    'King Bed',
    ARRAY['Private Garden', 'Free Wi-Fi', 'Butler Service'],
    '/garden-villa.jpg',
    true
);
```

### Update Room Price
```sql
UPDATE rooms 
SET price = 27999.00 
WHERE name = 'Standard Room';
```

### Mark Room as Unavailable
```sql
UPDATE rooms 
SET available = false 
WHERE id = 3;
```

### Delete a Room
```sql
DELETE FROM rooms 
WHERE id = 10;
```

### Get All Available Rooms
```sql
SELECT * FROM rooms 
WHERE available = true 
ORDER BY price;
```

### Get Rooms by Price Range
```sql
SELECT * FROM rooms 
WHERE price BETWEEN 30000 AND 70000 
ORDER BY price;
```

---

## 🔍 Verification Queries

### Check Total Rooms
```sql
SELECT COUNT(*) as total_rooms FROM rooms;
-- Expected: 9
```

### Check Price Range
```sql
SELECT 
    MIN(price) as cheapest,
    MAX(price) as most_expensive,
    ROUND(AVG(price), 2) as average
FROM rooms;
-- Expected: Min: 24999, Max: 99999, Avg: ~61111
```

### Check Total Capacity
```sql
SELECT SUM(capacity) as total_guest_capacity FROM rooms;
-- Expected: 27 guests
```

### List All Rooms with Key Info
```sql
SELECT 
    id,
    name,
    price,
    capacity,
    size,
    bed_type,
    available
FROM rooms 
ORDER BY price;
```

---

## 🐛 Troubleshooting

### Issue: "Success. No rows returned"
**Solution**: This is CORRECT! It means the insert was successful.

### Issue: "relation 'rooms' does not exist"
**Solution**: Run the full schema from `supabase-schema.sql` first.

### Issue: "duplicate key value violates unique constraint"
**Solution**: Rooms already exist. Either delete them first or skip this step.

### Issue: Rooms not showing in app
**Solution**: 
1. Check browser console for errors
2. Verify Supabase connection in `src/lib/supabase.ts`
3. Check if `.env` has correct Supabase credentials
4. Clear browser cache and reload

### Issue: Images not displaying
**Solution**: 
- JPG images (standard, deluxe, presidential) should be in `src/assets/`
- SVG images should be in `public/` folder
- Check image paths in the database match actual file locations

---

## 📁 File Changes Summary

### Files Modified
1. ✅ `src/data/rooms.ts` - Removed hardcoded data, now empty array
2. ✅ `src/pages/Rooms.tsx` - Already fetching from database
3. ✅ `src/lib/api.ts` - Already has roomsApi.getAllRooms()

### Files Created
1. ✅ `INSERT_ROOMS_DHAKA.sql` - SQL to insert all 9 rooms
2. ✅ This instructions file

### Files NOT Changed (Already Compatible)
- ✅ `src/lib/supabase.ts` - Database connection
- ✅ `src/components/RoomCard.tsx` - Display component
- ✅ `src/components/ReservationModal.tsx` - Booking component
- ✅ All other components

---

## 🎨 Image Files Reference

### Existing JPG Images (in src/assets/)
- `standard-room.jpg` → Room ID 1
- `deluxe-room.jpg` → Room ID 3
- `suite-room.jpg` → Room ID 8

### New SVG Images (in public/)
- `superior-room.svg` → Room ID 2
- `premium-deluxe.svg` → Room ID 4
- `junior-suite.svg` → Room ID 5
- `executive-suite.svg` → Room ID 6
- `family-suite.svg` → Room ID 7
- `honeymoon-suite.svg` → Room ID 9

---

## 🔮 Future Enhancements

### Easy to Implement Now
1. **Admin Panel** - Build a UI to manage rooms
2. **Dynamic Pricing** - Update prices based on season/demand
3. **Room Features** - Add more columns (view type, floor, etc.)
4. **Photo Galleries** - Add multiple images per room
5. **Reviews** - Link to reviews table
6. **Seasonal Offers** - Add discount fields
7. **Room Status** - Under maintenance, cleaning, etc.

### Database Views (Optional)
```sql
-- Create view for available rooms only
CREATE VIEW available_rooms AS
SELECT * FROM rooms 
WHERE available = true
ORDER BY price;

-- Create view for room statistics
CREATE VIEW room_stats AS
SELECT 
    COUNT(*) as total_rooms,
    SUM(capacity) as total_capacity,
    AVG(price) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price
FROM rooms;
```

---

## ✅ Success Checklist

After running the SQL, verify:
- [ ] Supabase SQL Editor shows "Success. No rows returned"
- [ ] Verification query shows 9 rooms
- [ ] Price range is ৳24,999 to ৳99,999
- [ ] Total capacity is 27 guests
- [ ] All rooms have `available = true`
- [ ] Frontend loads without errors
- [ ] Rooms page displays all 9 rooms
- [ ] Room cards show correct prices in BDT
- [ ] Images display correctly
- [ ] Booking modal works

---

## 📞 Support

### If You Need Help
1. Check browser console (F12) for error messages
2. Check Supabase logs in dashboard
3. Verify `.env` file has correct credentials
4. Ensure all image files exist in correct locations

### Common Questions

**Q: Can I edit room prices without redeploying?**  
A: Yes! Update directly in Supabase, changes are immediate.

**Q: How do I add a new room?**  
A: Use the "Add a New Room" SQL query above, or build an admin UI.

**Q: Can I upload room photos?**  
A: Yes! Use Supabase Storage for images, update `image_url` field.

**Q: Do I need to restart the app after adding rooms?**  
A: No! Just refresh the page, it fetches from DB on each load.

---

## 🎉 You're All Set!

Your hotel now has:
- ✅ 9 professionally configured rooms
- ✅ Database-driven room management
- ✅ Bangladesh-specific pricing (BDT)
- ✅ Scalable architecture
- ✅ Easy content management

**Next Steps:**
1. Run the SQL in Supabase
2. Refresh your app
3. See all 9 rooms appear automatically!

---

**Created**: October 4, 2025  
**Version**: 1.0 - Database Migration Complete
