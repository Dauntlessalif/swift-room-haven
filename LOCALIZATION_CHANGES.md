# Localization Changes - Dhaka, Bangladesh

## Summary
This document outlines all the changes made to localize the Luxe Hotel application for Dhaka, Bangladesh operations.

## Configuration
All Dhaka-specific settings are centralized in `src/config/hotelConfig.ts`:

### Location Details
- **City**: Dhaka, Bangladesh
- **Area**: Gulshan-1 (diplomatic zone)
- **Address**: Plot 23, Gulshan Avenue, Gulshan-1, Dhaka-1212, Bangladesh
- **Airport**: Hazrat Shahjalal International Airport (25 minutes away)
- **Nearby Areas**: Banani, Baridhara, Bashundhara

### Contact Information
- **Phone**: +880 2 5566 7788 (Bangladesh landline format)
- **Email**: info@luxehoteldhaka.com
- **Events Email**: events@luxehoteldhaka.com
- **Hours**: 24/7 Available

### Currency & Pricing
- **Currency**: BDT (৳) - Bangladeshi Taka
- **Room Prices**:
  - Standard Room: ৳24,999/night
  - Deluxe Room: ৳39,999/night
  - Presidential Suite: ৳89,999/night

### Services Pricing
- **Pet Sitting**: ৳2,500/hour
- **Pet Walking**: ৳1,500/walk
- **Pet Registration**: ৳5,000/stay
- **Valet Parking**: ৳3,500/day
- **Self Parking**: ৳2,000/day

### Timezone
- **Name**: Bangladesh Standard Time
- **Abbreviation**: BST
- **UTC Offset**: +6:00

## Files Modified

### 1. `src/config/hotelConfig.ts` (NEW)
- Centralized configuration file
- Helper functions: `formatPrice()`, `formatPhoneForCall()`, `formatTime()`
- All Dhaka-specific constants

### 2. `src/data/rooms.ts`
- Imported HOTEL_CONFIG
- Updated prices from USD to BDT
- Changed descriptions to mention "Dhaka skyline" and "heart of Dhaka"
- Room amenities updated to show "Dhaka Skyline View"

### 3. `src/components/RoomCard.tsx`
- Imported `formatPrice()` function
- Updated price display to show BDT (৳) instead of USD ($)

### 4. `src/components/Navigation.tsx`
- Imported HOTEL_CONFIG
- Updated phone numbers (both desktop and mobile menu) to Bangladesh format
- Changed from "+1 (555) 123-4567" to "+880 2 5566 7788"

### 5. `src/pages/Contact.tsx`
- Imported HOTEL_CONFIG
- Updated all contact information:
  - Address: Changed to Gulshan, Dhaka address
  - Phone: Updated to Bangladesh format
  - Email: Changed to @luxehoteldhaka.com
  - Hours: Added BST timezone notation

### 6. `src/pages/PetCare.tsx`
- Imported HOTEL_CONFIG and formatPrice
- Updated all pet service prices to BDT:
  - Pet Sitting: ৳2,500/hour
  - Pet Walking: ৳1,500/walk
  - Pet Registration: ৳5,000/stay

### 7. `src/components/HeroSection.tsx`
- Imported HOTEL_CONFIG
- Updated location tag to show "Gulshan, Dhaka" instead of "Prime City Location"

### 8. `src/pages/About.tsx`
- Imported HOTEL_CONFIG
- Updated "Prime Location" feature to mention Gulshan, Dhaka, and airport distance
- Changed "in the heart of the city" to "in Gulshan, Dhaka"

### 9. `src/components/ChatBot.tsx`
- Imported HOTEL_CONFIG and formatPrice
- Updated all chatbot responses:
  - Greeting message now says "Luxe Hotel Dhaka"
  - Pricing responses use BDT formatting
  - Pet care prices in BDT
  - Check-in/check-out times include BST timezone
  - Location response includes full Dhaka address and airport info
  - Contact information updated to Bangladesh phone and email

## Helper Functions

### `formatPrice(amount: number, includeSymbol: boolean = true): string`
Formats numbers as Bangladeshi Taka with proper locale formatting:
- Example: `formatPrice(24999)` → "৳24,999"
- Example: `formatPrice(24999, false)` → "24,999"

### `formatPhoneForCall(phone: string): string`
Strips formatting from phone numbers for tel: links:
- Example: `formatPhoneForCall("+880 2 5566 7788")` → "+88025566788"

### `formatTime(time: string): string`
Appends timezone abbreviation to time strings:
- Example: `formatTime("3:00 PM")` → "3:00 PM BST"

## Testing Checklist
- [x] Build completes successfully (`npm run build`)
- [x] No TypeScript errors (except pre-existing database.types issue)
- [x] Room prices display in BDT
- [x] Contact information shows Dhaka address
- [x] Phone numbers in Bangladesh format
- [x] Chatbot responses include BDT prices
- [x] Pet care services show BDT pricing
- [x] Location references mention Dhaka/Gulshan

## Next Steps
1. Update any API endpoints to handle BDT currency
2. Update payment gateway integration for Bangladesh market
3. Consider adding Bengali language support
4. Update SEO metadata for Bangladesh target audience
5. Add bKash/Nagad payment options (popular in Bangladesh)
6. Consider mobile banking integration (common in Bangladesh)

## Currency Conversion Reference
Original USD prices → New BDT prices (approximately 1 USD = 110 BDT):
- $249 → ৳24,999
- $399 → ৳39,999
- $899 → ৳89,999
- $25 → ৳2,500
- $15 → ৳1,500
- $50 → ৳5,000
