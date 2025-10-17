import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Calendar, User, Mail, Phone, MapPin, Loader2, XCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { bookingsApi, formatDate } from "@/lib/api";
import { BookingDetail } from "@/lib/database.types";

const MyBookings = () => {
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadAllBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [searchQuery, bookings]);

  const loadAllBookings = async () => {
    try {
      setIsLoading(true);
      const data = await bookingsApi.getAllBookings();
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to search.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = await bookingsApi.getBookingsByEmail(searchEmail);
      
      if (data.length === 0) {
        toast({
          title: "No Bookings Found",
          description: `No bookings found for ${searchEmail}`,
        });
      }
      
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error('Error searching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to search bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterBookings = () => {
    if (!searchQuery.trim()) {
      setFilteredBookings(bookings);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = bookings.filter((booking) =>
      booking.first_name.toLowerCase().includes(query) ||
      booking.last_name.toLowerCase().includes(query) ||
      booking.email.toLowerCase().includes(query) ||
      booking.room_name.toLowerCase().includes(query) ||
      booking.booking_id.toLowerCase().includes(query)
    );
    
    setFilteredBookings(filtered);
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingsApi.cancelBooking(bookingId);
      toast({
        title: "Booking Cancelled",
        description: "The booking has been successfully cancelled.",
      });
      loadAllBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      confirmed: "default",
      checked_in: "outline",
      checked_out: "outline",
      cancelled: "destructive",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 text-center">
              My Bookings
            </h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              View and manage your hotel reservations
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle>Find Your Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearchByEmail} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="searchEmail">Email Address</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="searchEmail"
                          type="email"
                          placeholder="Enter your email address"
                          value={searchEmail}
                          onChange={(e) => setSearchEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" disabled={isLoading}>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                  </div>
                </form>

                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={loadAllBookings}
                    disabled={isLoading}
                  >
                    View All Bookings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Filter Section */}
        {bookings.length > 0 && (
          <section className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Filter by name, email, room, or booking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </section>
        )}

        {/* Bookings List */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-navy" />
              </div>
            ) : filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="py-20 text-center">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-navy mb-2">No Bookings Found</h3>
                  <p className="text-muted-foreground mb-6">
                    {bookings.length === 0 
                      ? "Search for your bookings using your email address or make a new reservation."
                      : "No bookings match your search criteria."}
                  </p>
                  <Button onClick={() => navigate('/rooms')}>
                    Browse Rooms
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.booking_id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Booking Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-navy mb-1">
                                {booking.room_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Booking ID: {booking.booking_id.slice(0, 8)}
                              </p>
                            </div>
                            {getStatusBadge(booking.booking_status)}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <User className="h-4 w-4 mr-2" />
                              {booking.first_name} {booking.last_name}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Mail className="h-4 w-4 mr-2" />
                              {booking.email}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Phone className="h-4 w-4 mr-2" />
                              {booking.phone}
                            </div>
                          </div>
                        </div>

                        {/* Dates & Details */}
                        <div>
                          <h4 className="font-semibold text-navy mb-3">Stay Details</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Check-in:</span>
                              <p className="font-medium">{formatDate(booking.check_in_date)}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Check-out:</span>
                              <p className="font-medium">{formatDate(booking.check_out_date)}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Guests:</span>
                              <p className="font-medium">{booking.number_of_guests}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Nights:</span>
                              <p className="font-medium">{booking.total_nights}</p>
                            </div>
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold text-navy mb-2">Total Price</h4>
                            <p className="text-3xl font-bold text-navy">
                              ${booking.total_price.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${booking.room_price_per_night}/night
                            </p>
                          </div>

                          {booking.booking_status !== 'cancelled' && 
                           booking.booking_status !== 'checked_out' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" className="mt-4">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel Booking
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this booking? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleCancelBooking(booking.booking_id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Yes, Cancel Booking
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </div>

                      {booking.special_requests && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm text-muted-foreground">
                            <strong>Special Requests:</strong> {booking.special_requests}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyBookings;
