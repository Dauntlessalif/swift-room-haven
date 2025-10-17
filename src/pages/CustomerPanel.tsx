import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyBookingsView from '@/components/customer/MyBookingsView';
import ProfileManagement from '@/components/customer/ProfileManagement';
import MyReviews from '@/components/customer/MyReviews';
import PetCareRequests from '@/components/customer/PetCareRequests';
import FavoritesView from '@/components/customer/FavoritesView';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const CustomerPanel = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              My Account
            </h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="petcare">Pet Care</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <MyBookingsView customerEmail={user?.email || ''} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileManagement customerEmail={user?.email || ''} />
          </TabsContent>

          <TabsContent value="reviews">
            <MyReviews customerEmail={user?.email || ''} />
          </TabsContent>

          <TabsContent value="petcare">
            <PetCareRequests customerEmail={user?.email || ''} />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesView customerEmail={user?.email || ''} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerPanel;
