# 🔑 Demo Credentials

## Quick Access Demo Accounts

For testing and demonstration purposes, use these pre-configured accounts.

---

## 👤 Demo Customer Account

### Credentials
```
Email: customer@demo.com
Password: Demo123!Customer
```

### Profile Information
- **Name:** John Customer
- **Phone:** +1 (555) 123-4567
- **Address:** 123 Demo Street, Demo City, DC 12345
- **Role:** Customer
- **Email Verified:** ✅ Yes

### Access
- **Login Page:** Click "Sign In" in navigation
- **Customer Panel:** `/customer`
- **Permissions:**
  - Browse rooms
  - Make bookings
  - View/manage own bookings
  - Update profile
  - Cancel bookings
  - Chat with support

### Sample Bookings
This account has sample bookings to demonstrate:
- Upcoming reservations
- Past stays
- Cancelled bookings
- Different booking statuses

---

## 👨‍💼 Demo Admin Account

### Credentials
```
Email: admin@swiftroomhaven.com
Password: Admin123!Secure
```

### Profile Information
- **Name:** Admin User
- **Phone:** +1 (555) 987-6543
- **Address:** Swift Room Haven HQ
- **Role:** Admin
- **Email Verified:** ✅ Yes

### Access
- **Login Page:** Click "Sign In" → Switch to "Admin Login" tab
- **Admin Panel:** `/admin`
- **Permissions:**
  - Full dashboard access
  - Manage all bookings
  - Manage rooms
  - Manage guests
  - View analytics
  - User management
  - System settings

### Admin Features
- View all bookings across system
- Approve/reject bookings
- Manage room availability
- Generate reports
- Access audit logs

---

## 🚀 Quick Start Testing

### Test Customer Flow
```bash
1. Open website → Click "Sign In"
2. Enter: customer@demo.com / Demo123!Customer
3. Click "Sign In"
4. Navigate to "My Bookings" in dropdown menu
5. Test: View bookings, make new booking, cancel booking
```

### Test Admin Flow
```bash
1. Open website → Click "Sign In"
2. Switch to "Admin Login" tab
3. Enter: admin@swiftroomhaven.com / Admin123!Secure
4. Click "Sign In as Admin"
5. Navigate to "/admin" or click admin link in dropdown
6. Test: Dashboard, bookings management, room management
```

---

## 🛠️ Setting Up Demo Accounts

### Option 1: Manual Setup (Recommended for Production)

#### Create Demo Customer
```sql
-- 1. Sign up normally through the UI with:
--    Email: customer@demo.com
--    Password: Demo123!Customer
--    First Name: John
--    Last Name: Customer

-- 2. Verify the email through Supabase Auth dashboard

-- 3. Update the guest profile with complete info
UPDATE guests 
SET 
  first_name = 'John',
  last_name = 'Customer',
  phone = '+1 (555) 123-4567',
  email = 'customer@demo.com',
  address = '123 Demo Street, Demo City, DC 12345'
WHERE email = 'customer@demo.com';
```

#### Create Demo Admin
```sql
-- 1. Sign up normally through the UI with:
--    Email: admin@swiftroomhaven.com
--    Password: Admin123!Secure
--    First Name: Admin
--    Last Name: User

-- 2. Verify the email through Supabase Auth dashboard

-- 3. Grant admin privileges
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'admin@swiftroomhaven.com';

-- 4. Update the guest profile
UPDATE guests 
SET 
  first_name = 'Admin',
  last_name = 'User',
  phone = '+1 (555) 987-6543',
  email = 'admin@swiftroomhaven.com',
  address = 'Swift Room Haven HQ'
WHERE email = 'admin@swiftroomhaven.com';
```

---

### Option 2: Automated Setup (Development Only)

#### SQL Script for Demo Accounts
```sql
-- ⚠️ WARNING: Only use in development environment!
-- This bypasses normal authentication flow

-- Create demo customer (in auth.users table)
-- NOTE: Password hashing must be done through Supabase Auth API
-- Use the Supabase dashboard or sign-up UI to create these accounts

-- After creating accounts through UI, run this to complete setup:

-- 1. Update customer profile
UPDATE guests 
SET 
  first_name = 'John',
  last_name = 'Customer',
  phone = '+1 (555) 123-4567',
  address = '123 Demo Street, Demo City, DC 12345'
WHERE email = 'customer@demo.com';

-- 2. Grant admin privileges to admin account
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'admin@swiftroomhaven.com';

-- 3. Update admin profile
UPDATE guests 
SET 
  first_name = 'Admin',
  last_name = 'User',
  phone = '+1 (555) 987-6543',
  address = 'Swift Room Haven HQ'
WHERE email = 'admin@swiftroomhaven.com';

-- 4. Create sample bookings for demo customer
INSERT INTO bookings (
  room_id, guest_id, check_in, check_out, 
  number_of_guests, total_amount, status, special_requests
)
SELECT 
  (SELECT id FROM rooms WHERE name LIKE '%Ocean%' LIMIT 1),
  (SELECT id FROM guests WHERE email = 'customer@demo.com'),
  CURRENT_DATE + INTERVAL '7 days',
  CURRENT_DATE + INTERVAL '9 days',
  2,
  450.00,
  'confirmed',
  'Demo booking - Ocean view preferred'
WHERE EXISTS (SELECT 1 FROM guests WHERE email = 'customer@demo.com');

INSERT INTO bookings (
  room_id, guest_id, check_in, check_out, 
  number_of_guests, total_amount, status, special_requests
)
SELECT 
  (SELECT id FROM rooms WHERE name LIKE '%Deluxe%' LIMIT 1),
  (SELECT id FROM guests WHERE email = 'customer@demo.com'),
  CURRENT_DATE - INTERVAL '30 days',
  CURRENT_DATE - INTERVAL '28 days',
  2,
  380.00,
  'completed',
  'Demo past booking'
WHERE EXISTS (SELECT 1 FROM guests WHERE email = 'customer@demo.com');
```

