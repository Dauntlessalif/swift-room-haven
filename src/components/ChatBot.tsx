import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

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
      text: "Hello! I'm your Luxe Hotel assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    ]
  };

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (predefinedResponses.greeting.some(word => lowerMessage.includes(word))) {
      return "Hello! Welcome to Luxe Hotel. I'm here to help you with any questions about our rooms, services, or reservations.";
    }

    if (predefinedResponses.booking.some(word => lowerMessage.includes(word))) {
      return "I'd be happy to help you with booking! You can make a reservation by clicking the 'Book Now' button on any of our room pages. Would you like me to tell you about our room types?";
    }

    if (predefinedResponses.pricing.some(word => lowerMessage.includes(word))) {
      return "Our rooms start at $299/night for Standard rooms, $399/night for Deluxe rooms, and $599/night for Suites. All rates include luxury amenities and breakfast.";
    }

    if (predefinedResponses.amenities.some(word => lowerMessage.includes(word))) {
      return "Our amenities include: 24/7 concierge service, luxury spa, fitness center, rooftop pool, fine dining restaurant, complimentary WiFi, and valet parking.";
    }

    if (predefinedResponses.petcare.some(word => lowerMessage.includes(word))) {
      return "We offer comprehensive pet care services! Pet sitting ($25/hour), pet walking ($15/walk), and 24/7 pet safety monitoring. There's a $50 registration fee per stay. Check our Pet Care page for full details.";
    }

    if (predefinedResponses.checkin.some(word => lowerMessage.includes(word))) {
      return "Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out can be arranged based on availability.";
    }

    if (predefinedResponses.location.some(word => lowerMessage.includes(word))) {
      return "We're located in the heart of the city. You can find our exact address and directions on our Contact page.";
    }

    if (predefinedResponses.contact.some(word => lowerMessage.includes(word))) {
      return "You can reach us at +1 (555) 123-4567 or visit our Contact page for more ways to get in touch. Our concierge is available 24/7.";
    }

    return "I'd be happy to help! For specific questions, you can also call our concierge at +1 (555) 123-4567. Is there anything else about our rooms, services, or amenities I can help you with?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-elegant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 h-96 shadow-elegant border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg font-semibold">Hotel Assistant</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
              
              <div
                className={cn(
                  "max-w-[70%] p-3 rounded-lg text-sm",
                  message.isBot
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {message.text}
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
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;