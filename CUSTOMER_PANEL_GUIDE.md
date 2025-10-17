# Customer Panel Documentation

## Overview
The Customer Panel is a comprehensive self-service portal for hotel guests to manage their bookings, profile, reviews, and pet care requests.

## Access
**URL:** `http://localhost:8080/customer`

**Login:** Enter any valid email address (demo mode)

In production, this would integrate with a proper authentication system (Auth0, Firebase Auth, or Supabase Auth).

## Features

### 1. My Bookings
**View and manage all your reservations**

#### Upcoming Stays
- See all confirmed future bookings
- View booking details (check-in/out dates, room type, total amount)
- Download invoices
- Cancel pending bookings
- View special requests

#### Past Bookings  
- Access booking history
- View completed and cancelled reservations
- Download past invoices for expense reports

#### Booking Details Include:
- Booking confirmation number
- Room name and type
- Check-in/check-out dates
- Number of guests
- Total amount paid
- Booking status (pending, confirmed, cancelled, completed)
- Special requests

### 2. Profile Management
**Manage your personal information**

#### Editable Fields:
- First Name
- Last Name
- Email Address
- Phone Number
- Address
- City
- Country

#### Features:
- View mode (read-only display)
- Edit mode (click "Edit Profile")
- Auto-save on submit
- Form validation
- Account statistics display

#### Account Statistics:
- Total bookings made
- Reviews written
- Loyalty points earned

### 3. Reviews
**Manage your reviews for rooms you've stayed in**

#### Features:
- View all your reviews
- Edit existing reviews
- Delete reviews
- See 5-star rating display
- View admin responses to your reviews

#### Review Information:
- Room name
- Review date
- Star rating (1-5 stars)
- Written comment
- Admin response (if available)

#### Actions:
- Edit review text (preserves rating)
- Delete review (with confirmation dialog)
- View chronological history

### 4. Pet Care Requests
**Submit and track pet care service requests**

#### Submit New Request:
- Pet type (Dog, Cat, Bird, etc.)
- Pet name
- Special requirements (dietary, medical, etc.)
- Service preferences

#### Track Requests:
- View all submitted requests
- Monitor request status:
  - Pending: Awaiting approval
  - Approved: Confirmed by staff
  - In Progress: Currently being serviced
  - Completed: Service finished
  - Cancelled: Request cancelled

#### Request Details:
- Pet information
- Special requirements
- Admin notes
- Submission date
- Current status

#### Actions:
- Cancel pending requests
- View admin notes and updates

### 5. Favorites
**Save your favorite rooms for quick booking**

#### Features:
- Browse saved favorite rooms
- Quick access to room details
- One-click booking for favorites
- Remove rooms from favorites
- Special offers on favorite rooms

#### Special Offers:
- Early Bird Discount (15% OFF)
- Weekend Special (20% OFF)
- Loyalty Reward (10% OFF)

## User Experience Features

### Responsive Design
- Mobile-optimized interface
- Tablet and desktop layouts
- Touch-friendly controls

### Visual Indicators
- Color-coded status badges
- Icon-based navigation
- Progress indicators
- Loading states

### Real-time Updates
- Automatic data refresh
- Optimistic UI updates
- Error handling with user feedback

### Navigation
- Tab-based interface
- 5 main sections
- Quick access from Navigation bar
- Breadcrumb navigation

## Status Badge Colors

### Booking Status
- **Pending:** Yellow (⏳ Awaiting confirmation)
- **Confirmed:** Green (✅ Confirmed)
- **Cancelled:** Red (❌ Cancelled)
- **Completed:** Blue (🎉 Completed)

### Pet Care Status
- **Pending:** Yellow
- **Approved:** Green
- **In Progress:** Blue
- **Completed:** Purple
- **Cancelled:** Red

## Security Features

### Current (Demo Mode):
- Email-based identification
- Session-based authentication
- No password required

### Production Recommendations:
- Implement Supabase Auth
- Email/password authentication
- Social login (Google, Facebook)
- Two-factor authentication
- Session timeout
- Password reset flow
- Email verification

## Technical Details

### Components
- `CustomerPanel.tsx` - Main panel container
- `MyBookingsView.tsx` - Bookings management
- `ProfileManagement.tsx` - User profile
- `MyReviews.tsx` - Review management
- `PetCareRequests.tsx` - Pet care services
- `FavoritesView.tsx` - Saved favorites

### API Integration
- Uses centralized `api.ts` functions
- React Query for data fetching
- Optimistic updates
- Automatic cache invalidation

### State Management
- React Query for server state
- Local state for UI (useState)
- Form state management
- Authentication state

## Future Enhancements

### Planned Features:
1. **Loyalty Program**
   - Points accumulation
   - Tier levels (Silver, Gold, Platinum)
   - Reward redemption
   - Points history

2. **Communication**
   - In-app messaging with hotel staff
   - Notifications for booking updates
   - Email confirmations
   - SMS alerts

3. **Payment Management**
   - Saved payment methods
   - Payment history
   - Refund tracking
   - Invoice downloads

4. **Room Customization**
   - Room preference settings
   - Recurring booking templates
   - Auto-fill special requests

5. **Social Features**
   - Share reviews on social media
   - Refer friends program
   - Travel buddy invitations

## Support

### Getting Help:
1. Use the ChatBot for instant assistance
2. Visit the Contact page
3. Call hotel directly
4. Email customer support

### Common Issues:
- **Can't see bookings:** Ensure you're logged in with the correct email
- **Can't edit profile:** Click "Edit Profile" button first
- **Review not showing:** Reviews require admin approval
- **Pet care request pending:** Staff will review within 24 hours

## Best Practices

### For Customers:
1. Keep profile information up to date
2. Review booking details carefully
3. Submit pet care requests early
4. Check for special offers regularly
5. Write reviews to help other guests

### For Developers:
1. Always validate user input
2. Handle errors gracefully
3. Show loading states
4. Provide clear feedback messages
5. Test on multiple devices

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- High contrast mode compatible
- Focus indicators
- Semantic HTML structure

## Performance

- Lazy loading of components
- Optimized queries
- Cached data
- Minimal re-renders
- Fast page transitions

---

**Last Updated:** October 17, 2025
**Version:** 1.0.0
