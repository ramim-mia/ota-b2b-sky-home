import { SUBAGENCY } from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import { IGetAgency, IGetSingleAgency } from '../type/myAgencyType';

export const agencyApiEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    createMyAgency: builder.mutation<HTTPResponse<void>, FormData>({
      query: (body) => ({
        url: `/btob/sub-agent`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: () => [SUBAGENCY],
    }),

    getAllSubAgency: builder.query<HTTPResponse<IGetAgency[]>, string>({
      query: (org) => ({
        url: org,
      }),
      providesTags: () => [SUBAGENCY],
    }),
    getSingleSubAgency: builder.query<HTTPResponse<IGetSingleAgency>, number>({
      query: (org) => ({
        url: `/btob/sub-agent/${org}`,
      }),
      providesTags: () => [SUBAGENCY],
    }),
    editAgencyDetails: builder.mutation<
      HTTPResponse<void>,
      { body: FormData; id: number }
    >({
      query: ({ body, id }) => ({
        url: `/agency/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: () => [SUBAGENCY],
    }),
  }),
});

export const {
  useCreateMyAgencyMutation,
  useLazyGetAllSubAgencyQuery,
  useGetSingleSubAgencyQuery,
  useEditAgencyDetailsMutation,
} = agencyApiEndpoint;
