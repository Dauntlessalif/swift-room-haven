import { supabase } from './supabase';
import { 
  GuestInsert, 
  BookingInsert, 
  ContactMessageInsert, 
  PetCareRequestInsert,
  Booking,
  Guest,
  Room,
  BookingDetail
} from './database.types';

// ============================================
// ROOMS API
// ============================================

export const roomsApi = {
  // Get all rooms
  async getAllRooms() {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('price', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Get room by ID
  async getRoomById(id: number) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Check room availability for date range
  async checkAvailability(roomId: number, checkIn: string, checkOut: string) {
    const { data, error } = await supabase
      // @ts-ignore - Supabase RPC type issue
      .rpc('check_room_availability', {
        p_room_id: roomId,
        p_check_in: checkIn,
        p_check_out: checkOut
      });
    
    if (error) throw error;
    return data as boolean;
  },

  // Get available rooms for date range
  async getAvailableRooms(checkIn: string, checkOut: string) {
    const allRooms = await this.getAllRooms();
    
    const availabilityChecks = await Promise.all(
      allRooms.map(async (room) => {
        const isAvailable = await this.checkAvailability(room.id, checkIn, checkOut);
        return { ...room, isAvailableForDates: isAvailable };
      })
    );
    
    return availabilityChecks;
  }
};

// ============================================
// GUESTS API
// ============================================

export const guestsApi = {
  // Get all guests
  async getAll() {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching guests:', error);
      throw error;
    }
    return data || [];
  },

  // Create a new guest
  async create(guestData: GuestInsert) {
    console.log('Creating guest with data:', guestData);
    const { data, error } = await supabase
      .from('guests')
      // @ts-ignore - Supabase type issue with Insert types
      .insert(guestData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating guest:', error);
      throw error;
    }
    return data;
  },

  // Update guest
  async update(id: string, guestData: Partial<GuestInsert>) {
    console.log('Updating guest:', id, guestData);
    const { data, error } = await supabase
      .from('guests')
      // @ts-ignore - Supabase type issue with Update types
      .update(guestData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating guest:', error);
      throw error;
    }
    return data;
  },

  // Create or get guest by email
  async createOrGetGuest(guestData: GuestInsert) {
    // First, try to find existing guest by email
    const { data: existingGuest, error: findError } = await supabase
      .from('guests')
      .select('*')
      .eq('email', guestData.email)
      .maybeSingle();
    
    if (findError) throw findError;
    
    // If guest exists, update their information
    if (existingGuest) {
      const { data, error } = await supabase
        .from('guests')
        // @ts-ignore - Supabase type issue
        .update({
          first_name: guestData.first_name,
          last_name: guestData.last_name,
          phone: guestData.phone,
          address: guestData.address,
        })
        .eq('id', (existingGuest as any).id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
    
    // If guest doesn't exist, create new one
    const { data, error } = await supabase
      .from('guests')
      // @ts-ignore - Supabase type issue
      .insert(guestData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get guest by email
  async getGuestByEmail(email: string) {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  }
};

// ============================================
// BOOKINGS API
// ============================================

export const bookingsApi = {
  // Create a new booking
  async createBooking(bookingData: BookingInsert) {
    const { data, error } = await supabase
      .from('bookings')
      // @ts-ignore - Supabase type issue
      .insert(bookingData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all bookings with details
  async getAllBookings() {
    const { data, error } = await supabase
      .from('booking_details')
      .select('*')
      .order('check_in_date', { ascending: false });
    
    if (error) throw error;
    return data as BookingDetail[];
  },

  // Alias for getAllBookings
  async getAll() {
    return this.getAllBookings();
  },

  // Get booking by ID
  async getBookingById(id: string) {
    const { data, error } = await supabase
      .from('booking_details')
      .select('*')
      .eq('booking_id', id)
      .single();
    
    if (error) throw error;
    return data as BookingDetail;
  },

  // Get bookings by guest email
  async getBookingsByEmail(email: string) {
    const { data, error } = await supabase
      .from('booking_details')
      .select('*')
      .eq('email', email)
      .order('check_in_date', { ascending: false });
    
    if (error) throw error;
    return data as BookingDetail[];
  },

  // Update booking status
  async updateBookingStatus(bookingId: string, status: Booking['status']) {
    const { data, error } = await supabase
      .from('bookings')
      // @ts-ignore - Supabase type issue
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Cancel booking
  async cancelBooking(bookingId: string) {
    return this.updateBookingStatus(bookingId, 'cancelled');
  },

  // Get upcoming bookings
  async getUpcomingBookings() {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('booking_details')
      .select('*')
      .gte('check_in_date', today)
      .in('booking_status', ['pending', 'confirmed'])
      .order('check_in_date', { ascending: true });
    
    if (error) throw error;
    return data as BookingDetail[];
  },

  // Get bookings for specific date range
  async getBookingsByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('booking_details')
      .select('*')
      .gte('check_in_date', startDate)
      .lte('check_out_date', endDate)
      .order('check_in_date', { ascending: true });
    
    if (error) throw error;
    return data as BookingDetail[];
  }
};

// ============================================
// CONTACT MESSAGES API
// ============================================

export const contactMessagesApi = {
  // Create a contact message
  async createMessage(messageData: ContactMessageInsert) {
    const { data, error } = await supabase
      .from('contact_messages')
      // @ts-ignore - Supabase type issue
      .insert(messageData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all messages
  async getAllMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get messages by status
  async getMessagesByStatus(status: 'new' | 'read' | 'replied' | 'archived') {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// ============================================
// PET CARE REQUESTS API
// ============================================

export const petCareApi = {
  // Create a pet care request
  async createRequest(requestData: PetCareRequestInsert) {
    const { data, error } = await supabase
      .from('pet_care_requests')
      // @ts-ignore - Supabase type issue
      .insert(requestData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all pet care requests
  async getAllRequests() {
    const { data, error } = await supabase
      .from('pet_care_requests')
      .select('*')
      .order('start_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Alias for getAllRequests
  async getAll() {
    return this.getAllRequests();
  },

  // Get pet care requests by email
  async getRequestsByEmail(email: string) {
    const { data, error } = await supabase
      .from('pet_care_requests')
      .select('*')
      .eq('email', email)
      .order('start_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Update request status
  async updateRequestStatus(
    requestId: string, 
    status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
  ) {
    const { data, error } = await supabase
      .from('pet_care_requests')
      // @ts-ignore - Supabase type inference issue with update status
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Calculate nights between dates
export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Calculate total price
export function calculateTotalPrice(pricePerNight: number, nights: number): number {
  return pricePerNight * nights;
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Validate date range
export function isValidDateRange(checkIn: string, checkOut: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  return checkInDate >= today && checkOutDate > checkInDate;
}
