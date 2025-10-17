import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Sparkles, Calendar, DollarSign, MapPin, RefreshCw, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOTEL_CONFIG, formatPrice } from "@/config/hotelConfig";
import { roomsApi, bookingsApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action: string;
  icon?: any;
}

interface ConversationContext {
  lastTopic?: string;
  mentionedRooms?: number[];
  userIntent?: string;
  previousQuestions?: string[];
}

const ChatBot = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! I'm your Luxe Hotel Dhaka AI assistant. 🏨✨\n\nI can help you with:\n• Finding the perfect room\n• Checking real-time availability\n• Booking assistance\n• Hotel information & amenities\n• Pet care services\n• And much more!\n\nWhat would you like to know?`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [context, setContext] = useState<ConversationContext>({});
  const [isLoadingData, setIsLoadingData] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { icon: Sparkles, text: "Available rooms", query: "Show me available rooms right now" },
    { icon: DollarSign, text: "Best deals", query: "What are your best room deals?" },
    { icon: Calendar, text: "Book a room", query: "I want to book a room" },
    { icon: MapPin, text: "Hotel amenities", query: "What amenities do you offer?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Advanced intent detection with scoring
  const detectIntent = (message: string): { intent: string; confidence: number; entities: any } => {
    const lowerMessage = message.toLowerCase();
    const intents = {
      greeting: { keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"], score: 0 },
      availabilityCheck: { keywords: ["available", "availability", "free", "vacant", "vacancy", "can i book", "check availability", "available rooms"], score: 0 },
      booking: { keywords: ["book", "booking", "reservation", "reserve", "make a reservation", "i want to book"], score: 0 },
      roomInfo: { keywords: ["room", "rooms", "room type", "types of rooms", "what rooms", "show me rooms"], score: 0 },
      pricing: { keywords: ["price", "cost", "rate", "fee", "charge", "expensive", "cheap", "how much", "pricing"], score: 0 },
      bestDeal: { keywords: ["best deal", "cheapest", "affordable", "budget", "discount", "offer", "promotion", "special"], score: 0 },
      comparison: { keywords: ["compare", "difference", "versus", "vs", "better", "which room"], score: 0 },
      amenities: { keywords: ["amenities", "facilities", "services", "features", "what do you have", "what's included"], score: 0 },
      petCare: { keywords: ["pet", "dog", "cat", "animal", "pet care", "pet friendly", "bring my pet"], score: 0 },
      checkInOut: { keywords: ["check in", "check-in", "checkin", "check out", "checkout", "arrival", "departure"], score: 0 },
      location: { keywords: ["location", "address", "where", "directions", "how to get", "map", "find you"], score: 0 },
      contact: { keywords: ["contact", "phone", "email", "call", "reach", "speak to someone"], score: 0 },
      parking: { keywords: ["parking", "park", "valet", "car", "vehicle"], score: 0 },
      dining: { keywords: ["restaurant", "dining", "food", "breakfast", "lunch", "dinner", "eat", "meal"], score: 0 },
      wifi: { keywords: ["wifi", "wi-fi", "internet", "network", "connection", "online"], score: 0 },
      cancellation: { keywords: ["cancel", "cancellation", "refund", "policy", "change booking"], score: 0 },
      payment: { keywords: ["payment", "pay", "credit card", "bkash", "nagad", "cash", "how to pay"], score: 0 },
      events: { keywords: ["event", "wedding", "conference", "meeting", "party", "celebration"], score: 0 },
      myBookings: { keywords: ["my booking", "my reservation", "my account", "view booking"], score: 0 },
      help: { keywords: ["help", "assist", "support", "guide", "confused", "don't understand"], score: 0 },
    };

    // Calculate scores based on keyword matches
    Object.keys(intents).forEach(intent => {
      intents[intent as keyof typeof intents].score = intents[intent as keyof typeof intents].keywords.filter(
        keyword => lowerMessage.includes(keyword)
      ).length;
    });

    // Find the intent with the highest score
    const topIntent = Object.entries(intents).reduce((a, b) => 
      a[1].score > b[1].score ? a : b
    );

    // Extract entities (dates, numbers, room types)
    const entities = {
      hasDate: /\d{1,2}[/-]\d{1,2}|tomorrow|today|next week|this weekend/.test(lowerMessage),
      guestCount: lowerMessage.match(/(\d+)\s*(guest|person|people)/)?.[1],
      roomType: Object.keys(HOTEL_CONFIG.rooms).find(room => 
        lowerMessage.includes(room.toLowerCase().replace(/([A-Z])/g, ' $1').trim())
      ),
    };

    return {
      intent: topIntent[0],
      confidence: topIntent[1].score,
      entities,
    };
  };

  // Generate smart response based on intent and context
  const getSmartResponse = async (message: string): Promise<{ text: string; actions?: QuickAction[] }> => {
    const { intent, confidence, entities } = detectIntent(message);
    const lowerMessage = message.toLowerCase();

    // Update context
    setContext(prev => ({
      ...prev,
      lastTopic: intent,
      userIntent: intent,
      previousQuestions: [...(prev.previousQuestions || []), message].slice(-5),
    }));

    // GREETING
    if (intent === "greeting") {
      const greetings = [
        `Hello! ${user ? `Welcome back, ${user.user_metadata?.first_name || 'valued guest'}!` : 'Welcome to Luxe Hotel Dhaka!'} 🌟 How may I assist you today?`,
        `Hi there! ${user ? `Great to see you again!` : 'Welcome!'} I'm here to help you find the perfect accommodation. What can I do for you?`,
      ];
      return {
        text: greetings[Math.floor(Math.random() * greetings.length)],
        actions: [
          { label: "Browse Rooms", action: "rooms" },
          { label: "Check Availability", action: "availability" },
          { label: "View My Bookings", action: user ? "mybookings" : "login" },
        ],
      };
    }

    // AVAILABILITY CHECK - Real-time database query
    if (intent === "availabilityCheck" || lowerMessage.includes("available now") || lowerMessage.includes("right now")) {
      setIsLoadingData(true);
      try {
        const rooms = await roomsApi.getAllRooms();
        if (!rooms || rooms.length === 0) {
          return {
            text: "I'm having trouble loading room data. Please try again in a moment or contact us directly.",
            actions: [{ label: "Contact Us", action: "contact" }],
          };
        }

        const availableRooms = rooms.filter((room: any) => room.available);
        
        if (availableRooms.length === 0) {
          return {
            text: "I'm sorry, but all our rooms are currently booked. However, we have upcoming availability! Would you like me to check specific dates for you?",
            actions: [
              { label: "Contact for Dates", action: "contact" },
              { label: "View All Rooms", action: "rooms" },
            ],
          };
        }

        const roomList = availableRooms.slice(0, 5).map((room: any) => 
          `• **${room.name}** - ${formatPrice(room.price)}/night (${room.capacity} guests)`
        ).join('\n');

        return {
          text: `🎉 Great news! We currently have **${availableRooms.length} rooms available**:\n\n${roomList}\n\n${availableRooms.length > 5 ? `...and ${availableRooms.length - 5} more!` : ''}\n\nWould you like to book one of these rooms?`,
          actions: [
            { label: "Book Now", action: "rooms" },
            { label: "Compare Rooms", action: "compare" },
            { label: "See Amenities", action: "amenities" },
          ],
        };
      } catch (error) {
        console.error("Error fetching rooms:", error);
        return {
          text: "I'm having trouble checking availability right now. Please try again in a moment or call us directly for assistance.",
          actions: [{ label: "Contact Us", action: "contact" }],
        };
      } finally {
        setIsLoadingData(false);
      }
    }

    // BOOKING ASSISTANCE
    if (intent === "booking") {
      if (!user) {
        return {
          text: "I'd love to help you book a room! 🏨\n\nTo make a reservation, you'll need to sign in or create an account first. This ensures your booking is secure and allows you to manage it later.\n\nOnce you're signed in, booking is super easy - just select your dates and room!",
          actions: [
            { label: "Sign In", action: "login" },
            { label: "View Rooms First", action: "rooms" },
          ],
        };
      }

      return {
        text: `Perfect! Let me help you book a room. 📅\n\nWe have 9 luxurious room types available. I can help you:\n\n• Find rooms for specific dates\n• Compare different room types\n• Check current availability\n• Learn about special offers\n\nWhat dates are you looking to stay with us?`,
        actions: [
          { label: "Browse All Rooms", action: "rooms" },
          { label: "Check Availability", action: "availability" },
          { label: "See Best Deals", action: "deals" },
        ],
      };
    }

    // ROOM INFORMATION
    if (intent === "roomInfo") {
      return {
        text: `We offer **9 exceptional room types** at Luxe Hotel Dhaka:\n\n💎 **Value Options:**\n• Standard Room - ${formatPrice(HOTEL_CONFIG.rooms.standard.price)}/night\n• Superior Room - ${formatPrice(HOTEL_CONFIG.rooms.superior.price)}/night\n\n🌟 **Deluxe Options:**\n• Deluxe Room - ${formatPrice(HOTEL_CONFIG.rooms.deluxe.price)}/night\n• Premium Deluxe - ${formatPrice(HOTEL_CONFIG.rooms.premiumDeluxe.price)}/night\n\n👑 **Suite Collection:**\n• Junior Suite - ${formatPrice(HOTEL_CONFIG.rooms.juniorSuite.price)}/night\n• Executive Suite - ${formatPrice(HOTEL_CONFIG.rooms.executiveSuite.price)}/night\n• Family Suite - ${formatPrice(HOTEL_CONFIG.rooms.familySuite.price)}/night\n• Presidential Suite - ${formatPrice(HOTEL_CONFIG.rooms.suite.price)}/night\n• Honeymoon Suite - ${formatPrice(HOTEL_CONFIG.rooms.honeymoonSuite.price)}/night\n\nAll rooms include complimentary WiFi, breakfast, and access to all amenities!`,
        actions: [
          { label: "View Photos", action: "rooms" },
          { label: "Check Availability", action: "availability" },
          { label: "Compare Suites", action: "compare" },
        ],
      };
    }

    // PRICING & BEST DEALS
    if (intent === "pricing" || intent === "bestDeal") {
      return {
        text: `💰 **Best Value Rooms:**\n\n🏆 **Standard Room** - ${formatPrice(HOTEL_CONFIG.rooms.standard.price)}/night\nPerfect for solo travelers or couples\n\n🌟 **Superior Room** - ${formatPrice(HOTEL_CONFIG.rooms.superior.price)}/night\nEnhanced comfort with premium amenities\n\n✨ **Special Offers:**\n• Book 3+ nights: 10% discount\n• Book 7+ nights: 20% discount\n• Early bird (30+ days ahead): 15% off\n• Use code **LUXE2025** for 5% off your first booking!\n\n${user ? 'As a member, you may qualify for additional discounts!' : 'Sign up now to unlock exclusive member deals!'}`,
        actions: [
          { label: "View All Rooms", action: "rooms" },
          { label: "Book Standard", action: "rooms" },
          { label: user ? "My Account" : "Sign Up", action: user ? "customer" : "login" },
        ],
      };
    }

    // AMENITIES
    if (intent === "amenities") {
      return {
        text: `🏨 **Luxe Hotel Dhaka Amenities:**\n\n🌊 **Wellness & Recreation:**\n• Rooftop infinity pool (6 AM - 10 PM)\n• Full-service spa & massage\n• State-of-the-art fitness center\n• Yoga & meditation studio\n\n🍽️ **Dining:**\n• Fine dining restaurant\n• Rooftop bar with city views\n• 24/7 room service\n• Complimentary breakfast buffet\n\n💼 **Business:**\n• Business center (1 Gbps WiFi)\n• Meeting rooms\n• Conference facilities\n\n🚗 **Services:**\n• Valet parking\n• Airport shuttle\n• 24/7 concierge\n• Laundry service\n• Pet care services\n\nEverything you need for a perfect stay!`,
        actions: [
          { label: "View Pool & Spa", action: "wellness" },
          { label: "Dining Options", action: "dining" },
          { label: "Book Room", action: "rooms" },
        ],
      };
    }

    // PET CARE
    if (intent === "petCare") {
      return {
        text: `🐾 **We're Pet-Friendly!**\n\nYour furry friends are welcome at Luxe Hotel Dhaka!\n\n**Pet Care Services:**\n• Pet Sitting - ${formatPrice(HOTEL_CONFIG.services.petSitting.price)}/hour\n• Pet Walking - ${formatPrice(HOTEL_CONFIG.services.petWalking.price)}/walk\n• 24/7 Pet Safety Monitoring\n• Pet Menu Available\n• Dedicated Pet Area\n\n**Requirements:**\n• Registration fee: ${formatPrice(HOTEL_CONFIG.services.petRegistration.price)} per stay\n• Updated vaccination records\n• Maximum 2 pets per room\n• Weight limit: 50 lbs each\n\nBook with confidence knowing your pets will be pampered!`,
        actions: [
          { label: "Learn More", action: "petcare" },
          { label: "Book Pet-Friendly Room", action: "rooms" },
          { label: "Contact Pet Care", action: "contact" },
        ],
      };
    }

    // CHECK-IN/OUT
    if (intent === "checkInOut") {
      return {
        text: `⏰ **Check-In & Check-Out Times:**\n\n📥 **Check-In:** 3:00 PM ${HOTEL_CONFIG.timezone.abbreviation}\n📤 **Check-Out:** 11:00 AM ${HOTEL_CONFIG.timezone.abbreviation}\n\n**Flexible Options:**\n• Early check-in available (subject to availability)\n• Late check-out available (additional fee may apply)\n• Express check-in/out for members\n• 24/7 front desk service\n\n**What to Bring:**\n• Valid photo ID\n• Payment method\n• Booking confirmation\n\nNeed to arrange special timing? Just let us know!`,
        actions: [
          { label: "Book Now", action: "rooms" },
          { label: "Contact Front Desk", action: "contact" },
        ],
      };
    }

    // LOCATION
    if (intent === "location") {
      return {
        text: `📍 **Luxe Hotel Dhaka Location:**\n\n**Address:**\n${HOTEL_CONFIG.location.address}\n\n**Neighborhood:**\n${HOTEL_CONFIG.location.area} - Dhaka's premium diplomatic zone\n\n**Nearby Areas:**\n• ${HOTEL_CONFIG.location.nearbyAreas.join('\n• ')}\n\n✈️ **Airport:** ${HOTEL_CONFIG.location.airportDistance} from ${HOTEL_CONFIG.airport.name} (${HOTEL_CONFIG.airport.code})\n\n🚗 **Transportation:**\n• Airport shuttle available\n• Valet parking on-site\n• Easy access to major roads\n\nWe're in the heart of Dhaka's most prestigious area!`,
        actions: [
          { label: "Get Directions", action: "contact" },
          { label: "Book Shuttle", action: "contact" },
          { label: "View on Map", action: "contact" },
        ],
      };
    }

    // CONTACT
    if (intent === "contact") {
      return {
        text: `📞 **Contact Luxe Hotel Dhaka:**\n\n**Phone:** ${HOTEL_CONFIG.contact.phone}\n**Email:** ${HOTEL_CONFIG.contact.email}\n**Events:** ${HOTEL_CONFIG.contact.eventsEmail}\n\n**Hours:** ${HOTEL_CONFIG.contact.hours}\n\n**Location:**\n${HOTEL_CONFIG.location.address}\n\n**Quick Actions:**\n• Call us for immediate assistance\n• Email for detailed inquiries\n• Visit our Contact page for more options\n\nOur team is always ready to help!`,
        actions: [
          { label: "Visit Contact Page", action: "contact" },
          { label: "Book Now", action: "rooms" },
        ],
      };
    }

    // PARKING
    if (intent === "parking") {
      return {
        text: `🚗 **Parking at Luxe Hotel:**\n\n**Valet Parking:** ${formatPrice(HOTEL_CONFIG.services.valetParking.price)}/day\n• 24/7 service\n• Covered parking\n• Priority service\n\n**Self-Parking:** ${formatPrice(HOTEL_CONFIG.services.selfParking.price)}/day\n• Secure facility\n• 24/7 access\n• CCTV monitored\n\n**Special Features:**\n• EV charging stations available\n• Car wash service (+${formatPrice(2000)})\n• FREE for Presidential Suite guests!\n\nYour vehicle is safe with us!`,
        actions: [
          { label: "Book Room", action: "rooms" },
          { label: "Contact Valet", action: "contact" },
        ],
      };
    }

    // DINING
    if (intent === "dining") {
      return {
        text: `🍽️ **Dining at Luxe Hotel:**\n\n**Main Restaurant:**\n• International cuisine\n• Open: 6:00 AM - 11:00 PM ${HOTEL_CONFIG.timezone.abbreviation}\n• Complimentary breakfast buffet\n• À la carte lunch & dinner\n\n**Rooftop Bar:**\n• Signature cocktails\n• Panoramic city views\n• Live music on weekends\n• Open: 5:00 PM - 1:00 AM\n\n**Room Service:**\n• 24/7 availability\n• Full menu\n• In-room dining setup\n\n**Special Dietary:**\n• Vegetarian options\n• Halal certified\n• Allergy-friendly menus\n\nExceptional dining experiences await you!`,
        actions: [
          { label: "View Menu", action: "contact" },
          { label: "Book Room", action: "rooms" },
          { label: "Reserve Table", action: "contact" },
        ],
      };
    }

    // WIFI
    if (intent === "wifi") {
      return {
        text: `📶 **WiFi & Internet:**\n\n**Network:** Luxe_Hotel_Guest\n**Speed:** Up to 100 Mbps\n**Coverage:** All rooms & public areas\n**Cost:** FREE for all guests\n\n**How to Connect:**\n1. Connect to "Luxe_Hotel_Guest"\n2. Open your browser\n3. Enter your room number\n4. Accept terms\n\n**Business Center:**\n• 1 Gbps fiber connection\n• Computers available\n• Printing services\n• Meeting rooms with video conferencing\n\nStay connected throughout your stay!`,
        actions: [
          { label: "Book Room", action: "rooms" },
        ],
      };
    }

    // CANCELLATION
    if (intent === "cancellation") {
      return {
        text: `📋 **Cancellation Policy:**\n\n✅ **Free Cancellation:**\n• Up to 48 hours before check-in\n• Full refund processed within 5-7 business days\n\n⚠️ **Late Cancellation:**\n• Within 48 hours: One night charged\n• No-show: Full booking charged\n\n**How to Cancel:**\n${user ? '• Visit "My Bookings" in your account\n• Click "Cancel Booking"\n• Confirm cancellation' : '• Sign in to your account\n• Go to My Bookings\n• Select booking to cancel'}\n\n**Need to modify instead?**\nContact us - we'll try to accommodate changes!`,
        actions: [
          { label: user ? "My Bookings" : "Sign In", action: user ? "mybookings" : "login" },
          { label: "Contact Us", action: "contact" },
        ],
      };
    }

    // PAYMENT
    if (intent === "payment") {
      return {
        text: `💳 **Payment Methods:**\n\n**Accepted:**\n• All major credit cards (Visa, Mastercard, Amex)\n• Debit cards\n• Cash in ${HOTEL_CONFIG.currency.code}\n• bKash & Nagad\n• Bank transfer\n\n**When to Pay:**\n• Secure deposit during booking\n• Balance at check-in\n• Or pay full amount at check-in\n\n**Security:**\n• SSL encrypted transactions\n• PCI compliant\n• Secure payment gateway\n\n**Need Invoice:**\nWe provide detailed invoices for all transactions.`,
        actions: [
          { label: "Book Now", action: "rooms" },
          { label: "Payment Questions", action: "contact" },
        ],
      };
    }

    // EVENTS
    if (intent === "events") {
      return {
        text: `🎉 **Events & Celebrations:**\n\n**Perfect Venue For:**\n• Weddings (up to 200 guests)\n• Corporate conferences\n• Birthday parties\n• Business meetings\n• Social gatherings\n\n**Event Facilities:**\n• Grand ballroom with city views\n• State-of-the-art A/V equipment\n• Flexible seating arrangements\n• Professional catering\n• Dedicated event coordinator\n\n**Packages Include:**\n• Room setup\n• Technical support\n• Catering options\n• Decoration assistance\n\n**Contact:** ${HOTEL_CONFIG.contact.eventsEmail}\n\nLet us make your event unforgettable!`,
        actions: [
          { label: "Event Inquiry", action: "contact" },
          { label: "View Venue", action: "contact" },
        ],
      };
    }

    // MY BOOKINGS
    if (intent === "myBookings") {
      if (!user) {
        return {
          text: "To view your bookings, please sign in to your account. Don't have an account yet? Create one to start booking!",
          actions: [
            { label: "Sign In", action: "login" },
            { label: "Create Account", action: "login" },
          ],
        };
      }

      return {
        text: `You can view and manage all your bookings in the Customer Panel. From there you can:\n\n• View upcoming reservations\n• Check past stays\n• Cancel bookings\n• Download invoices\n• Update guest information\n\nShall I take you there?`,
        actions: [
          { label: "My Bookings", action: "mybookings" },
          { label: "Customer Panel", action: "customer" },
        ],
      };
    }

    // HELP
    if (intent === "help") {
      return {
        text: `I'm here to help! 🤝\n\n**I can assist you with:**\n• Finding and booking rooms\n• Checking availability\n• Room information & pricing\n• Hotel amenities & services\n• Pet care services\n• Location & directions\n• Policies & procedures\n• Account management\n\n**Need Human Assistance?**\nCall: ${HOTEL_CONFIG.contact.phone}\nEmail: ${HOTEL_CONFIG.contact.email}\n\nWhat would you like to know?`,
        actions: [
          { label: "View Rooms", action: "rooms" },
          { label: "Contact Staff", action: "contact" },
          { label: "Check Availability", action: "availability" },
        ],
      };
    }

    // FALLBACK - Context-aware response
    if (confidence === 0) {
      const responses = [
        `I want to make sure I understand you correctly. Are you asking about ${context.lastTopic === 'roomInfo' ? 'room details' : context.lastTopic === 'booking' ? 'making a reservation' : 'our hotel services'}?`,
        `I'm not quite sure I understood that. Could you rephrase your question? I'm best at helping with rooms, bookings, amenities, and hotel information.`,
        `I'd love to help! Could you tell me more about what you're looking for? For example, are you interested in booking a room, learning about our amenities, or something else?`,
      ];

      return {
        text: responses[Math.floor(Math.random() * responses.length)],
        actions: [
          { label: "Browse Rooms", action: "rooms" },
          { label: "Talk to Staff", action: "contact" },
          { label: "Get Help", action: "help" },
        ],
      };
    }

    // Default fallback
    return {
      text: `I'm here to help with your stay at Luxe Hotel Dhaka! Feel free to ask me about rooms, bookings, amenities, or anything else. You can also reach our team directly at ${HOTEL_CONFIG.contact.phone}.`,
      actions: [
        { label: "View Rooms", action: "rooms" },
        { label: "Contact Us", action: "contact" },
      ],
    };
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "rooms":
        navigate("/rooms");
        break;
      case "contact":
        navigate("/contact");
        break;
      case "mybookings":
        navigate("/my-bookings");
        break;
      case "customer":
        navigate("/customer");
        break;
      case "petcare":
        navigate("/pet-care");
        break;
      case "login":
        // Trigger auth modal (you may need to implement this)
        navigate("/");
        break;
      case "availability":
        handleSendMessage("Show me available rooms right now");
        break;
      case "compare":
        handleSendMessage("Compare different room types");
        break;
      case "deals":
        handleSendMessage("What are your best deals?");
        break;
      case "amenities":
        handleSendMessage("Tell me about your amenities");
        break;
      case "wellness":
        handleSendMessage("Tell me about your pool and spa");
        break;
      case "dining":
        handleSendMessage("What dining options do you have?");
        break;
      case "help":
        handleSendMessage("I need help");
        break;
      default:
        console.log("Unknown action:", action);
    }
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

    // Simulate typing delay for realistic feel
    const typingDelay = Math.min(1000 + textToSend.length * 10, 2500);
    
    setTimeout(async () => {
      try {
        const response = await getSmartResponse(textToSend);
        
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          isBot: true,
          timestamp: new Date(),
          actions: response.actions,
        };

        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error("Error generating response:", error);
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: `I apologize, but I encountered an error. Please try again or contact us directly at ${HOTEL_CONFIG.contact.phone}.`,
          isBot: true,
          timestamp: new Date(),
          actions: [{ label: "Contact Us", action: "contact" }],
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsTyping(false);
      }
    }, typingDelay);
  };

  const handleSuggestionClick = (query: string) => {
    handleSendMessage(query);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        text: `Hello! I'm your Luxe Hotel Dhaka AI assistant. 🏨✨\n\nI can help you with:\n• Finding the perfect room\n• Checking real-time availability\n• Booking assistance\n• Hotel information & amenities\n• Pet care services\n• And much more!\n\nWhat would you like to know?`,
        isBot: true,
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
    setContext({});
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
              
              <div className="flex flex-col max-w-[85%]">
                <div
                  className={cn(
                    "p-3 rounded-lg text-sm whitespace-pre-line",
                    message.isBot
                      ? "bg-muted text-foreground rounded-bl-none"
                      : "bg-primary text-primary-foreground rounded-br-none"
                  )}
                >
                  {message.text}
                </div>
                
                {/* Quick Action Buttons */}
                {message.isBot && message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.actions.map((action, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action.action)}
                        className="h-8 text-xs hover:bg-primary/10 hover:border-primary transition-all"
                      >
                        {action.icon && <action.icon className="w-3 h-3 mr-1" />}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
                
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
          
          {(isTyping || isLoadingData) && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted text-foreground p-3 rounded-lg text-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  {isLoadingData && <span className="text-xs text-muted-foreground ml-2">Checking database...</span>}
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
              placeholder={isTyping || isLoadingData ? "AI is thinking..." : "Ask me anything about the hotel..."}
              className="flex-1 h-10"
              disabled={isTyping || isLoadingData}
            />
            <Button
              onClick={() => handleSendMessage()}
              size="icon"
              disabled={!inputValue.trim() || isTyping || isLoadingData}
              className="h-10 w-10 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" />
            Smart AI • Real-time Data • Available 24/7
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;