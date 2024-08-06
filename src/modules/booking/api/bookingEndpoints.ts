import { PNR } from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';

export const bookingEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getBookingList: build.query<HTTPResponse<any>, void>({
      query: () => ({
        url: `/btob/flight-booking`,
      }),
      providesTags: () => [PNR],
    }),

    getSingleBookingDetails: build.query<HTTPResponse<any>, string>({
      query: (arg) => ({
        url: `/btob/flight-booking/${arg}`,
      }),
      providesTags: () => [PNR],
    }),
  }),
});

export const { useGetBookingListQuery } = bookingEndpoints;
