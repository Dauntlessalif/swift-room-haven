import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Sparkles, Calendar, DollarSign, MapPin, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOTEL_CONFIG, formatPrice } from "@/config/hotelConfig";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! I'm your Luxe Hotel Dhaka assistant. How can I help you today?`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { icon: Sparkles, text: "Room types", query: "What room types do you have?" },
    { icon: DollarSign, text: "Room prices", query: "What are your room prices?" },
    { icon: Calendar, text: "Check-in time", query: "What time is check-in?" },
    { icon: MapPin, text: "Location", query: "Where are you located?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening"
    ],
    booking: [
      "book", "booking", "reservation", "reserve", "room", "availability"
    ],
    pricing: [
      "price", "cost", "rate", "fee", "charge", "expensive", "cheap"
    ],
    amenities: [
      "amenities", "facilities", "services", "wifi", "pool", "gym", "spa"
    ],
    petcare: [
      "pet", "dog", "cat", "animal", "pet care", "pet services"
    ],
    checkin: [
      "check in", "check-in", "checkin", "arrival", "check out", "checkout"
    ],
    location: [
      "location", "address", "where", "directions", "map"
    ],
    contact: [
      "contact", "phone", "email", "call", "reach"
    ],
    parking: [
      "parking", "park", "valet", "car"
    ],
    restaurant: [
      "restaurant", "dining", "food", "breakfast", "lunch", "dinner", "eat"
    ],
    availability: [
      "available", "vacancy", "free", "empty"
    ],
    cancellation: [
      "cancel", "cancellation", "refund", "policy"
    ],
    payment: [
      "payment", "pay", "credit card", "bkash", "nagad", "cash"
    ],
    special: [
      "special", "offer", "discount", "deal", "promotion"
    ],
    roomTypes: [
      "room types", "room type", "types of rooms", "what rooms", "which rooms", "room options"
    ]
  };

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (predefinedResponses.greeting.some(word => lowerMessage.includes(word))) {
      return `Hello! Welcome to Luxe Hotel Dhaka. I'm here to help you with any questions about our rooms, services, or reservations.`;
    }

    if (predefinedResponses.booking.some(word => lowerMessage.includes(word))) {
      return "I'd be happy to help you with booking! We have 9 different room types to choose from. You can make a reservation by clicking the 'Book Now' button on any of our room pages. Would you like me to tell you about our room types?";
    }

    if (predefinedResponses.pricing.some(word => lowerMessage.includes(word))) {
      return `Our rooms range from ${formatPrice(HOTEL_CONFIG.rooms.standard.price)}/night for Standard rooms up to ${formatPrice(HOTEL_CONFIG.rooms.honeymoonSuite.price)}/night for our luxurious Honeymoon Suite. We also offer Superior (${formatPrice(HOTEL_CONFIG.rooms.superior.price)}), Deluxe (${formatPrice(HOTEL_CONFIG.rooms.deluxe.price)}), Premium Deluxe (${formatPrice(HOTEL_CONFIG.rooms.premiumDeluxe.price)}), Junior Suite (${formatPrice(HOTEL_CONFIG.rooms.juniorSuite.price)}), Executive Suite (${formatPrice(HOTEL_CONFIG.rooms.executiveSuite.price)}), Family Suite (${formatPrice(HOTEL_CONFIG.rooms.familySuite.price)}), and Presidential Suite (${formatPrice(HOTEL_CONFIG.rooms.suite.price)}). All rates include luxury amenities and breakfast.`;
    }

    if (predefinedResponses.amenities.some(word => lowerMessage.includes(word))) {
      return "Our amenities include: 24/7 concierge service, luxury spa, fitness center, rooftop pool, fine dining restaurant, complimentary WiFi, and valet parking.";
    }

    if (predefinedResponses.petcare.some(word => lowerMessage.includes(word))) {
      return `We offer comprehensive pet care services! Pet sitting (${formatPrice(HOTEL_CONFIG.services.petSitting.price)}/hour), pet walking (${formatPrice(HOTEL_CONFIG.services.petWalking.price)}/walk), and 24/7 pet safety monitoring. There's a ${formatPrice(HOTEL_CONFIG.services.petRegistration.price)} registration fee per stay. Check our Pet Care page for full details.`;
    }

    if (predefinedResponses.checkin.some(word => lowerMessage.includes(word))) {
      return `Check-in is at 3:00 PM ${HOTEL_CONFIG.timezone.abbreviation} and check-out is at 11:00 AM ${HOTEL_CONFIG.timezone.abbreviation}. Early check-in and late check-out can be arranged based on availability.`;
    }

    if (predefinedResponses.location.some(word => lowerMessage.includes(word))) {
      return `We're located in ${HOTEL_CONFIG.location.area}, ${HOTEL_CONFIG.location.city}, ${HOTEL_CONFIG.location.country}. Our address is: ${HOTEL_CONFIG.location.address}. We're just ${HOTEL_CONFIG.location.airportDistance} from Hazrat Shahjalal International Airport.`;
    }

    if (predefinedResponses.contact.some(word => lowerMessage.includes(word))) {
      return `You can reach us at ${HOTEL_CONFIG.contact.phone} or email us at ${HOTEL_CONFIG.contact.email}. Visit our Contact page for more ways to get in touch. Our concierge is available 24/7.`;
    }

    if (predefinedResponses.parking.some(word => lowerMessage.includes(word))) {
      return `We offer both valet parking (${formatPrice(HOTEL_CONFIG.services.valetParking.price)}/day) and self-parking (${formatPrice(HOTEL_CONFIG.services.selfParking.price)}/day). Valet service is available 24/7 at the main entrance.`;
    }

    if (predefinedResponses.restaurant.some(word => lowerMessage.includes(word))) {
      return `Our fine dining restaurant serves international cuisine daily from 6:00 AM to 11:00 PM ${HOTEL_CONFIG.timezone.abbreviation}. Complimentary breakfast is included with all room bookings. Room service is available 24/7.`;
    }

    if (predefinedResponses.availability.some(word => lowerMessage.includes(word))) {
      const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      return `We currently have rooms available! As of ${today}, we have Standard, Deluxe, and Suite options. Visit our Rooms page to check real-time availability and make a reservation.`;
    }

    if (predefinedResponses.cancellation.some(word => lowerMessage.includes(word))) {
      return `Our cancellation policy allows free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge. Special rates may have different policies.`;
    }

    if (predefinedResponses.payment.some(word => lowerMessage.includes(word))) {
      return `We accept all major credit cards, debit cards, and cash in BDT. Popular mobile payment methods like bKash and Nagad are also accepted. Payment can be made at check-in or during booking.`;
    }

    if (predefinedResponses.special.some(word => lowerMessage.includes(word))) {
      return `We offer special rates for extended stays (7+ nights) and corporate bookings. Wedding and event packages are also available. Contact us at ${HOTEL_CONFIG.contact.phone} for personalized offers!`;
    }

    if (predefinedResponses.roomTypes.some(word => lowerMessage.includes(word))) {
      return `We have 9 room types: 1) Standard Room - Comfortable & affordable (${formatPrice(HOTEL_CONFIG.rooms.standard.price)}), 2) Superior Room - Enhanced comfort (${formatPrice(HOTEL_CONFIG.rooms.superior.price)}), 3) Deluxe Room - Spacious elegance (${formatPrice(HOTEL_CONFIG.rooms.deluxe.price)}), 4) Premium Deluxe - Upgraded luxury (${formatPrice(HOTEL_CONFIG.rooms.premiumDeluxe.price)}), 5) Junior Suite - Compact suite (${formatPrice(HOTEL_CONFIG.rooms.juniorSuite.price)}), 6) Executive Suite - Business-class (${formatPrice(HOTEL_CONFIG.rooms.executiveSuite.price)}), 7) Family Suite - For families (${formatPrice(HOTEL_CONFIG.rooms.familySuite.price)}), 8) Presidential Suite - Ultimate luxury (${formatPrice(HOTEL_CONFIG.rooms.suite.price)}), 9) Honeymoon Suite - Romantic retreat (${formatPrice(HOTEL_CONFIG.rooms.honeymoonSuite.price)}). Visit our Rooms page to see photos and details!`;
    }

    return `I'd be happy to help! For specific questions, you can also call our concierge at ${HOTEL_CONFIG.contact.phone}. Is there anything else about our rooms, services, or amenities I can help you with?`;
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(textToSend),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (query: string) => {
    handleSendMessage(query);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        text: `Hello! I'm your Luxe Hotel Dhaka assistant. How can I help you today?`,
        isBot: true,
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 group">
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-elegant hover:shadow-2xl transition-all duration-300 group-hover:scale-110"
        >
          <MessageCircle className="h-7 w-7 animate-pulse" />
        </Button>
        <Badge className="absolute -top-2 -right-2 bg-gold text-gold-foreground animate-bounce">
          AI
        </Badge>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-96 flex flex-col shadow-elegant border-border/50" style={{ height: '500px', maxHeight: '80vh' }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Hotel Assistant</CardTitle>
            <p className="text-xs text-primary-foreground/80">Online • Instant replies</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            title="Clear chat"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {/* Suggested Questions */}
          {showSuggestions && messages.length === 1 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs text-muted-foreground font-medium">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedQuestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion.query)}
                    className="h-auto py-2 px-3 flex flex-col items-start text-left hover:bg-primary/10 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <suggestion.icon className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium">{suggestion.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-2",
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              {message.isBot && (
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div className="flex flex-col">
                <div
                  className={cn(
                    "max-w-[70%] p-3 rounded-lg text-sm",
                    message.isBot
                      ? "bg-muted text-foreground rounded-bl-none"
                      : "bg-primary text-primary-foreground rounded-br-none"
                  )}
                >
                  {message.text}
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-1">
                  {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {!message.isBot && (
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted text-foreground p-3 rounded-lg text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 h-10"
            />
            <Button
              onClick={() => handleSendMessage()}
              size="icon"
              disabled={!inputValue.trim()}
              className="h-10 w-10 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Available 24/7 • Powered by Luxe Hotel AI
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;