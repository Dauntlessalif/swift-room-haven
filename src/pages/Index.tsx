import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import RoomCard from "@/components/RoomCard";
import ReservationModal from "@/components/ReservationModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Room } from "@/data/rooms";
import { roomsApi } from "@/lib/api";
import { Star, Wifi, Car, Coffee, Dumbbell, Waves, Utensils, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const data = await roomsApi.getAllRooms();
      const mappedRooms: Room[] = data.map((dbRoom) => ({
        id: dbRoom.id,
        name: dbRoom.name,
        description: dbRoom.description,
        price: Number(dbRoom.price),
        capacity: dbRoom.capacity,
        size: dbRoom.size,
        bedType: dbRoom.bed_type,
        amenities: dbRoom.amenities,
        image: dbRoom.image_url || "",
        available: dbRoom.available,
      }));
      setRooms(mappedRooms);
    } catch (error) {
      console.error('Error loading rooms:', error);
      toast({
        title: "Error",
        description: "Failed to load rooms. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const amenities = [
    { icon: <Wifi className="h-8 w-8" />, name: "Free Wi-Fi", description: "High-speed internet throughout" },
    { icon: <Car className="h-8 w-8" />, name: "Valet Parking", description: "Complimentary parking service" },
    { icon: <Coffee className="h-8 w-8" />, name: "Room Service", description: "24/7 in-room dining" },
    { icon: <Dumbbell className="h-8 w-8" />, name: "Fitness Center", description: "State-of-the-art equipment" },
    { icon: <Waves className="h-8 w-8" />, name: "Spa & Wellness", description: "Relaxation and treatments" },
    { icon: <Utensils className="h-8 w-8" />, name: "Fine Dining", description: "Award-winning restaurants" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Rooms Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Our Luxury Accommodations
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Each room is meticulously designed to provide comfort, elegance, and unforgettable experiences
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-navy" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onBook={handleBookRoom}
                  />
                ))}
              </div>
            )}

            <div className="text-center">
              <Link to="/rooms">
                <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  View All Rooms
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-20 gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                World-Class Amenities
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Experience luxury at every turn with our comprehensive range of premium facilities and services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <Card key={index} className="hover:shadow-card transition-smooth group">
                  <CardContent className="p-6 text-center">
                    <div className="text-gold mb-4 group-hover:scale-110 transition-smooth flex justify-center">
                      {amenity.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-navy mb-2">
                      {amenity.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {amenity.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                What Our Guests Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  location: "New York, NY",
                  rating: 5,
                  comment: "Absolutely exceptional! The service was impeccable and the room was stunning. Will definitely return."
                },
                {
                  name: "Michael Chen",
                  location: "San Francisco, CA",
                  rating: 5,
                  comment: "The attention to detail is remarkable. Every aspect of our stay exceeded expectations."
                },
                {
                  name: "Emma Williams",
                  location: "London, UK",
                  rating: 5,
                  comment: "A true luxury experience. The staff went above and beyond to make our anniversary special."
                }
              ].map((testimonial, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                    <div>
                      <div className="font-semibold text-navy">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-hero text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Book your stay today and discover why Luxe Hotel is the preferred choice for discerning travelers
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/rooms">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground px-8 py-4 text-lg font-semibold">
                  Book Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy px-8 py-4 text-lg font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ReservationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
      />
    </div>
  );
};

export default Index;
