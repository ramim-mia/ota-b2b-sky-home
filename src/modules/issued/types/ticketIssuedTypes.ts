export type ITicketIssued = {
  ticket_issue_id: number;
  pnr_code: string;
  ticket_issue_status: string;
  flight_number: string;
  total_passenger: number;
};

type IFlightSegment = {
  id: number;
  airline_code: string;
  arrival_time: string;
  flight_number: string;
  departure_time: string;
  origin_loc_code: string;
  flight_booking_Id: number;
  destination_loc_code: string;
};
export type IViewIssueTicketType = {
  ticket_issue_id: number;
  booking_id: number;
  pnr_code: string;
  ticket_issue_status: string;
  total_passenger: number;
  flight_number: string;
  ticket_number: string;
  reservation_id: string;
  flight_segment: IFlightSegment[];
};
