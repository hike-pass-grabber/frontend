export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: "admin" | "hiker" | "unauthorized";
  created_at: string;
}

export interface Hike {
  id: string;
  name: string;
  availability_url: string;
}

export interface Booking {
  id: string;
  user_id: string;
  hike_id: string;
  hike_name: string | null;
  hike_date: string;
  party_size: number;
  num_passes: number;
  car_plate: string;
  first_name: string;
  last_name: string;
  status: "polling" | "available" | "success" | "failed" | "expired" | "cancelled";
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export interface AlertPreference {
  id: string;
  user_id: string;
  email_enabled: boolean;
  sms_enabled: boolean;
  sound_enabled: boolean;
  popup_enabled: boolean;
}
