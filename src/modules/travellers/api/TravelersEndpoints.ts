import { AIRPORT_LIST } from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import { IAllTravelers } from '../types/travelersTypes';

export const TravelersEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTravelerWithPaginationAndFilter: build.query<
      HTTPResponse<IAllTravelers[]>,
      string
    >({
      query: (url) => ({
        url: url,
      }),
      providesTags: () => [AIRPORT_LIST],
    }),
    getAllCountry: build.query({
      query: (arg) => ({
        url: '/public/country'
      })
    }),
    useGetAllTravelerList: build.query<HTTPResponse<IAllTravelers[]>, void>({
      query: (url) => ({
        url: `/btob/travelers`,
      }),
      providesTags: () => [AIRPORT_LIST],
    }),
    getSingleTraveler: build.query<HTTPResponse<IAllTravelers>, number>({
      query: (id) => ({
        url: `/btob/travelers/${id}`,
      }),
      providesTags: () => [AIRPORT_LIST],
    }),
    postTraveler: build.mutation<HTTPResponse<any>, any>({
      query: (formData) => ({
        url: `/btob/travelers`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: () => [AIRPORT_LIST],
    }),
    updateTraveler: build.mutation<
      HTTPResponse<any>,
      { formData: any; id: string }
    >({
      query: ({ formData, id }) => ({
        url: `/btob/travelers/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: () => [AIRPORT_LIST],
    }),
  }),
});

export const {
  useUseGetAllTravelerListQuery,
  useLazyGetAllTravelerWithPaginationAndFilterQuery,
  useGetSingleTravelerQuery,
  useLazyGetSingleTravelerQuery,
  usePostTravelerMutation,
  useUpdateTravelerMutation,
  useGetAllCountryQuery
} = TravelersEndpoints;
