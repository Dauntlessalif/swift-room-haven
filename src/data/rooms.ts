// Room interface matching database schema
export interface Room {
  id: number;
  name: string;
  image: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  size: string;
  bedType: string;
  available: boolean;
}

// This file now expects rooms to be fetched from the database
// The hardcoded room data has been moved to INSERT_ROOMS_DHAKA.sql
// Use the roomsApi from lib/api.ts to fetch rooms from Supabase

// Example usage in components:
// import { roomsApi } from '@/lib/api';
// const rooms = await roomsApi.getRooms();

// For backward compatibility, export an empty array
// Components should fetch from the API instead
export const rooms: Room[] = [];