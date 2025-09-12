import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock, Phone } from "lucide-react";

const PetCare = () => {
  const services = [
    {
      icon: Heart,
      title: "Pet Sitting",
      description: "Professional pet sitting services in your room or our designated pet areas.",
      price: "$25/hour"
    },
    {
      icon: Shield,
      title: "Pet Safety",
      description: "24/7 pet monitoring and safety measures throughout your stay.",
      price: "Included"
    },
    {
      icon: Clock,
      title: "Pet Walking",
      description: "Regular walking services for your furry companions.",
      price: "$15/walk"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-gold bg-clip-text text-transparent">
            Pet Care Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your beloved pets deserve the same luxury treatment you do. Our comprehensive pet care services ensure your furry friends are comfortable and happy during your stay.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Pet Services</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-primary font-semibold">{service.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pet Policy */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Pet Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Allowed Pets</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Dogs up to 50 lbs</li>
                    <li>• Cats (all sizes)</li>
                    <li>• Small caged animals</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Current vaccination records</li>
                    <li>• Pet registration fee: $50/stay</li>
                    <li>• Maximum 2 pets per room</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Need Pet Care Services?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our pet care specialists to arrange services for your beloved companions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span>Pet Care Hotline: +1 (555) 123-PETS</span>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Book Pet Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetCare;