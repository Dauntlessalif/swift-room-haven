# 🏨 Swift Room Haven - Hotel Booking Website

A fully functional, production-ready hotel booking platform with real-time availability checking, comprehensive booking management, and Supabase backend integration.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat&logo=supabase)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)

## ✨ Features

### 🎯 Complete Booking System
- ✅ **Browse Rooms** - View all available rooms with photos, pricing, and amenities
- ✅ **Real-time Availability** - Check if rooms are available for your dates
- ✅ **Instant Booking** - Complete booking flow in one modal
- ✅ **Guest Management** - Automatic guest profile creation and updates
- ✅ **View Bookings** - Search and view all your reservations by email
- ✅ **Cancel Bookings** - Cancel with confirmation dialog
- ✅ **Status Tracking** - Track booking status (pending → confirmed → checked in → checked out)

### 🐾 Guest Services
- ✅ **Contact Form** - Submit inquiries with automatic database storage
- ✅ **Pet Care Services** - Comprehensive pet care request system
- ✅ **Service Types** - Sitting, walking, grooming, daycare, overnight care
- ✅ **Pet Information** - Track pet type, weight, age, special requirements

### 🔧 Technical Excellence
- ✅ **Supabase Backend** - PostgreSQL database with Row Level Security
- ✅ **Type-safe API** - Full TypeScript with auto-generated database types
- ✅ **Availability Checking** - SQL function for conflict detection
- ✅ **Database Views** - Pre-joined queries for performance
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Modern UI** - Built with shadcn/ui components
- ✅ **Error Handling** - User-friendly error messages everywhere
- ✅ **Loading States** - Smooth loading indicators with spinners
- ✅ **Toast Notifications** - Real-time feedback for all actions

## 📋 Prerequisites

- Node.js 18+ and npm installed
- Supabase account (free tier works perfectly)
- Web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Setup (2 Steps)

### Step 1: Setup Database (2 minutes)

1. **Open Supabase SQL Editor**
   ```
   Visit: https://ziydtipspgbsrawpdvyi.supabase.co
   Click: SQL Editor (left sidebar)
   ```

2. **Run the SQL Schema**
   - Open `supabase-schema.sql` from this project
   - Copy ALL content (entire file)
   - Paste into Supabase SQL Editor
   - Click "Run" button
   - Wait 5-10 seconds

   ✅ This creates all tables, functions, and sample rooms!

3. **Verify (Optional)**
   ```sql
   SELECT * FROM rooms;
   ```
   Should show 3 rooms: Presidential Suite, Deluxe Room, Standard Room

### Step 2: Run the Application

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

🎉 **Visit:** http://localhost:5173

**That's it!** The website is now fully functional and connected to your Supabase database.

## 📚 Documentation Files

- **`SQL_INSTRUCTIONS.md`** - SQL setup instructions
- **`QUICK_START.md`** - Quick reference guide  
- **`SETUP.md`** - Detailed setup guide
- **`DATABASE_GUIDE.md`** - Database queries and management
- **`IMPLEMENTATION_SUMMARY.md`** - Complete feature list

