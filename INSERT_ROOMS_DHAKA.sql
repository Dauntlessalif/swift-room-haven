-- ============================================
-- LUXE HOTEL DHAKA - ROOM DATA INSERT
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- This will populate the rooms table with all 9 room types
-- with Bangladesh-specific pricing (BDT) and descriptions

-- Clear existing rooms (optional - remove this line if you want to keep existing data)
-- DELETE FROM rooms;

-- Reset the sequence if needed (optional)
-- ALTER SEQUENCE rooms_id_seq RESTART WITH 1;

-- ============================================
-- INSERT ALL 9 ROOMS
-- ============================================

INSERT INTO rooms (name, description, price, capacity, size, bed_type, amenities, image_url, available) VALUES

-- Room 1: Standard Room
(
    'Standard Room',
    'Comfortable and stylish accommodation with all essential amenities for a pleasant stay in Dhaka at an excellent value.',
    24999.00,
    2,
    '300 sq ft',
    'Double Bed',
    ARRAY['Free Wi-Fi', 'Coffee Maker', 'Daily Housekeeping', 'Air Conditioning'],
    '/standard-room.jpg',
    true
),

-- Room 2: Superior Room
(
    'Superior Room',
    'Enhanced comfort with upgraded amenities and modern design. Perfect for guests who appreciate extra space and style in Gulshan.',
    32999.00,
    2,
    '350 sq ft',
    'Queen Bed',
    ARRAY['Free Wi-Fi', 'Coffee Maker', 'Daily Housekeeping', 'Work Desk', 'City View'],
    '/superior-room.svg',
    true
),

-- Room 3: Deluxe Room
(
    'Deluxe Room',
    'Spacious and elegantly appointed with modern amenities, perfect for business travelers and couples seeking comfort and style in the heart of Dhaka.',
    39999.00,
    2,
    '450 sq ft',
    'Queen Bed',
    ARRAY['Free Wi-Fi', 'Coffee Maker', 'Room Service', 'Work Desk', 'Mini Bar'],
    '/deluxe-room.jpg',
    true
),

-- Room 4: Premium Deluxe
(
    'Premium Deluxe',
    'Luxuriously upgraded deluxe room with premium furnishings, extra living space, and stunning views of Dhaka''s diplomatic zone.',
    49999.00,
    3,
    '550 sq ft',
    'King Bed',
    ARRAY['Free Wi-Fi', 'Coffee Maker', 'Room Service', 'Work Desk', 'Mini Bar', 'Bathtub', 'City View'],
    '/premium-deluxe.svg',
    true
),

-- Room 5: Junior Suite
(
    'Junior Suite',
    'Compact luxury suite with separate seating area, ideal for extended stays and business travelers who need both comfort and workspace.',
    64999.00,
    3,
    '650 sq ft',
    'King Bed',
    ARRAY['Free Wi-Fi', 'Valet Parking', 'Coffee Maker', 'Room Service', 'Mini Bar', 'Work Desk', 'Seating Area'],
    '/junior-suite.svg',
    true
),

-- Room 6: Executive Suite
(
    'Executive Suite',
    'Premium business-class suite with dedicated workspace, separate living room, and executive lounge access. Perfect for corporate stays in Dhaka.',
    74999.00,
    3,
    '800 sq ft',
    'King Bed',
    ARRAY['Free Wi-Fi', 'Valet Parking', 'Coffee Maker', 'Room Service', 'Mini Bar', 'Executive Lounge Access', 'Work Desk', 'Living Room'],
    '/executive-suite.svg',
    true
),

-- Room 7: Family Suite
(
    'Family Suite',
    'Spacious family accommodation with multiple bedrooms, living area, and kid-friendly amenities. Perfect for families visiting Dhaka.',
    79999.00,
    6,
    '1,000 sq ft',
    'King Bed + Twin Beds',
    ARRAY['Free Wi-Fi', 'Valet Parking', 'Coffee Maker', 'Room Service', 'Mini Bar', 'Two Bedrooms', 'Living Room', 'Kids Amenities'],
    '/family-suite.svg',
    true
),

-- Room 8: Presidential Suite
(
    'Presidential Suite',
    'Indulge in the ultimate luxury experience with our Presidential Suite featuring panoramic Dhaka skyline views, separate living area, and premium amenities.',
    89999.00,
    4,
    '1,200 sq ft',
    'King Bed',
    ARRAY['Free Wi-Fi', 'Valet Parking', 'Coffee Maker', 'Room Service', 'Mini Bar', 'Dhaka Skyline View', 'Butler Service', 'Private Terrace'],
    '/suite-room.jpg',
    true
),

-- Room 9: Honeymoon Suite
(
    'Honeymoon Suite',
    'Romantic luxury suite designed for newlyweds with rose petal decoration, champagne service, and breathtaking views. Create unforgettable memories in Dhaka.',
    99999.00,
    2,
    '900 sq ft',
    'King Bed',
    ARRAY['Free Wi-Fi', 'Valet Parking', 'Coffee Maker', 'Room Service', 'Mini Bar', 'Jacuzzi', 'Romantic Decor', 'Champagne Service', 'City View'],
    '/honeymoon-suite.svg',
    true
);

-- ============================================
-- VERIFY INSERTION
-- ============================================
-- Run this to confirm all rooms were inserted:
-- SELECT id, name, price, capacity, size FROM rooms ORDER BY price;

-- ============================================
-- ADDITIONAL QUERIES (OPTIONAL)
-- ============================================

-- Get room count by price range:
-- SELECT 
--     CASE 
--         WHEN price < 35000 THEN 'Budget (< ৳35,000)'
--         WHEN price < 50000 THEN 'Mid-Range (৳35,000-50,000)'
--         WHEN price < 80000 THEN 'Suite (৳50,000-80,000)'
--         ELSE 'Premium (> ৳80,000)'
--     END as category,
--     COUNT(*) as room_count,
--     MIN(price) as min_price,
--     MAX(price) as max_price
-- FROM rooms
-- GROUP BY category
-- ORDER BY MIN(price);

-- Get average price:
-- SELECT 
--     COUNT(*) as total_rooms,
--     MIN(price) as cheapest_room,
--     MAX(price) as most_expensive_room,
--     ROUND(AVG(price), 2) as average_price,
--     SUM(capacity) as total_guest_capacity
-- FROM rooms;

-- ============================================
-- NOTES
-- ============================================
-- 1. All prices are in BDT (Bangladeshi Taka)
-- 2. All descriptions reference Dhaka/Gulshan location
-- 3. Images (all in /public folder for web access):
--    - 3 JPG images: standard-room.jpg, deluxe-room.jpg, suite-room.jpg
--    - 6 SVG images: superior-room.svg, premium-deluxe.svg, junior-suite.svg,
--                    executive-suite.svg, family-suite.svg, honeymoon-suite.svg
-- 4. Room IDs will be auto-generated starting from 1
-- 5. All rooms are set to available=true by default
-- 6. Total capacity: 27 guests across all rooms
-- 7. Total space: 5,900 sq ft
-- 8. Price range: ৳24,999 - ৳99,999 per night
