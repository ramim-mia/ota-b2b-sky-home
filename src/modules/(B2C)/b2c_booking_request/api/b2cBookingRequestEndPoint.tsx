import { B2CBOOKINGREQUEST } from '../../../../constants/TagType';
import { api } from '../../../../redux/api/api';
import { HTTPResponse } from '../../../common/commonType';
import {
  IGetB2cBookingRequest,
  IGetSingleB2cBookingRequest,
} from '../type/b2cBookingRequestType';

export const b2cBookingRequestEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getB2cBookingRequest: build.query<
      HTTPResponse<IGetB2cBookingRequest[]>,
      string
    >({
      query: (url) => ({
        url: `${url}`,
      }),
      providesTags: () => [B2CBOOKINGREQUEST],
    }),

    getSingleB2cBookingRequest: build.query<
      HTTPResponse<IGetSingleB2cBookingRequest>,
      string
    >({
      query: (id) => ({
        url: `/btob/customer/booking-request/${id}`,
      }),
      providesTags: () => [B2CBOOKINGREQUEST],
    }),
    cancelB2CBookingRequest: build.mutation<HTTPResponse<void>, string>({
      query: (id) => ({
        url: `/btob/customer/booking-request/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [B2CBOOKINGREQUEST],
    }),
  }),
});

export const {
  useLazyGetB2cBookingRequestQuery,
  useGetSingleB2cBookingRequestQuery,
  useCancelB2CBookingRequestMutation,
} = b2cBookingRequestEndPoint;
