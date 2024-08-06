import { AIRPORT_LIST, FLIGHT_LIST } from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import {
  IAirportList,
  IFlightSearchResult,
  ISearchHistoryData,
} from '../types/flightSearchType';
import { TFlightData } from '../types/TypeFlight';


type QueryData = { body: any; };


export const flightSearchEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAirportList: build.query<
      HTTPResponse<IAirportList[]>,
      { search?: string }
    >({
      query: (arg) => ({
        url: `/public/airport?&name=${arg.search || ''}`,
      }),
      providesTags: () => [AIRPORT_LIST],
    }),

    getFlightList: build.query<
      HTTPResponse<IFlightSearchResult>,
      {
        data: any;
        page: number;
        size: number;
        carrier_operating?: string;
        max_price?: string;
        min_price?: string;
        sort?: string;
        sort_by?: string;
        stoppage?: string;
        non_refundable?: string;
      }
    >({
      query: (arg) => {
        let url = `/btob/flight/search?size=${arg.size}&page=${arg.page}`;

        if (arg.carrier_operating) {
          url += `&carrier_operating=${arg.carrier_operating}`;
        }

        if (arg.max_price) {
          url += `&max_price=${arg.max_price}`;
        }

        if (arg.min_price) {
          url += `&min_price=${arg.min_price}`;
        }

        if (arg.sort) {
          url += `&sort=${arg.sort}`;
        }
        if (arg.sort_by) {
          url += `&sort_by=${arg.sort_by}`;
        }
        if (arg.stoppage) {
          url += `&stoppage=${arg.stoppage}`;
        }
        if (arg.non_refundable) {
          url += `&non_refundable=${arg.non_refundable}`;
        }

        return {
          url,
          method: 'POST',
          body: arg.data,
        };
      },
      providesTags: () => [FLIGHT_LIST],
    }),

    flightSearchV2: build.mutation<HTTPResponse<TFlightData>, QueryData>({
      query: (data: QueryData) => ({
        method: 'POST',
        url: `/btob/flight/search`,
        body: data.body
      }),
      invalidatesTags: [FLIGHT_LIST],
    }),
    flightFilterV2: build.query<HTTPResponse<TFlightData>, string>({
      query: (arg) => `/btob/flight/filter?${arg}`,
      keepUnusedDataFor: 0,
    }),

    getSearchHistory: build.query<HTTPResponse<ISearchHistoryData>, string>({
      query: (arg) => ({
        url: `/btob/flight/search-history/${arg}`,
      }),
      providesTags: () => [AIRPORT_LIST],
    }),
  }),
});

export const {
  useGetAirportListQuery,
  useLazyGetFlightListQuery,
  useLazyGetSearchHistoryQuery,
  useFlightSearchV2Mutation,
  useFlightFilterV2Query
} = flightSearchEndpoints;
