import {
  AIRPORT_LIST,
  PNR
} from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import { IFlight } from '../../flightSearchNew/types/TypeFlight';
import {
  IPassengerDetailsApiType
} from '../type/flightDetailsType';

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
    revalidate: build.query<HTTPResponse<IFlight>, string>({
      query: (id) => ({
        url: `/btob/flight/revalidate/${id}`,
      }),
      providesTags: () => [AIRPORT_LIST],
    }),

    createPNR: build.mutation<
      CreatePNRResponse,
      { data: IPassengerDetailsApiType }
    >({
      query: (arg) => ({
        url: `/btob/flight-booking`,
        method: 'POST',
        body: arg.data,
      }),
      invalidatesTags: () => [PNR],
    }),
  }),
});

export const { useRevalidateQuery, useCreatePNRMutation } =
  flightDetailsEndpoints;
