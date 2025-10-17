import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Heart, Shield, Clock, Phone, CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { petCareApi } from "@/lib/api";
import { HOTEL_CONFIG, formatPrice } from "@/config/hotelConfig";

const PetCare = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    petType: "",
    petName: "",
    petWeight: "",
    petAge: "",
    serviceType: "",
    specialRequirements: "",
  });
  const { toast } = useToast();

  const services = [
    {
      icon: Heart,
      title: "Pet Sitting",
      description: "Professional pet sitting services in your room or our designated pet areas.",
      price: `${formatPrice(HOTEL_CONFIG.services.petSitting.price)}/hour`
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
      price: `${formatPrice(HOTEL_CONFIG.services.petWalking.price)}/walk`
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast({
        title: "Missing Dates",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    if (startDate >= endDate) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await petCareApi.createRequest({
        guest_name: formData.guestName,
        email: formData.email,
        phone: formData.phone,
        pet_type: formData.petType,
        pet_name: formData.petName,
        pet_weight: formData.petWeight ? parseFloat(formData.petWeight) : null,
        pet_age: formData.petAge ? parseInt(formData.petAge) : null,
        service_type: formData.serviceType as 'sitting' | 'walking' | 'grooming' | 'daycare' | 'overnight',
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
        special_requirements: formData.specialRequirements || null,
      });

      toast({
        title: "Request Submitted!",
        description: "Your pet care request has been submitted. We'll contact you shortly.",
      });

      // Reset form
      setFormData({
        guestName: "",
        email: "",
        phone: "",
        petType: "",
        petName: "",
        petWeight: "",
        petAge: "",
        serviceType: "",
        specialRequirements: "",
      });
      setStartDate(undefined);
      setEndDate(undefined);
    } catch (error) {
      console.error('Pet care request error:', error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                    <li>• Pet registration fee: {formatPrice(HOTEL_CONFIG.services.petRegistration.price)}/stay</li>
                    <li>• Maximum 2 pets per room</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pet Care Request Form */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Request Pet Care Services</CardTitle>
              <CardDescription className="text-center">Fill out the form below to request pet care services during your stay</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Guest Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Guest Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestName">Full Name</Label>
                      <Input
                        id="guestName"
                        required
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Pet Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pet Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="petName">Pet Name</Label>
                      <Input
                        id="petName"
                        required
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="petType">Pet Type</Label>
                      <Input
                        id="petType"
                        required
                        placeholder="e.g., Dog, Cat"
                        value={formData.petType}
                        onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="petWeight">Weight (lbs)</Label>
                      <Input
                        id="petWeight"
                        type="number"
                        step="0.1"
                        placeholder="Optional"
                        value={formData.petWeight}
                        onChange={(e) => setFormData({ ...formData, petWeight: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="petAge">Age (years)</Label>
                      <Input
                        id="petAge"
                        type="number"
                        placeholder="Optional"
                        value={formData.petAge}
                        onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Service Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select
                        required
                        value={formData.serviceType}
                        onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sitting">Pet Sitting</SelectItem>
                          <SelectItem value="walking">Pet Walking</SelectItem>
                          <SelectItem value="grooming">Pet Grooming</SelectItem>
                          <SelectItem value="daycare">Pet Daycare</SelectItem>
                          <SelectItem value="overnight">Overnight Care</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            disabled={(date) => date <= (startDate || new Date())}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      rows={4}
                      placeholder="Any special needs, dietary requirements, medications, or behavioral notes..."
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span>Pet Care Hotline: +1 (555) 123-PETS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetCare;