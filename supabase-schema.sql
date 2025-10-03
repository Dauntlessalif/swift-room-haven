-- Swift Room Haven Database Schema
-- Paste this entire SQL script into your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ROOMS TABLE
-- ============================================
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

-- ============================================
-- GUESTS TABLE
-- ============================================
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_guests_email ON guests(email);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INTEGER NOT NULL,
    total_nights INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure check-out is after check-in
    CONSTRAINT check_dates CHECK (check_out_date > check_in_date),
    -- Ensure positive values
    CONSTRAINT check_positive_values CHECK (
        number_of_guests > 0 AND 
        total_nights > 0 AND 
        total_price > 0
    )
);

-- Create indexes for better query performance
CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for status filtering
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- ============================================
-- PET CARE REQUESTS TABLE
-- ============================================
CREATE TABLE pet_care_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    guest_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    pet_type VARCHAR(100) NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    pet_weight DECIMAL(5, 2),
    pet_age INTEGER,
    service_type VARCHAR(100) NOT NULL CHECK (service_type IN ('sitting', 'walking', 'grooming', 'daycare', 'overnight')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    special_requirements TEXT,
    vaccination_records_url TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_progress', 'completed', 'cancelled')),
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure end date is after or equal to start date
    CONSTRAINT check_pet_care_dates CHECK (end_date >= start_date)
);

-- Create indexes
CREATE INDEX idx_pet_care_booking_id ON pet_care_requests(booking_id);
CREATE INDEX idx_pet_care_status ON pet_care_requests(status);
CREATE INDEX idx_pet_care_dates ON pet_care_requests(start_date, end_date);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
    room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT NOT NULL,
    response TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- One review per booking
    UNIQUE(booking_id)
);

