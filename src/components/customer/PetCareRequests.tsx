import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { petCareApi } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PawPrint, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PetCareRequestsProps {
  customerEmail: string;
}

const PetCareRequests = ({ customerEmail }: PetCareRequestsProps) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    pet_type: '',
    pet_name: '',
    special_requirements: '',
  });

  const { data: requests, isLoading } = useQuery({
    queryKey: ['customer-petcare', customerEmail],
    queryFn: async () => {
      const all = await petCareApi.getAll();
      return all.filter((req: any) => req.guest_email?.toLowerCase() === customerEmail.toLowerCase());
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => petCareApi.createRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-petcare'] });
      setIsDialogOpen(false);
      setFormData({ pet_type: '', pet_name: '', special_requirements: '' });
      toast({
        title: "Request Submitted",
        description: "Your pet care request has been submitted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => petCareApi.updateRequestStatus(id, 'cancelled'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-petcare'] });
      toast({
        title: "Request Cancelled",
        description: "Your pet care request has been cancelled",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...formData,
      guest_email: customerEmail,
      status: 'pending',
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-purple-100 text-purple-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pet Care Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Loading your requests...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <PawPrint className="h-5 w-5" />
                Pet Care Requests
              </CardTitle>
              <CardDescription>Manage your pet care service requests</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Pet Care Request</DialogTitle>
                  <DialogDescription>
                    Submit a request for pet care services during your stay
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="pet_type">Pet Type</Label>
                    <Input
                      id="pet_type"
                      value={formData.pet_type}
                      onChange={(e) => setFormData({ ...formData, pet_type: e.target.value })}
                      placeholder="e.g., Dog, Cat, Bird"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pet_name">Pet Name</Label>
                    <Input
                      id="pet_name"
                      value={formData.pet_name}
                      onChange={(e) => setFormData({ ...formData, pet_name: e.target.value })}
                      placeholder="Your pet's name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="special_requirements">Special Requirements</Label>
                    <Textarea
                      id="special_requirements"
                      value={formData.special_requirements}
                      onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
                      placeholder="Any special care instructions, dietary needs, or medical conditions..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={createMutation.isPending}>
                      {createMutation.isPending ? 'Submitting...' : 'Submit Request'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {!requests || requests.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <PawPrint className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No pet care requests yet</p>
            <p className="text-sm text-gray-400">Click "New Request" to submit your first request</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request: any) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PawPrint className="h-5 w-5" />
                      {request.pet_name} ({request.pet_type})
                    </CardTitle>
                    <CardDescription>
                      Submitted {new Date(request.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {request.special_requirements && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Special Requirements:
                    </p>
                    <p className="text-sm text-gray-700">{request.special_requirements}</p>
                  </div>
                )}
                {request.admin_notes && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Admin Notes:
                    </p>
                    <p className="text-sm text-blue-700">{request.admin_notes}</p>
                  </div>
                )}
                {request.status === 'pending' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => cancelMutation.mutate(request.id)}
                    disabled={cancelMutation.isPending}
                  >
                    Cancel Request
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetCareRequests;
