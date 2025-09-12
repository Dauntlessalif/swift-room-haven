import { useState } from "react";
import Navigation from "@/components/Navigation";
import RoomCard from "@/components/RoomCard";
import ReservationModal from "@/components/ReservationModal";
import { rooms, Room } from "@/data/rooms";

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookRoom = (room: Room) => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBook={handleBookRoom}
                />
              ))}
            </div>
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

      <ReservationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
      />
    </div>
  );
};

export default Rooms;