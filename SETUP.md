# Swift Room Haven - Hotel Booking Website

A comprehensive hotel booking website built with React, TypeScript, Tailwind CSS, and Supabase backend.

## 🚀 Features

### Booking System
- **Room Browsing**: View all available rooms with detailed information
- **Real-time Availability**: Check room availability for selected dates
- **Online Booking**: Complete booking flow with guest information collection
- **Booking Management**: View and manage existing bookings
- **Booking Cancellation**: Cancel bookings with confirmation dialog

### Guest Services
- **Contact Form**: Submit inquiries and get support
- **Pet Care Services**: Request specialized pet care services with detailed forms
- **Room Reviews**: (Database ready - UI can be added)

### Technical Features
- **Supabase Backend**: PostgreSQL database with Row Level Security
- **Type-safe API**: Full TypeScript support with auto-generated types
- **Responsive Design**: Works on all devices
- **Modern UI**: Built with shadcn/ui components
- **Real-time Updates**: Integrated with Supabase real-time capabilities
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Smooth loading indicators throughout

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

## 🛠️ Setup Instructions

### 1. Database Setup

1. Go to your Supabase project: https://ziydtipspgbsrawpdvyi.supabase.co
2. Navigate to the SQL Editor
3. Open the file `supabase-schema.sql` in your project root
4. Copy the entire SQL script
5. Paste it into the Supabase SQL Editor
6. Click "Run" to execute the script

This will create:
- All necessary tables (rooms, guests, bookings, contact_messages, pet_care_requests, reviews)
- Database functions for availability checking
- Row Level Security policies
- Triggers for automatic timestamp updates
- Sample room data
- Useful views for queries

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

The Supabase credentials are already configured in `src/lib/supabase.ts`:
- Project URL: https://ziydtipspgbsrawpdvyi.supabase.co
- API Key: Already set (service role key)

⚠️ **Security Note**: For production, move these to environment variables:

Create a `.env` file:
```env
VITE_SUPABASE_URL=https://ziydtipspgbsrawpdvyi.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Then update `src/lib/supabase.ts` to use:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:5173

## 🗂️ Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── ChatBot.tsx      # AI chatbot component
│   ├── HeroSection.tsx  # Homepage hero
│   ├── Navigation.tsx   # Navigation bar
│   ├── ReservationModal.tsx  # Booking modal
│   └── RoomCard.tsx     # Room display card
├── data/
│   └── rooms.ts         # Room type definitions
├── hooks/               # Custom React hooks
├── lib/
│   ├── api.ts          # API functions for Supabase
│   ├── database.types.ts  # TypeScript database types
│   ├── supabase.ts     # Supabase client config
│   └── utils.ts        # Utility functions
├── pages/              # Page components
│   ├── About.tsx       # About page
│   ├── Contact.tsx     # Contact form
│   ├── Index.tsx       # Homepage
│   ├── MyBookings.tsx  # Booking management
│   ├── NotFound.tsx    # 404 page
│   ├── PetCare.tsx     # Pet care services
│   └── Rooms.tsx       # Room listings
└── App.tsx             # Main app component
```

## 🎯 Usage Guide

### Making a Booking

1. Navigate to "Rooms" page
2. Click "Book Now" on any room
3. Fill in the booking form:
   - Select check-in and check-out dates
   - Enter guest information
   - Specify number of guests
4. Click "Confirm Reservation"
5. System will:
   - Check room availability
   - Create or update guest record
   - Create booking with confirmed status
   - Show confirmation with booking ID

### Viewing Bookings

1. Navigate to "My Bookings"
2. Enter your email address to search
3. View all your bookings with details
4. Cancel bookings if needed

### Submitting Contact Form

1. Navigate to "Contact"
2. Fill in your details and message
3. Submit - message is saved to database

### Requesting Pet Care

1. Navigate to "Pet Care"
2. Fill in the comprehensive form:
   - Your contact information
   - Pet details (name, type, weight, age)
   - Service type (sitting, walking, grooming, etc.)
   - Date range
   - Special requirements
3. Submit request

## 🗄️ Database Schema

### Tables

- **rooms**: Hotel room information
- **guests**: Guest profiles
- **bookings**: Reservation records
- **contact_messages**: Contact form submissions
- **pet_care_requests**: Pet service requests
- **reviews**: Guest reviews (ready for implementation)

### Key Features

- **Automatic Timestamps**: created_at and updated_at auto-managed
- **Referential Integrity**: Foreign keys with cascade deletes
- **Data Validation**: Check constraints for dates, prices, ratings
- **Row Level Security**: Public can read rooms, insert bookings
- **Helper Functions**: `check_room_availability()` function
- **Useful Views**: `booking_details` and `room_availability_summary`

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Service role key used for trusted operations
- Public access limited to reading rooms and creating bookings
- Input validation on all forms
- SQL injection protection via Supabase client

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables for Supabase

### Environment Variables for Production

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 📊 Database Queries

### Useful SQL Queries

Check all bookings:
```sql
SELECT * FROM booking_details ORDER BY check_in_date DESC;
```

Check room availability:
```sql
SELECT * FROM room_availability_summary;
```

Get upcoming bookings:
```sql
SELECT * FROM booking_details 
WHERE check_in_date >= CURRENT_DATE 
AND booking_status IN ('pending', 'confirmed')
ORDER BY check_in_date;
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify Supabase URL and API key
- Check RLS policies are correctly set
- Ensure SQL schema was executed successfully

### Booking Not Working
- Check browser console for errors
- Verify room availability function is created
- Check guest email format is valid

### Images Not Showing
- Images are stored in `/src/assets/`
- Ensure image paths in database match actual files
- Check Vite asset handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Credits

Built with:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)

---

**Need Help?** Open an issue or contact support through the website's contact form!
