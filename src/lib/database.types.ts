// Database Types for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          capacity: number
          size: string
          bed_type: string
          amenities: string[]
          image_url: string | null
          available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          capacity: number
          size: string
          bed_type: string
          amenities: string[]
          image_url?: string | null
          available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          capacity?: number
          size?: string
          bed_type?: string
          amenities?: string[]
          image_url?: string | null
          available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          room_id: number
          guest_id: string
          check_in_date: string
          check_out_date: string
          number_of_guests: number
          total_nights: number
          total_price: number
          status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
          special_requests: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          room_id: number
          guest_id: string
          check_in_date: string
          check_out_date: string
          number_of_guests: number
          total_nights: number
          total_price: number
          status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          room_id?: number
          guest_id?: string
          check_in_date?: string
          check_out_date?: string
          number_of_guests?: number
          total_nights?: number
          total_price?: number
          status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          status: 'new' | 'read' | 'replied' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          status?: 'new' | 'read' | 'replied' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          status?: 'new' | 'read' | 'replied' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      pet_care_requests: {
        Row: {
          id: string
          booking_id: string | null
          guest_name: string
          email: string
          phone: string
          pet_type: string
          pet_name: string
          pet_weight: number | null
          pet_age: number | null
          service_type: 'sitting' | 'walking' | 'grooming' | 'daycare' | 'overnight'
          start_date: string
          end_date: string
          special_requirements: string | null
          vaccination_records_url: string | null
          status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
          total_price: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id?: string | null
          guest_name: string
          email: string
          phone: string
          pet_type: string
          pet_name: string
          pet_weight?: number | null
          pet_age?: number | null
          service_type: 'sitting' | 'walking' | 'grooming' | 'daycare' | 'overnight'
          start_date: string
          end_date: string
          special_requirements?: string | null
          vaccination_records_url?: string | null
          status?: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
          total_price?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string | null
          guest_name?: string
          email?: string
          phone?: string
          pet_type?: string
          pet_name?: string
          pet_weight?: number | null
          pet_age?: number | null
          service_type?: 'sitting' | 'walking' | 'grooming' | 'daycare' | 'overnight'
          start_date?: string
          end_date?: string
          special_requirements?: string | null
          vaccination_records_url?: string | null
          status?: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
          total_price?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          guest_id: string
          room_id: number
          rating: number
          title: string | null
          comment: string
          response: string | null
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          guest_id: string
          room_id: number
          rating: number
          title?: string | null
          comment: string
          response?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          guest_id?: string
          room_id?: number
          rating?: number
          title?: string | null
          comment?: string
          response?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      booking_details: {
        Row: {
          booking_id: string
          check_in_date: string
          check_out_date: string
          number_of_guests: number
          total_nights: number
          total_price: number
          booking_status: string
          special_requests: string | null
          booked_at: string
          guest_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          room_id: number
          room_name: string
          room_price_per_night: number
          room_capacity: number
          room_size: string
          bed_type: string
        }
      }
      room_availability_summary: {
        Row: {
          room_id: number
          room_name: string
          price: number
          capacity: number
          available: boolean
          active_bookings: number
          next_available_date: string | null
        }
      }
    }
    Functions: {
      check_room_availability: {
        Args: {
          p_room_id: number
          p_check_in: string
          p_check_out: string
        }
        Returns: boolean
      }
    }
  }
}

// Helper types for application use
export type Room = Database['public']['Tables']['rooms']['Row']
export type Guest = Database['public']['Tables']['guests']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
export type PetCareRequest = Database['public']['Tables']['pet_care_requests']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']

export type BookingInsert = Database['public']['Tables']['bookings']['Insert']
export type GuestInsert = Database['public']['Tables']['guests']['Insert']
export type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert']
export type PetCareRequestInsert = Database['public']['Tables']['pet_care_requests']['Insert']

export type BookingDetail = Database['public']['Views']['booking_details']['Row']
export type RoomAvailability = Database['public']['Views']['room_availability_summary']['Row']
