import {
  BOOKINGREQUEST
} from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import {
  IGetBookingRequest,
  IGetBookingRequestDetails
} from '../type/bookingRequestType';

interface CreatePNRResponse {
  success: boolean;
  booking_id: string;
}
interface CreateBookingRequestResponse {
  success: boolean;
  message: string;
}
export const flightDetailsEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    createBookingRequest: build.mutation<
      CreateBookingRequestResponse,
      {
        flight_id: string
        traveler: any
      }
    >({
      query: (body) => ({
        url: `/btob/booking-request`,
        method: 'POST',
        body
      }),
      invalidatesTags: () => [BOOKINGREQUEST],
    }),

    getAllBookingRequestWithPaginationAndFilter: build.query<
      HTTPResponse<IGetBookingRequest[]>,
      string
    >({
      query: (url) => ({
        url: url,
      }),
      providesTags: () => [BOOKINGREQUEST],
    }),

    getSingleBookingRequestDetails: build.query<
      HTTPResponse<IGetBookingRequestDetails>,
      string
    >({
      query: (org) => ({
        url: `/btob/booking-request/${org}`,
      }),
      providesTags: () => [BOOKINGREQUEST],
    }),

    cancelBookingRequest: build.mutation<HTTPResponse<void>, number>({
      query: (id) => ({
        url: `/btob/booking-request/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [BOOKINGREQUEST],
    }),
  }),
});

export const {
  useCreateBookingRequestMutation,
  useLazyGetAllBookingRequestWithPaginationAndFilterQuery,
  useGetSingleBookingRequestDetailsQuery,
  useCancelBookingRequestMutation,
} = flightDetailsEndpoints;
