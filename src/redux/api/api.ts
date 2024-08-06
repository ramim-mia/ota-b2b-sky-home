import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AIRLINECOMMISSION,
  AIRPORT_LIST,
  B2CBOOKINGREQUEST,
  B2CUSER,
  BOOKINGREQUEST,
  FLIGHT_LIST,
  PNR,
  PROFILE,
  SUBAGENCY,
  TICKETLIST,
  TRANSACTIONHISTORY,
} from '../../constants/TagType';
import { TUser } from '../../utils/lib';

console.log()
export const api = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://192.168.0.244:9008/api/v1`,
    // import.meta.env.VITE_REACT_APP_BASE_URL
    baseUrl: `https://ota.m360ictapi.com/api/v1`,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: 'api',
  endpoints: (builder) => ({
    getInitialToken: builder.query<TUser, void>({
      query: () => ({
        url: `/btob/profile`,
        method: 'GET',
      }),
      providesTags: [PROFILE],

    }),
    updateCommission: builder.mutation<void, { btoc_commission: string }>({
      query: ({ btoc_commission }) => ({
        url: `/btob/profile/b2c-commission`,
        method: 'PATCH',
        body: { btoc_commission },
      }),
      invalidatesTags: [PROFILE],

    }),
  }),
  tagTypes: [
    AIRPORT_LIST,
    PNR,
    PROFILE,
    BOOKINGREQUEST,
    TICKETLIST,
    B2CUSER,
    FLIGHT_LIST,
    TRANSACTIONHISTORY,
    SUBAGENCY,
    B2CBOOKINGREQUEST,
    AIRLINECOMMISSION
  ],
});
export const {
  useLazyGetInitialTokenQuery,
  useUpdateCommissionMutation } = api;
