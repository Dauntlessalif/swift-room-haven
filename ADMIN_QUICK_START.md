# 🎯 Admin Panel - Quick Start Guide

## Getting Started in 3 Steps

### 1️⃣ Access the Admin Panel

Visit: **http://localhost:5173/admin** (or your deployment URL + `/admin`)

Enter the password: **`admin123`**

### 2️⃣ Navigate the Dashboard

You'll see 7 main tabs:
- **Overview** - Statistics and recent activity
- **Bookings** - Manage reservations
- **Rooms** - Add/edit room listings  
- **Guests** - View customer database
- **Messages** - Handle inquiries
- **Pet Care** - Manage pet services
- **Reviews** - Moderate feedback

### 3️⃣ Start Managing

Click any tab to begin managing that section!

---

## 🔥 Most Common Tasks

### ✅ Confirm a New Booking
1. Click **Bookings** tab
2. Find booking with "pending" status
3. Click status dropdown → Select "confirmed"
4. Done! Guest receives confirmation

### 🏨 Add a New Room
1. Click **Rooms** tab
2. Click **"+ Add Room"** button
3. Fill in:
   - Room name (e.g., "Ocean View Suite")
   - Description
   - Price per night
   - Capacity (number of guests)
   - Size (e.g., "500 sq ft")
   - Bed type (e.g., "King Bed")
   - Amenities (comma-separated: "Wi-Fi, TV, Mini Bar")
   - Image URL (optional)
   - Toggle "Available" switch
4. Click **"Create Room"**

### 💬 Reply to Customer Message
1. Click **Messages** tab
2. Find message with "new" status
3. Click eye icon 👁️ to view
4. Note customer email
5. Update status to "replied"
6. Send email response manually

### ⭐ Approve a Review
1. Click **Reviews** tab
2. Filter by "pending"
3. Click eye icon to read review
4. Click status dropdown → Select "approved" or "rejected"

### 🐾 Process Pet Care Request
1. Click **Pet Care** tab
2. Review request details (click eye icon)
3. Update status:
   - "approved" → Request accepted
   - "in_progress" → Service ongoing
   - "completed" → Service finished

---

## 🎨 Understanding Status Colors

### Bookings
- 🟡 **Yellow** = Pending (needs attention)
- 🟢 **Green** = Confirmed/Active
- 🔵 **Blue** = Checked In
- ⚫ **Gray** = Checked Out
- 🔴 **Red** = Cancelled

### Messages
- 🔵 **Blue** = New (unread)
- ⚫ **Gray** = Read
- 🟢 **Green** = Replied
- 🟣 **Purple** = Archived

### Reviews
- 🟡 **Yellow** = Pending moderation
- 🟢 **Green** = Approved & published
- 🔴 **Red** = Rejected

---

## 🔍 Search & Filter Tips

### Quick Search
- Use the search box to find guests, rooms, or bookings instantly
- Search works across: names, emails, phone numbers, room names

### Status Filters
- Use dropdown filters to show only specific statuses
- Great for finding "pending" items that need action

### Refresh Button
- Click 🔄 **Refresh** to get latest data
- Dashboard auto-refreshes every 30 seconds

---

## ⚡ Keyboard Shortcuts & Tips

1. **ESC key** - Close any open dialog
2. **Search first** - Use search before scrolling
3. **Bulk actions** - Handle similar items together (e.g., confirm all pending bookings)
4. **Status workflow** - Follow natural status progression (pending → confirmed → checked_in → checked_out)

---

## 📊 Dashboard Metrics Explained

| Metric | What It Means |
|--------|---------------|
| **Total Revenue** | Sum of all booking payments |
| **Active Bookings** | Current & upcoming reservations |
| **Total Guests** | All registered customers |
| **Available Rooms** | Rooms ready to book |
| **Messages** | Unread customer inquiries |
| **Pet Care Requests** | Active pet service requests |
| **Average Rating** | Mean star rating from reviews |

---

## 🚨 Important Notes

### ⚠️ Before Deleting
- Deleting is permanent!
- Always confirm you're deleting the right item
- Consider archiving messages instead of deleting

### ⚠️ Room Availability
- Uncheck "Available" to hide room from booking
- Don't delete rooms with active bookings

### ⚠️ Booking Status
- Never skip status steps
- Update status when guest checks in/out
- Cancelled bookings free up the room

---

## 🆘 Troubleshooting

### Problem: Can't see any data
**Solution**: 
1. Check your internet connection
2. Verify `.env` file has correct Supabase credentials
3. Click Refresh button
4. Check browser console (F12) for errors

### Problem: Changes not saving
**Solution**:
1. Check all required fields are filled
2. Verify Supabase is running
3. Check browser console for errors
4. Try refreshing the page

### Problem: Forgot admin password
**Solution**: 
- Current password is: `admin123`
- To change it, edit: `src/pages/Admin.tsx` line 14

---

## 📱 Mobile Usage

The admin panel works on mobile devices:
- Swipe tables horizontally to see all columns
- All buttons are touch-friendly
- Forms are mobile-optimized

---

## 🎓 Pro Tips

1. **Start your day with the Dashboard** - Get overview of operations
2. **Clear pending items daily** - Don't let tasks pile up
3. **Respond quickly** - Check messages 2-3 times per day
4. **Monitor reviews** - Approve/reject within 24 hours
5. **Keep rooms updated** - Update availability and pricing regularly

---

## 🔗 Useful Links

- **Customer Site**: `/` - See what customers see
- **Rooms Page**: `/rooms` - Public room listings
- **Contact Page**: `/contact` - Where messages come from
- **Pet Care Page**: `/pet-care` - Pet service info

---

## 🎉 You're Ready!

The admin panel is designed to be intuitive. Start by exploring each tab and clicking around - you can't break anything! 

**Most actions require just 2 clicks:**
1. Find the item
2. Update or delete it

Happy managing! 🚀

---

**Need more details?** See `ADMIN_PANEL_GUIDE.md` for comprehensive documentation.
