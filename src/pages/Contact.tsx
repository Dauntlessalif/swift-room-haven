import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { contactMessagesApi } from "@/lib/api";
import { HOTEL_CONFIG } from "@/config/hotelConfig";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await contactMessagesApi.createMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message,
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-gold" />,
      title: "Address",
      details: [
        HOTEL_CONFIG.location.address,
        `${HOTEL_CONFIG.location.area}, ${HOTEL_CONFIG.location.city}`,
        HOTEL_CONFIG.location.country
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-gold" />,
      title: "Phone",
      details: [
        `Reservations: ${HOTEL_CONFIG.contact.phone}`,
        `Concierge: ${HOTEL_CONFIG.contact.phone}`,
        `Emergency: ${HOTEL_CONFIG.contact.phone}`
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-gold" />,
      title: "Email",
      details: [
        HOTEL_CONFIG.contact.email,
        "concierge@luxehoteldhaka.com",
        "reservations@luxehoteldhaka.com"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-gold" />,
      title: "Hours",
      details: [
        "Front Desk: 24/7",
        "Concierge: 24/7",
        `Restaurant: 6 AM - 11 PM (${HOTEL_CONFIG.timezone.abbreviation})`
      ]
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
              Contact Luxe Hotel
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're here to assist you with reservations, inquiries, and making your stay exceptional
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-card transition-smooth">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-navy mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-navy flex items-center">
                    <Send className="mr-2 h-6 w-6 text-gold" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we assist you today?"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-navy hover:bg-navy-light text-white" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-card">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-navy/5 to-gold/5 h-full min-h-[500px] rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-gold mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-navy mb-2">Find Us</h3>
                      <p className="text-muted-foreground">
                        Located in the heart of downtown,<br />
                        easily accessible by all major transportation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-12 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">24/7 Emergency Support</h2>
            <p className="text-lg mb-6">
              For urgent matters or emergency assistance, our team is available around the clock
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gold" />
                <span className="font-semibold">Emergency: +1 (555) 911-LUXE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gold" />
                <span className="font-semibold">emergency@luxehotel.com</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;