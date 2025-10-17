import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-hotel.jpg";
import { HOTEL_CONFIG } from "@/config/hotelConfig";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/rooms');
  };

  const handleExploreRooms = () => {
    navigate('/rooms');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 gradient-hero opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-gold text-gold" />
          ))}
          <span className="ml-2 text-sm font-medium">5-Star Luxury</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Experience
          <span className="block gradient-gold bg-clip-text text-transparent">
            Luxury Redefined
          </span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Indulge in unparalleled comfort and sophistication at our premier destination hotel
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gold" />
            <span>{HOTEL_CONFIG.location.area}, {HOTEL_CONFIG.location.city}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-gold" />
            <span>24/7 Concierge</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            size="lg" 
            onClick={handleBookNow}
            className="bg-gold hover:bg-gold/90 text-gold-foreground px-8 py-4 text-lg font-semibold shadow-gold transition-smooth"
          >
            Book Your Stay
          </Button>
          <Button 
            size="lg" 
            onClick={handleExploreRooms}
            className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-navy px-8 py-4 text-lg font-semibold shadow-lg transition-smooth"
          >
            Explore Rooms
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;