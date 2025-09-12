import suiteImage from "@/assets/suite-room.jpg";
import deluxeImage from "@/assets/deluxe-room.jpg";
import standardImage from "@/assets/standard-room.jpg";

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

export const rooms: Room[] = [
  {
    id: 1,
    name: "Presidential Suite",
    image: suiteImage,
    price: 899,
    capacity: 4,
    description: "Indulge in the ultimate luxury experience with our Presidential Suite featuring panoramic city views, separate living area, and premium amenities.",
    amenities: ["Free Wi-Fi", "Valet Parking", "Coffee Maker", "Room Service", "Mini Bar", "City View"],
    size: "1,200 sq ft",
    bedType: "King Bed",
    available: true,
  },
  {
    id: 2,
    name: "Deluxe Room",
    image: deluxeImage,
    price: 399,
    capacity: 2,
    description: "Spacious and elegantly appointed with modern amenities, perfect for business travelers and couples seeking comfort and style.",
    amenities: ["Free Wi-Fi", "Coffee Maker", "Room Service", "Work Desk"],
    size: "450 sq ft",
    bedType: "Queen Bed",
    available: true,
  },
  {
    id: 3,
    name: "Standard Room",
    image: standardImage,
    price: 249,
    capacity: 2,
    description: "Comfortable and stylish accommodation with all essential amenities for a pleasant stay at an excellent value.",
    amenities: ["Free Wi-Fi", "Coffee Maker", "Daily Housekeeping"],
    size: "300 sq ft",
    bedType: "Double Bed",
    available: true,
  },
];