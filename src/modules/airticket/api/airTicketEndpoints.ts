import { PNR } from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import { IAirTicket, IAirTicketDetails } from '../type/airTicketTypes';

export const flightDetailsEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFlightBookingWithPaginationAndFilter: build.query<
      HTTPResponse<IAirTicket[]>,
      string
    >({
      query: (url) => ({
        url: url,
      }),
      providesTags: () => [PNR],
    }),

    getBookingDetails: build.query<HTTPResponse<IAirTicketDetails>, string>({
      query: (arg) => ({
        url: `/btob/flight-booking/${arg}`,
      }),
      providesTags: () => [PNR],
    }),
    confirmTicket: build.mutation<HTTPResponse<{ redirectUrl: any }>, any>({
      query: (body) => ({
        url: `/btob/ticket-issue`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: () => [PNR],
    }),
    cancelTicketBooking: build.mutation<HTTPResponse<IAirTicketDetails>, any>({
      query: (body) => ({
        url: `/btob/flight-booking/cancel`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: () => [PNR],
    }),
  }),
});

export const {
  useLazyGetAllFlightBookingWithPaginationAndFilterQuery,
  useGetBookingDetailsQuery,
  useConfirmTicketMutation,
  useCancelTicketBookingMutation,
} = flightDetailsEndpoints;
