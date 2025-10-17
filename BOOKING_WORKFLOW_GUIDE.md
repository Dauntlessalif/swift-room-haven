# Booking System Workflow Guide

## 🎯 Complete Booking Workflow

This document outlines the complete, production-ready booking workflow from room browsing to checkout, including authentication integration.

---

## 📋 Booking Flow Overview

```
Browse Rooms → Select Room → Sign In/Sign Up → Book Room → Payment → Confirmation → Check-In
```

---

## 🔄 Detailed Workflow

### Step 1: Browse Rooms (Public)
**Page:** `/rooms`  
**Requirements:** None (public access)

**User Actions:**
1. Visit Rooms page
2. View available rooms
3. Filter by:
   - Price range
   - Room type
   - Amenities
   - Availability dates
4. Click "View Details" on preferred room

**System Actions:**
- Load all rooms from database
- Display room cards with:
  - Room image
  - Name & description
  - Price per night
  - Capacity
  - Amenities
  - Availability status

---

### Step 2: Select Dates & Guests
**Component:** `ReservationModal`  
**Requirements:** None (can start before login)

**User Actions:**
1. Click "Book Now" button
2. Reservation modal opens
3. Select:
   - Check-in date
   - Check-out date
   - Number of guests
4. Enter special requests (optional)
5. Review pricing breakdown:
   - Price per night
   - Number of nights
   - Subtotal
   - Taxes
   - Total amount

**System Actions:**
- Validate dates (check-out > check-in)
- Calculate number of nights
- Check room availability
- Calculate total price
- Display pricing breakdown

**Validation Rules:**
```typescript
- Check-in date >= Today
- Check-out date > Check-in date
- Number of guests <= Room capacity
- Room must be available for selected dates
```

---

### Step 3: Authentication Check
**Component:** `AuthModal`  
**Requirements:** Valid user account

**If User is NOT Logged In:**
1. Booking attempt triggers auth modal
2. User sees two options:
   - **Sign In** (existing customers)
   - **Sign Up** (new customers)

**Sign Up Flow (New Customers):**
1. Fill registration form:
   - First Name, Last Name
   - Email, Phone
   - Password
   - Address (optional)
2. Click "Create Account"
3. Receive verification email
4. Click verification link
5. Return to site and sign in
6. Resume booking from where they left off

**Sign In Flow (Existing Customers):**
1. Enter email and password
2. Click "Sign In"
3. Automatically proceed to booking

**System Actions:**
- Save booking intent (dates, room, guests)
- Show auth modal
- After successful auth, restore booking intent
- Auto-fill guest information from profile

---

### Step 4: Guest Information
**Component:** `ReservationModal` (continued)  
**Requirements:** Authenticated user

**For Logged-In Customers:**
- ✅ Guest information **auto-populated** from user profile
- ✅ No need to re-enter name, email, phone
- ✅ Information synced automatically with database
- ℹ️ Display shows current profile information
- 💡 Can update profile in Customer Panel settings

**User Actions (Logged-In):**
1. Review auto-filled information:
   - Name (from user profile) ✅ Auto-filled
   - Email (from user profile) ✅ Auto-filled
   - Phone (from user profile) ✅ Auto-filled
2. ✅ **ONLY inputs needed:**
   - Check-in date
   - Check-out date
   - Number of guests
3. Click "Confirm Booking"

**User Actions (Not Logged-In):**
1. Must sign in or sign up first
2. After authentication, return to booking
3. Information auto-populated from new profile

**Auto-filled Data (For Logged-In Users):**
```typescript
const guestInfo = {
  id: user.id,                              // User UUID
  first_name: user.user_metadata?.first_name,
  last_name: user.user_metadata?.last_name,
  email: user.email,
  phone: user.user_metadata?.phone,
  address: user.user_metadata?.address,
};

// Customer only selects:
// - Check-in date
// - Check-out date  
// - Number of guests
```

**UI Improvements:**
- ✅ Logged-in users see **read-only display** of their info
- ✅ Streamlined form: Only 3 inputs (dates + guests)
- ✅ Faster booking process
- ✅ Reduced form abandonment
- ✅ Link to update profile if info needs changes

---

### Step 5: Booking Creation
**API:** `bookingsApi.createBooking()`  
**Requirements:** Valid session, available room

**System Actions:**
1. Validate room availability (double-check)
2. Create or get guest record:
   ```typescript
   const guest = await guestsApi.createOrGetGuest({
     id: user.id,
     email: user.email,
     first_name: userData.first_name,
     last_name: userData.last_name,
     phone: userData.phone,
     address: userData.address,
   });
   ```

3. Create booking record:
   ```typescript
   const booking = await bookingsApi.createBooking({
     room_id: selectedRoom.id,
     guest_id: guest.id,
     check_in_date: checkInDate,
     check_out_date: checkOutDate,
     number_of_guests: guestCount,
     total_nights: nights,
     total_price: totalAmount,
     status: 'pending',
     special_requests: requests,
   });
   ```

