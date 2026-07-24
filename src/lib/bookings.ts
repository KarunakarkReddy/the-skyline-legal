export const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  advocate: string;
  practice_area: string | null;
  appointment_date: string;
  appointment_time: string;
  message: string | null;
  status: BookingStatus;
  submitted_at: string;
  updated_at: string;
};

export const ADMIN_NOTIFICATION_EMAIL = "karnas75best@gmail.com";
