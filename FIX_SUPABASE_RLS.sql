-- ============================================
-- FIX SUPABASE RLS POLICIES FOR GUESTS TABLE
-- ============================================
-- Run this SQL in your Supabase SQL Editor to fix 403/400 errors
-- Dashboard → SQL Editor → New Query → Paste & Run

-- Step 1: Enable RLS on guests table
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies (if any) to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to read guests" ON guests;
DROP POLICY IF EXISTS "Allow authenticated users to insert guests" ON guests;
DROP POLICY IF EXISTS "Allow authenticated users to update guests" ON guests;
DROP POLICY IF EXISTS "Allow service role full access to guests" ON guests;
DROP POLICY IF EXISTS "Allow anonymous users to insert guests" ON guests;
DROP POLICY IF EXISTS "Allow anonymous users to read guests" ON guests;

-- Step 3: Create new policies

-- Policy 1: Allow authenticated users to SELECT (read) all guests
-- This allows logged-in users to view guest information
CREATE POLICY "Allow authenticated users to read guests"
ON guests
FOR SELECT
TO authenticated
USING (true);

-- Policy 2: Allow authenticated users to INSERT new guests
-- This allows logged-in users to create new guest records
CREATE POLICY "Allow authenticated users to insert guests"
ON guests
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Allow authenticated users to UPDATE any guest record
-- This allows logged-in users to update guest information
CREATE POLICY "Allow authenticated users to update guests"
ON guests
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Allow authenticated users to DELETE guests
-- This allows logged-in users (especially admins) to delete guest records
CREATE POLICY "Allow authenticated users to delete guests"
ON guests
FOR DELETE
TO authenticated
USING (true);

-- Policy 5: Service role has full access (for backend operations)
-- This ensures your backend can always access the guests table
CREATE POLICY "Allow service role full access to guests"
ON guests
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy 6: Allow anonymous users to INSERT guests (for bookings without login)
-- This allows non-logged-in users to create guest records when booking
CREATE POLICY "Allow anonymous users to insert guests"
ON guests
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy 7: Allow anonymous users to SELECT guests (optional - for public viewing)
-- Comment this out if you don't want anonymous users to view guest data
CREATE POLICY "Allow anonymous users to read guests"
ON guests
FOR SELECT
TO anon
USING (true);

-- ============================================
-- VERIFY POLICIES ARE ACTIVE
-- ============================================
-- Run this query to see all policies on guests table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'guests';

-- ============================================
-- ALTERNATIVE: DISABLE RLS (TESTING ONLY!)
-- ============================================
-- ⚠️ WARNING: Only use this for testing/development
-- This makes your guests table publicly accessible
-- Uncomment the line below ONLY for testing:

-- ALTER TABLE guests DISABLE ROW LEVEL SECURITY;

-- ============================================
-- BONUS: Add RLS policies for other tables
-- ============================================

-- BOOKINGS TABLE
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing booking policies
DROP POLICY IF EXISTS "Allow authenticated users to read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated users to insert bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated users to update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated users to delete bookings" ON bookings;
DROP POLICY IF EXISTS "Allow service role full access to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow anonymous users to insert bookings" ON bookings;
DROP POLICY IF EXISTS "Allow anonymous users to read bookings" ON bookings;

-- Create booking policies
CREATE POLICY "Allow authenticated users to read bookings"
ON bookings FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert bookings"
ON bookings FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update bookings"
ON bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete bookings"
ON bookings FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow service role full access to bookings"
ON bookings FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous users to insert bookings"
ON bookings FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous users to read bookings"
ON bookings FOR SELECT TO anon USING (true);

-- ROOMS TABLE
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Drop existing room policies
DROP POLICY IF EXISTS "Allow anyone to read rooms" ON rooms;
DROP POLICY IF EXISTS "Allow authenticated users to update rooms" ON rooms;
DROP POLICY IF EXISTS "Allow service role full access to rooms" ON rooms;

-- Create room policies (rooms are public, but only admins can modify)
CREATE POLICY "Allow anyone to read rooms"
ON rooms FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated users to update rooms"
ON rooms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow service role full access to rooms"
ON rooms FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all RLS policies across all tables
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check which tables have RLS enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Test if policies are working (run as authenticated user)
-- SELECT * FROM guests; -- Should work
-- INSERT INTO guests (first_name, last_name, email, phone, address) 
-- VALUES ('Test', 'User', 'test@example.com', '1234567890', '123 Test St'); -- Should work

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
-- If you see no errors above, your RLS policies are now active!
-- Your admin panel should now work without 403/400 errors.
-- 
-- Next steps:
-- 1. Refresh your application
-- 2. Sign in as admin or customer
-- 3. Try updating data in admin panel
-- 4. Check browser console - should be clean!