4. Generate booking confirmation number
5. Send confirmation email
6. Update room availability cache

**Database Changes:**
```sql
-- Insert booking
INSERT INTO bookings (
  room_id, guest_id, check_in, check_out,
  number_of_guests, total_amount, status, special_requests
) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?);

-- Optional: Block dates (if using separate availability table)
INSERT INTO room_availability (room_id, date, is_available)
VALUES (room_id, date_series, false);
```

---

### Step 6: Payment Processing
**Component:** Payment integration (to be implemented)  
**Requirements:** Valid booking, payment method

**Current Status:** Placeholder for payment integration

**Recommended Implementation:**
```typescript
// Stripe Payment Intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalAmount * 100, // Convert to cents
  currency: 'usd',
  metadata: {
    booking_id: booking.id,
    room_name: room.name,
    check_in: checkInDate,
    check_out: checkOutDate,
  },
});

// After successful payment
await bookingsApi.updateBookingStatus(booking.id, 'confirmed');
```

**Payment Flow:**
1. User enters payment details
2. Payment processor validates card
3. Charge is authorized (not captured yet)
4. Booking status → 'confirmed'
5. Charge is captured
6. Receipt is generated
7. Confirmation email sent

**Supported Payment Methods:**
- Credit/Debit Cards
- PayPal (optional)
- Apple Pay (optional)
- Google Pay (optional)

---

### Step 7: Booking Confirmation
**Component:** Confirmation screen  
**Requirements:** Successful booking creation

**User Actions:**
1. View booking confirmation
2. Download confirmation PDF
3. Add to calendar
4. Share via email/SMS
5. Go to "My Bookings"

**Confirmation Display:**
```
✅ Booking Confirmed!

Confirmation Number: #ABC12345
Room: Deluxe Ocean View
Check-in: Oct 20, 2025 (3:00 PM)
Check-out: Oct 22, 2025 (11:00 AM)
Guests: 2 people
Total: $450.00

[Download PDF] [Add to Calendar] [View Booking]
```

**Email Confirmation:**
- Sent to user's email
- Contains all booking details
- Includes QR code for check-in
- Hotel contact information
- Cancellation policy
- Directions to hotel

---

### Step 8: Booking Management
**Page:** `/customer` → My Bookings  
**Requirements:** Authenticated user

**Customer Can:**
- View all bookings (upcoming & past)
- Download invoices
- Cancel bookings (within policy)
- Modify bookings (if allowed)
- Add special requests
- Contact hotel staff
- Leave reviews (after stay)

**Booking Status:**
1. **Pending** - Awaiting payment/confirmation
2. **Confirmed** - Payment received, room reserved
3. **Checked-In** - Guest arrived
4. **Completed** - Stay finished
5. **Cancelled** - Booking cancelled

**Status Transitions:**
```
Pending → Confirmed (payment success)
Confirmed → Checked-In (arrival)
Checked-In → Completed (checkout)
Any → Cancelled (user/admin cancellation)
```

---

## 🎨 UI/UX Best Practices

### Progressive Disclosure
1. Show basic info first
2. Reveal details on demand
3. Use accordions for extra info
4. Minimize cognitive load

### Form Validation
```typescript
// Real-time validation
const validateBooking = {
  dates: () => checkOut > checkIn && checkIn >= today,
  guests: () => guestCount <= room.capacity && guestCount > 0,
  availability: async () => await checkRoomAvailability(room.id, dates),
  payment: () => validateCardDetails(paymentInfo),
};
```

### Loading States
- Show skeleton screens
- Display progress indicators
- Provide estimated wait time
- Allow cancellation of long operations

### Error Handling
```typescript
try {
  await createBooking(bookingData);
} catch (error) {
  if (error.code === 'ROOM_UNAVAILABLE') {
    showError('This room is no longer available for selected dates');
    suggestAlternativeRooms();
  } else if (error.code === 'PAYMENT_FAILED') {
    showError('Payment failed. Please try again or use different card');
  } else {
    showError('Booking failed. Please try again or contact support');
  }
}
```

---

## 🔒 Security & Validation

### Server-Side Validation
```typescript
// ALWAYS validate on server
const validateBookingServer = async (bookingData) => {
  // 1. Verify user is authenticated
  const user = await getAuthUser(request);
  if (!user) throw new Error('Unauthorized');

  // 2. Verify room exists and is active
  const room = await getRoomById(bookingData.room_id);
  if (!room || !room.is_active) throw new Error('Room unavailable');

  // 3. Verify dates are valid
  if (bookingData.check_out <= bookingData.check_in) {
    throw new Error('Invalid dates');
  }

  // 4. Verify room is available
  const isAvailable = await checkAvailability(
    bookingData.room_id,
    bookingData.check_in,
    bookingData.check_out
  );
  if (!isAvailable) throw new Error('Room not available');

  // 5. Verify price hasn't changed
  const currentPrice = await getRoomPrice(bookingData.room_id);
  const expectedTotal = currentPrice * bookingData.total_nights;
  if (Math.abs(expectedTotal - bookingData.total_price) > 0.01) {
    throw new Error('Price mismatch');
  }

  return true;
};
```

