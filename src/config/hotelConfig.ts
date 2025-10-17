// Dhaka, Bangladesh Hotel Configuration

export const HOTEL_CONFIG = {
  location: {
    city: "Dhaka",
    country: "Bangladesh",
    address: "Plot 23, Gulshan Avenue, Gulshan-1, Dhaka-1212, Bangladesh",
    area: "Gulshan",
    nearbyAreas: ["Banani", "Baridhara", "Bashundhara"],
    airportDistance: "25 minutes",
  },
  
  contact: {
    phone: "+880 2 5566 7788",
    phoneDisplay: "+880 2 5566 7788",
    email: "info@luxehoteldhaka.com",
    eventsEmail: "events@luxehoteldhaka.com",
    hours: "24/7 Available",
  },
  
  currency: {
    code: "BDT",
    symbol: "৳",
    name: "Bangladeshi Taka",
  },
  
  timezone: {
    name: "Bangladesh Standard Time",
    abbreviation: "BST",
    offset: "+6:00",
    utcOffset: 6,
  },
  
  airport: {
    name: "Hazrat Shahjalal International Airport",
    code: "DAC",
    distanceMinutes: 25,
  },
  
  rooms: {
    standard: {
      name: "Standard Room",
      price: 24999,
      priceFormatted: "৳24,999",
    },
    superior: {
      name: "Superior Room",
      price: 32999,
      priceFormatted: "৳32,999",
    },
    deluxe: {
      name: "Deluxe Room",
      price: 39999,
      priceFormatted: "৳39,999",
    },
    premiumDeluxe: {
      name: "Premium Deluxe",
      price: 49999,
      priceFormatted: "৳49,999",
    },
    juniorSuite: {
      name: "Junior Suite",
      price: 64999,
      priceFormatted: "৳64,999",
    },
    executiveSuite: {
      name: "Executive Suite",
      price: 74999,
      priceFormatted: "৳74,999",
    },
    suite: {
      name: "Presidential Suite",
      price: 89999,
      priceFormatted: "৳89,999",
    },
    familySuite: {
      name: "Family Suite",
      price: 79999,
      priceFormatted: "৳79,999",
    },
    honeymoonSuite: {
      name: "Honeymoon Suite",
      price: 99999,
      priceFormatted: "৳99,999",
    },
  },
  
  services: {
    petSitting: {
      price: 2500,
      priceFormatted: "৳2,500",
      unit: "hour",
    },
    petWalking: {
      price: 1500,
      priceFormatted: "৳1,500",
      unit: "walk",
    },
    petRegistration: {
      price: 5000,
      priceFormatted: "৳5,000",
      unit: "stay",
    },
    valetParking: {
      price: 3500,
      priceFormatted: "৳3,500",
      unit: "day",
    },
    selfParking: {
      price: 2000,
      priceFormatted: "৳2,000",
      unit: "day",
    },
    carWash: {
      price: 2000,
      priceFormatted: "৳2,000",
      unit: "service",
    },
  },
  
  dining: {
    halal: true,
    restaurantName: "Le Ciel Restaurant",
    loungeName: "Rooftop Lounge",
  },
  
  features: {
    views: ["Dhaka Skyline", "Gulshan Lake", "City View"],
    eventTypes: ["Weddings", "Walima", "Holud", "Corporate Events", "Conferences"],
  },
};

// Currency formatting helper
export function formatPrice(amount: number, includeSymbol = true): string {
  const formatted = amount.toLocaleString('en-BD');
  return includeSymbol ? `৳${formatted}` : formatted;
}

// Phone number formatting helper
export function formatPhoneForCall(phone: string): string {
  return phone.replace(/\s/g, '');
}

// Time formatter with BST
export function formatTime(time: string): string {
  return `${time} BST`;
}
