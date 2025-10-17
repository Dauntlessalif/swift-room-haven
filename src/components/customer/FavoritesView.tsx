import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FavoritesViewProps {
  customerEmail: string;
}

const FavoritesView = ({ customerEmail }: FavoritesViewProps) => {
  // In production, this would fetch from a favorites table
  const [favorites] = useState<any[]>([]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Favorite Rooms
          </CardTitle>
          <CardDescription>
            Your saved rooms for quick booking
          </CardDescription>
        </CardHeader>
      </Card>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 mb-6">
              Start adding rooms to your favorites to quickly book them later
            </p>
            <Button onClick={() => window.location.href = '/rooms'}>
              Browse Rooms
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((room: any) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {room.rating || 'No rating yet'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">
                    ${room.price_per_night}/night
                  </p>
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Special Offers Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle>Special Offers for You</CardTitle>
          <CardDescription>
            Exclusive deals on your favorite rooms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium">Early Bird Discount</p>
                <p className="text-sm text-gray-600">Book 30 days in advance</p>
              </div>
              <Badge className="bg-green-500">15% OFF</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium">Weekend Special</p>
                <p className="text-sm text-gray-600">Friday to Sunday stays</p>
              </div>
              <Badge className="bg-blue-500">20% OFF</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium">Loyalty Reward</p>
                <p className="text-sm text-gray-600">For returning guests</p>
              </div>
              <Badge className="bg-purple-500">10% OFF</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoritesView;
