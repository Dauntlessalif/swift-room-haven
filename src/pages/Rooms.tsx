import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import RoomCard from "@/components/RoomCard";
import ReservationModal from "@/components/ReservationModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { Room } from "@/data/rooms";
import { roomsApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Rooms = () => {
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRooms();
  }, []);

  // Check for pending booking after user logs in
  useEffect(() => {
    if (user) {
      const pendingBookingStr = sessionStorage.getItem('pendingBooking');
      if (pendingBookingStr) {
        try {
          const pendingRoom = JSON.parse(pendingBookingStr);
          sessionStorage.removeItem('pendingBooking');
          setSelectedRoom(pendingRoom);
          setIsModalOpen(true);
          toast({
            title: "Welcome back!",
            description: "Let's complete your booking.",
          });
        } catch (error) {
          console.error('Error parsing pending booking:', error);
        }
      }
    }
  }, [user, toast]);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const data = await roomsApi.getAllRooms();
      // Map database rooms to Room type
      const mappedRooms: Room[] = (data as any[]).map((dbRoom) => ({
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
    // Check if user is authenticated
    if (!user) {
      // Store the selected room for after login
      setSelectedRoom(room);
      sessionStorage.setItem('pendingBooking', JSON.stringify(room));
      
      // Show auth modal
      setShowAuthModal(true);
      
      toast({
        title: "Sign In Required",
        description: "Please sign in to book a room. You'll be able to complete your booking after signing in.",
        variant: "default",
      });
      return;
    }
    
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 gradient-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Luxury Accommodations
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose from our carefully curated selection of premium rooms and suites,
              each designed to provide the ultimate in comfort and elegance.
            </p>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-navy" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onBook={handleBookRoom}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">
                Every Room Includes
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl mb-2">🛏️</div>
                <h3 className="font-semibold text-navy">Premium Bedding</h3>
                <p className="text-sm text-muted-foreground">Egyptian cotton linens</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📶</div>
                <h3 className="font-semibold text-navy">Free Wi-Fi</h3>
                <p className="text-sm text-muted-foreground">High-speed internet</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🍃</div>
                <h3 className="font-semibold text-navy">Climate Control</h3>
                <p className="text-sm text-muted-foreground">Individual AC/heating</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🛁</div>
                <h3 className="font-semibold text-navy">Luxury Bath</h3>
                <p className="text-sm text-muted-foreground">Premium amenities</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
      />

      {/* Auth Modal - Shows when user tries to book without being logged in */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="signin"
      />
    </div>
  );
};

export default Rooms;