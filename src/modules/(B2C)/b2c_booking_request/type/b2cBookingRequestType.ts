export interface IGetB2cBookingRequest {
  id?: number;
  status?: string;
  journey_type?: string;
  created_at?: Date;
  note?: null;
  agency_id?: number;
  agency_name?: string;
  agency_logo?: string;
  user_id?: number;
  user_name?: string;
  user_photo?: string;
  user_mobile_number?: string;
}

export interface IGetSingleB2cBookingRequest {
  id?: number;
  status?: string;
  journey_type?: string;
  class?: string;
  created_at?: Date;
  note?: null;
  agent_commission?: string;
  customer_commission?: string;
  total_price?: string;
  base_fair?: string;
  total_tax?: string;
  agent_discount?: string;
  customer_discount?: string;
  agency_profit?: string;
  agent_price?: string;
  customer_price?: string;
  total_travelers?: number;
  traveler_adult?: number;
  traveler_children?: number;
  traveler_kids?: number;
  traveler_infants?: number;
  agency_id?: number;
  agency_name?: string;
  agency_logo?: string;
  agency_phone?: string;
  agency_email?: string;
  user_id?: number;
  user_name?: string;
  user_photo?: string;
  user_email?: string;
  user_mobile_number?: string;
  admin_id?: null;
  admin_name?: null;
  admin_photo?: null;
  segments?: Segment[];
}

export interface Segment {
  id?: number;
  booking_request_id?: number;
  flight_number?: string;
  airline?: string;
  airline_logo?: string;
  origin?: string;
  destination?: string;
  class?: string;
  baggage?: string;
  departure_date?: Date;
  arrival_date?: Date;
  departure_time?: string;
  arrival_time?: string;
}