---

## 🔐 Security Notes

### ⚠️ Important Reminders

1. **Development Only:**
   - These credentials are for TESTING purposes
   - Never use in production
   - Change passwords in production

2. **Email Verification:**
   - Demo accounts should be email verified
   - Use Supabase dashboard to verify manually
   - Or disable email verification in development

3. **Admin Access:**
   - Admin credentials have full system access
   - Keep admin passwords secure
   - Use different credentials in production

4. **Password Requirements:**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one number
   - At least one special character

---

## 📝 Testing Checklist

### Customer Account Tests
- [ ] Sign in with customer credentials
- [ ] View customer panel
- [ ] See existing bookings
- [ ] Create new booking
- [ ] Update profile information
- [ ] Cancel a booking
- [ ] Sign out
- [ ] Password reset flow

### Admin Account Tests
- [ ] Sign in with admin credentials
- [ ] Access admin panel
- [ ] View dashboard statistics
- [ ] See all bookings (all customers)
- [ ] Manage room listings
- [ ] Update booking statuses
- [ ] View guest information
- [ ] Generate reports
- [ ] Sign out

### Authentication Tests
- [ ] Sign in/out works correctly
- [ ] Protected routes redirect properly
- [ ] Admin-only pages block customers
- [ ] Customer panel accessible to customers
- [ ] Session persists on page refresh
- [ ] User menu shows correct info
- [ ] Role badge displays correctly

---

## 🎯 Quick Reference

### Login URLs
- **Main Site:** `http://localhost:5173` (or your dev URL)
- **Customer Panel:** `http://localhost:5173/customer`
- **Admin Panel:** `http://localhost:5173/admin`

### Navigation
- Click **"Sign In"** button in top navigation
- After login, click **user avatar** for dropdown menu
- Select **"Customer Panel"** or **"Admin Panel"**

### Support Access
If you forget credentials or get locked out:
1. Check this file for current credentials
2. Reset password through UI
3. Or recreate accounts using SQL scripts above

---

## 📧 Demo Email Addresses

### Customer Demo
```
Primary: customer@demo.com
Alternative: demo.customer@test.com (if needed)
```

### Admin Demo
```
Primary: admin@swiftroomhaven.com
Alternative: admin@demo.com (if needed)
```

**Note:** Use `@swiftroomhaven.com` domain for admin accounts as it may be configured in RLS policies.

---

## 🔄 Reset Demo Data

### Clear All Demo Bookings
```sql
-- Delete demo customer bookings
DELETE FROM bookings 
WHERE guest_id IN (
  SELECT id FROM guests WHERE email = 'customer@demo.com'
);
```

### Reset Demo Customer Profile
```sql
UPDATE guests 
SET 
  first_name = 'John',
  last_name = 'Customer',
  phone = '+1 (555) 123-4567',
  address = '123 Demo Street, Demo City, DC 12345'
WHERE email = 'customer@demo.com';
```

---

## 💡 Tips for Demonstrations

### Show Customer Features
1. Log in as customer
2. Browse rooms → Select a room
3. Click "Book Now" → Show booking form
4. Navigate to "My Bookings"
5. Show booking details and cancellation

### Show Admin Features
1. Log in as admin
2. Show dashboard with statistics
3. View all bookings across system
4. Demonstrate room management
5. Show guest information panel
6. Display reports and analytics

### Show Authentication Security
1. Try accessing `/admin` without login → Redirects
2. Log in as customer → Try `/admin` → Redirects (not admin)
3. Log in as admin → Access granted
4. Show user menu with role badge

---

**Version:** 1.0.0  
**Created:** October 17, 2025  
**Status:** Ready for Use ✅

---

## 📞 Support

If you encounter issues with demo accounts:
1. Check Supabase Auth dashboard
2. Verify email confirmation status
3. Check user metadata for `is_admin` flag
4. Review SQL execution logs
5. Consult AUTHENTICATION_GUIDE.md

**Happy Testing! 🚀**