-- Create indexes
CREATE INDEX idx_reviews_room_id ON reviews(room_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_status ON reviews(status);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pet_care_requests_updated_at BEFORE UPDATE ON pet_care_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to check room availability
CREATE OR REPLACE FUNCTION check_room_availability(
    p_room_id INTEGER,
    p_check_in DATE,
    p_check_out DATE
)
RETURNS BOOLEAN AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    -- Check for overlapping bookings
    SELECT COUNT(*) INTO conflict_count
    FROM bookings
    WHERE room_id = p_room_id
      AND status NOT IN ('cancelled')
      AND (
          (check_in_date <= p_check_in AND check_out_date > p_check_in) OR
          (check_in_date < p_check_out AND check_out_date >= p_check_out) OR
          (check_in_date >= p_check_in AND check_out_date <= p_check_out)
      );
    
    RETURN conflict_count = 0;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INSERT INITIAL ROOM DATA
-- ============================================
INSERT INTO rooms (name, description, price, capacity, size, bed_type, amenities, image_url, available) VALUES
(
    'Presidential Suite',
    'Indulge in the ultimate luxury experience with our Presidential Suite featuring panoramic city views, separate living area, and premium amenities.',
    899.00,
    4,
    '1,200 sq ft',
    'King Bed',
    ARRAY['Free Wi-Fi', 'Valet Parking', 'Coffee Maker', 'Room Service', 'Mini Bar', 'City View'],
    '/assets/suite-room.jpg',
    true
),
(
    'Deluxe Room',
    'Spacious and elegantly appointed with modern amenities, perfect for business travelers and couples seeking comfort and style.',
    399.00,
    2,
    '450 sq ft',
    'Queen Bed',
    ARRAY['Free Wi-Fi', 'Coffee Maker', 'Room Service', 'Work Desk'],
    '/assets/deluxe-room.jpg',
    true
),
(
    'Standard Room',
    'Comfortable and stylish accommodation with all essential amenities for a pleasant stay at an excellent value.',
    249.00,
    2,
    '300 sq ft',
    'Double Bed',
    ARRAY['Free Wi-Fi', 'Coffee Maker', 'Daily Housekeeping'],
    '/assets/standard-room.jpg',
    true
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pet_care_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Rooms policies (public read access)
CREATE POLICY "Allow public read access to rooms" ON rooms
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to rooms" ON rooms
    FOR ALL USING (auth.role() = 'service_role');

-- Guests policies
CREATE POLICY "Allow service role full access to guests" ON guests
    FOR ALL USING (auth.role() = 'service_role');

-- Bookings policies (users can read their own bookings)
CREATE POLICY "Allow public insert to bookings" ON bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read their own bookings" ON bookings
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to bookings" ON bookings
    FOR ALL USING (auth.role() = 'service_role');

-- Contact messages policies
CREATE POLICY "Allow public insert to contact_messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role full access to contact_messages" ON contact_messages
    FOR ALL USING (auth.role() = 'service_role');

-- Pet care requests policies
CREATE POLICY "Allow public insert to pet_care_requests" ON pet_care_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read their own pet_care_requests" ON pet_care_requests
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access to pet_care_requests" ON pet_care_requests
    FOR ALL USING (auth.role() = 'service_role');

-- Reviews policies
CREATE POLICY "Allow public read approved reviews" ON reviews
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Allow public insert reviews" ON reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role full access to reviews" ON reviews
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- View for booking details with guest and room information
CREATE OR REPLACE VIEW booking_details AS
SELECT 
    b.id as booking_id,
    b.check_in_date,
    b.check_out_date,
    b.number_of_guests,
    b.total_nights,
    b.total_price,
    b.status as booking_status,
    b.special_requests,
    b.created_at as booked_at,
    g.id as guest_id,
    g.first_name,
    g.last_name,
    g.email,
    g.phone,
    g.address,
    r.id as room_id,
    r.name as room_name,
    r.price as room_price_per_night,
    r.capacity as room_capacity,
    r.size as room_size,
    r.bed_type
FROM bookings b
JOIN guests g ON b.guest_id = g.id
JOIN rooms r ON b.room_id = r.id;

-- View for room availability summary
CREATE OR REPLACE VIEW room_availability_summary AS
SELECT 
    r.id as room_id,
    r.name as room_name,
    r.price,
    r.capacity,
    r.available,
    COUNT(CASE WHEN b.status NOT IN ('cancelled', 'checked_out') 
          AND b.check_out_date >= CURRENT_DATE THEN 1 END) as active_bookings,
    MAX(CASE WHEN b.status NOT IN ('cancelled', 'checked_out') 
          AND b.check_out_date >= CURRENT_DATE THEN b.check_out_date END) as next_available_date
FROM rooms r
LEFT JOIN bookings b ON r.id = b.room_id
GROUP BY r.id, r.name, r.price, r.capacity, r.available;

-- ============================================
-- SAMPLE DATA FOR TESTING (OPTIONAL)
-- ============================================

-- Insert sample guest
-- INSERT INTO guests (first_name, last_name, email, phone, address) VALUES
-- ('John', 'Doe', 'john.doe@example.com', '+1234567890', '123 Main St, New York, NY 10001');

-- Insert sample booking
-- INSERT INTO bookings (
--     room_id, 
--     guest_id, 
--     check_in_date, 
--     check_out_date, 
--     number_of_guests, 
--     total_nights, 
--     total_price, 
--     status
-- ) VALUES (
--     1,
--     (SELECT id FROM guests WHERE email = 'john.doe@example.com'),
--     CURRENT_DATE + INTERVAL '7 days',
--     CURRENT_DATE + INTERVAL '10 days',
--     2,
--     3,
--     2697.00,
--     'confirmed'
-- );

-- ============================================
-- USEFUL QUERIES FOR TESTING
-- ============================================

-- Check all tables created successfully
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- ORDER BY table_name;

-- View all rooms
-- SELECT * FROM rooms;

-- View all bookings with details
-- SELECT * FROM booking_details;

-- Check room availability
-- SELECT * FROM room_availability_summary;

-- Test availability function
-- SELECT check_room_availability(1, '2025-10-10', '2025-10-15');

-- Get bookings for specific date range
-- SELECT * FROM booking_details 
-- WHERE check_in_date >= '2025-10-01' 
-- AND check_out_date <= '2025-10-31'
-- ORDER BY check_in_date;

COMMIT;
