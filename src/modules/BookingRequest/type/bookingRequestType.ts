import { ITraveler } from "../utils/BookingReavelersColum";

export interface IBookingRequestBody {
  flight_id: string;
}
export interface IGetBookingRequest {
  id: number;
  status: string;
  journey_type: string;
  created_at: Date;
  note: null;
  agency_id: number;
  agency_name: string;
  agency_logo: null;
  agency_phone: string;
}

export interface IGetBookingRequestDetails {
  id: number;
  status: string;
  journey_type: string;
  created_at: Date;
  note: string;
  commission: string;
  currency: null;
  total_price: string;
  base_fair: string;
  total_tax: string;
  discount: string;
  agent_price: string;
  agency_id: number;
  agency_name: string;
  agency_logo: null;
  agency_phone: string;
  requested_by_id: number;
  requested_by_name: string;
  requested_by_phone: string;
  admin_id: null;
  admin_name: null;
  admin_photo: null;
  segments: Segment[];
  travelers: ITraveler[];
}

export interface Segment {
  id: number;
  btob_booking_request_id: string;
  flight_number: string;
  airline: string;
  airline_logo: string;
  origin: string;
  destination: string;
  class: string;
  baggage: string;
  departure_date: null;
  arrival_date: Date;
  departure_time: string;
  arrival_time: string;
}
