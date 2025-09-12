import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock, MapPin, Star, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-gold" />,
      title: "5-Star Excellence",
      description: "Recognized for outstanding service and luxury accommodations by leading hospitality awards."
    },
    {
      icon: <Users className="h-8 w-8 text-gold" />,
      title: "24/7 Concierge",
      description: "Our dedicated concierge team is available around the clock to cater to your every need."
    },
    {
      icon: <Clock className="h-8 w-8 text-gold" />,
      title: "Heritage Since 1985",
      description: "Four decades of hospitality excellence, serving discerning guests from around the world."
    },
    {
      icon: <MapPin className="h-8 w-8 text-gold" />,
      title: "Prime Location",
      description: "Located in the heart of the city with easy access to business districts and attractions."
    },
    {
      icon: <Star className="h-8 w-8 text-gold" />,
      title: "Luxury Amenities",
      description: "World-class spa, fine dining restaurants, and premium facilities for an unforgettable stay."
    },
    {
      icon: <Shield className="h-8 w-8 text-gold" />,
      title: "Safety First",
      description: "Advanced security systems and health protocols ensure your safety and peace of mind."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 gradient-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              About Luxe Hotel
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Where elegance meets exceptional service, creating unforgettable experiences
              for discerning travelers from around the globe.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 1985, Luxe Hotel has been a beacon of luxury and sophistication 
                    in the heart of the city. What began as a vision to create an extraordinary 
                    hospitality experience has evolved into a world-renowned destination.
                  </p>
                  <p>
                    Our commitment to excellence is reflected in every detail, from our 
                    meticulously designed interiors to our personalized service that 
                    anticipates your every need. We believe that luxury is not just about 
                    amenities, but about creating moments that last a lifetime.
                  </p>
                  <p>
                    Today, we continue to set new standards in hospitality, combining 
                    timeless elegance with modern innovation to provide our guests with 
                    an unparalleled experience.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-navy/5 rounded-2xl p-8 shadow-card">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-navy mb-2">150+</div>
                      <div className="text-sm text-muted-foreground">Luxury Rooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-navy mb-2">40</div>
                      <div className="text-sm text-muted-foreground">Years of Excellence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-navy mb-2">500K+</div>
                      <div className="text-sm text-muted-foreground">Happy Guests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-navy mb-2">24/7</div>
                      <div className="text-sm text-muted-foreground">Concierge Service</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">Why Choose Luxe Hotel</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the difference that true luxury hospitality makes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-card transition-smooth">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-navy mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-navy mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              To provide extraordinary hospitality experiences that exceed expectations, 
              creating lasting memories through impeccable service, luxurious accommodations, 
              and genuine care for every guest.
            </p>
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-8">
              <p className="text-lg font-medium text-navy">
                "Excellence is not a destination; it is a continuous journey that never ends."
              </p>
              <p className="text-muted-foreground mt-2">- Our Founding Philosophy</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;