## 🗂️ Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components (Button, Input, etc.)
│   ├── ChatBot.tsx      # AI chatbot component
│   ├── HeroSection.tsx  # Homepage hero section
│   ├── Navigation.tsx   # Navigation bar with routing
│   ├── ReservationModal.tsx  # Complete booking modal
│   └── RoomCard.tsx     # Room display card
├── data/
│   └── rooms.ts         # Room type definitions
├── hooks/               # Custom React hooks
│   └── use-toast.ts     # Toast notification hook
├── lib/
│   ├── api.ts          # Complete API layer for Supabase
│   ├── database.types.ts  # TypeScript database types
│   ├── supabase.ts     # Supabase client configuration
│   └── utils.ts        # Utility functions
├── pages/              # Page components (routes)
│   ├── About.tsx       # About the hotel
│   ├── Contact.tsx     # Contact form with Supabase
│   ├── Index.tsx       # Homepage with featured rooms
│   ├── MyBookings.tsx  # Booking management page ⭐ NEW
│   ├── NotFound.tsx    # 404 page
│   ├── PetCare.tsx     # Pet care services form
│   └── Rooms.tsx       # All rooms listing
├── App.tsx             # Main app with routing
└── main.tsx            # Entry point
```

## 🎯 How to Use

### Making a Booking

1. Navigate to **Rooms** page
2. Click **"Book Now"** on any room
3. Select check-in and check-out dates in the calendar
4. Fill in guest information (name, email, phone, address)
5. Enter number of guests
6. Click **"Confirm Reservation"**
7. System automatically:
   - ✅ Checks room availability
   - ✅ Creates/updates guest profile
   - ✅ Creates confirmed booking
   - ✅ Shows booking ID

### Viewing Your Bookings

1. Navigate to **My Bookings** page
2. Enter your email address
3. Click **"Search"**
4. View all your bookings with full details
5. Cancel bookings if needed (with confirmation)

### Submitting Contact Form

1. Navigate to **Contact** page
2. Fill in your name, email, subject, and message
3. Click **"Send Message"**
4. Message is saved to database

### Requesting Pet Care

1. Navigate to **Pet Care** page
2. Fill in comprehensive form:
   - Your contact information
   - Pet details (name, type, weight, age)
   - Service type selection
   - Date range for service
   - Special requirements
3. Click **"Submit Request"**
4. Request is saved to database

## 🗄️ Database Schema

### Tables Created

- **rooms** - Hotel room inventory with pricing, amenities, and availability
- **guests** - Guest profiles with contact information (auto-managed)
- **bookings** - Complete reservation records with status tracking
- **contact_messages** - Contact form submissions with status
- **pet_care_requests** - Pet care service requests with details
- **reviews** - Guest review system (structure ready for implementation)

### Key Features

- ✅ Automatic timestamps (created_at, updated_at)
- ✅ Foreign key relationships with cascade deletes
- ✅ Data validation with check constraints
- ✅ Row Level Security (RLS) enabled
- ✅ Helper function: `check_room_availability()`
- ✅ Views: `booking_details`, `room_availability_summary`
- ✅ Pre-populated with 3 sample rooms

## 🔒 Security

- **Row Level Security (RLS)** enabled on all tables
- **Service role key** for trusted backend operations
- **Public access** limited to:
  - Reading rooms
  - Creating bookings
  - Creating contact messages
  - Creating pet care requests
- **Input validation** on all forms
- **SQL injection protection** via Supabase client
- **Type safety** throughout the application

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### Deploy Options

**Vercel (Recommended):**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

**Netlify:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables

### Environment Variables

For production, create these environment variables:

```env
VITE_SUPABASE_URL=https://ziydtipspgbsrawpdvyi.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Then update `src/lib/supabase.ts`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify Supabase URL and API key are correct
- Check RLS policies are properly set
- Ensure SQL schema was executed successfully

### Bookings Not Saving
- Check browser console for error messages
- Verify `check_room_availability` function exists
- Confirm guest email format is valid

### Images Not Loading
- Images are stored in `src/assets/`
- Ensure image paths in database match actual files
- Check Vite asset handling configuration

### Port Already in Use
- Vite will automatically try another port
- Or manually specify: `npm run dev -- --port 3000`

## 📊 Useful Database Queries

### View All Bookings
```sql
SELECT * FROM booking_details 
ORDER BY check_in_date DESC;
```

### Check Room Availability
```sql
SELECT * FROM room_availability_summary;
```

### Upcoming Bookings
```sql
SELECT * FROM booking_details 
WHERE check_in_date >= CURRENT_DATE
AND booking_status IN ('pending', 'confirmed')
ORDER BY check_in_date;
```

### Revenue Report (This Month)
```sql
SELECT 
  COUNT(*) as total_bookings,
  SUM(total_price) as total_revenue
FROM bookings
WHERE booking_status != 'cancelled'
AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE);
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Backend:** Supabase (PostgreSQL)
- **Build Tool:** Vite
- **State Management:** React Query (TanStack Query)
- **Routing:** React Router v6
- **Date Handling:** date-fns
- **Icons:** Lucide React
- **Form Handling:** React Hook Form

## 📈 What's Working

✅ Room browsing from database  
✅ Real-time availability checking  
✅ Complete booking creation  
✅ Guest auto-creation/updates  
✅ Booking search by email  
✅ Booking cancellation  
✅ Contact form submission  
✅ Pet care request submission  
✅ Responsive design  
✅ Loading states  
✅ Error handling  
✅ Toast notifications  
✅ Type safety  
✅ Production build  

## 🎉 Quick Start Summary

1. **Paste SQL file into Supabase** (`supabase-schema.sql`)
2. **Run:** `npm install && npm run dev`
3. **Visit:** http://localhost:5173
4. **Start booking rooms!** 🚀

## 📝 License

MIT License - Free to use for personal or commercial projects

## 🙏 Credits

Built with modern web technologies:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)

---

**Questions or Issues?** Check the documentation files or open an issue!

**Ready to take bookings?** Follow the Quick Setup steps above! 🏨✨