### Race Condition Prevention
```typescript
// Use database transactions
const createBookingWithLock = async (bookingData) => {
  const { data, error } = await supabase.rpc('create_booking_with_lock', {
    p_room_id: bookingData.room_id,
    p_check_in: bookingData.check_in,
    p_check_out: bookingData.check_out,
    // ... other params
  });
  
  return data;
};

// PostgreSQL function with row locking
CREATE OR REPLACE FUNCTION create_booking_with_lock(...)
RETURNS json AS $$
BEGIN
  -- Lock the room row
  SELECT * FROM rooms WHERE id = p_room_id FOR UPDATE;
  
  -- Check availability
  IF NOT check_room_availability(p_room_id, p_check_in, p_check_out) THEN
    RAISE EXCEPTION 'Room not available';
  END IF;
  
  -- Create booking
  INSERT INTO bookings (...) VALUES (...) RETURNING *;
  
  RETURN json_build_object('success', true, 'booking', row_to_json(NEW));
END;
$$ LANGUAGE plpgsql;
```

---

## 📧 Email Notifications

### Booking Confirmation Email
**Trigger:** Booking created & confirmed  
**Recipients:** Customer email

**Content:**
```
Subject: Booking Confirmed - Swift Room Haven

Dear [Guest Name],

Thank you for your booking! Your reservation has been confirmed.

Booking Details:
================
Confirmation #: ABC12345
Room: Deluxe Ocean View
Check-in: October 20, 2025 at 3:00 PM
Check-out: October 22, 2025 at 11:00 AM
Guests: 2 Adults
Total: $450.00

Special Requests:
[Special requests if any]

Need Help?
Call: (555) 123-4567
Email: support@swiftroomhaven.com

[View Booking Details] [Download PDF] [Add to Calendar]

See you soon!
Swift Room Haven Team
```

### Reminder Email
**Trigger:** 48 hours before check-in  
**Content:** Check-in details, directions, parking info

### Post-Stay Email
**Trigger:** 24 hours after check-out  
**Content:** Thank you, review request, special offers

---

## 🎯 Cancellation Workflow

### Customer Cancellation
**Access:** Customer Panel → My Bookings → Cancel

**Steps:**
1. Click "Cancel Booking"
2. Confirm cancellation (warning dialog)
3. Select reason (optional)
4. Review refund policy
5. Confirm final cancellation

**System Actions:**
```typescript
const cancelBooking = async (bookingId) => {
  // Update booking status
  await bookingsApi.updateStatus(bookingId, 'cancelled');
  
  // Process refund based on policy
  const refundAmount = calculateRefund(booking);
  if (refundAmount > 0) {
    await processRefund(booking.payment_id, refundAmount);
  }
  
  // Send cancellation email
  await sendCancellationEmail(booking.guest_email, {
    booking_id: bookingId,
    refund_amount: refundAmount,
  });
  
  // Release room availability
  await releaseRoomDates(booking.room_id, booking.dates);
};
```

### Cancellation Policy
```
- 7+ days before: 100% refund
- 3-6 days before: 50% refund
- 0-2 days before: No refund
- No-show: No refund
```

---

## 📊 Analytics & Tracking

### Track These Events
```typescript
// Google Analytics / Mixpanel events
trackEvent('room_viewed', { room_id, room_name });
trackEvent('booking_started', { room_id, dates });
trackEvent('booking_abandoned', { step, room_id });
trackEvent('booking_completed', { booking_id, total_amount });
trackEvent('payment_failed', { error_code, amount });
```

### Key Metrics
- Conversion rate (views → bookings)
- Average booking value
- Booking abandonment rate
- Time to complete booking
- Popular rooms
- Peak booking times

---

## 🎊 Summary

### Complete Booking Flow
1. ✅ Browse rooms (public)
2. ✅ Select dates & room
3. ✅ Authenticate (sign in/sign up)
4. ✅ Review & confirm details
5. ✅ Process payment
6. ✅ Create booking
7. ✅ Send confirmation
8. ✅ Manage booking
9. ✅ Check-in/Check-out
10. ✅ Post-stay review

### Integration Points
- ✅ **Authentication** - Supabase Auth
- ✅ **Database** - PostgreSQL via Supabase
- ✅ **Email** - Supabase/SMTP
- 🔄 **Payment** - Stripe (to implement)
- 🔄 **Calendar** - iCal/Google (to implement)
- 🔄 **Analytics** - GA4 (to implement)

### Security Checklist
- ✅ Server-side validation
- ✅ SQL injection prevention
- ✅ Rate limiting (Supabase built-in)
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Authentication required
- ✅ Role-based access
- ✅ Encrypted connections (HTTPS)

---

**Workflow Version:** 1.0.0  
**Last Updated:** October 17, 2025  
**Status:** Ready for Implementation ✅
