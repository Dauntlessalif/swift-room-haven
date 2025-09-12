import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wifi, Car, Coffee, Utensils, Users, Bed } from "lucide-react";

interface Room {
  id: number;
  name: string;
  image: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  size: string;
  bedType: string;
}

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
  "Free Wi-Fi": <Wifi className="h-4 w-4" />,
  "Valet Parking": <Car className="h-4 w-4" />,
  "Coffee Maker": <Coffee className="h-4 w-4" />,
  "Room Service": <Utensils className="h-4 w-4" />,
};

const RoomCard = ({ room, onBook }: RoomCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-smooth group">
      <div className="relative overflow-hidden">
        <img 
          src={room.image} 
          alt={room.name}
          className="w-full h-64 object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-navy text-white shadow-md">
            {room.size}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-foreground">{room.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-navy">${room.price}</div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>Up to {room.capacity} guests</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span>{room.bedType}</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {room.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
              {amenityIcons[amenity] || <div className="h-4 w-4" />}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Button 
          onClick={() => onBook(room)}
          className="w-full bg-navy hover:bg-navy-light text-white transition-smooth"
          size="lg"
        >
          Reserve Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;