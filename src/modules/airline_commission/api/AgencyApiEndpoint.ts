
import { AIRLINECOMMISSION } from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import assyncWrapper, { toasterNotification } from '../../../utils/assyncWrapper';
import { HTTPResponse } from '../../common/commonType';
import { IBodyAgencyCommission, IGetAgencyCommission } from '../type/AgencyCommissionType';

export const AgencyCommApiEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    createAgencyCommission: builder.mutation<
      HTTPResponse<void>,
      IBodyAgencyCommission
    >({
      query: (body) => ({
        url: `/btob/sub-agent-commission`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: () => [AIRLINECOMMISSION],
    }),

    getAllAgencyCommission: builder.query<
      HTTPResponse<IGetAgencyCommission[]>,
      string
    >({
      query: (query) => ({
        url: `/btob/sub-agent-commission?${query}`,
      }),
      providesTags: () => [AIRLINECOMMISSION],
    }),

    editAgencyCommission: builder.mutation<
      HTTPResponse<void>,
      { body: IBodyAgencyCommission; code: string }
    >({
      query: ({ body, code }) => ({
        url: `/btob/sub-agent-commission/${code}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: () => [AIRLINECOMMISSION],
    }),

    //Agency commission Delete
    deleteAgencyComm: builder.mutation<unknown, any>({
      query: (id) => ({
        url: `/btob/sub-agent-commission/${id}`,
        method: "DELETE",
        //   body: data,
      }),

      onQueryStarted: async (_arg, { queryFulfilled }) => {
        assyncWrapper(async () => {
          await queryFulfilled;
          toasterNotification('success', 'SuccessfullyAgency commission Deleted!')
        });
      },
      invalidatesTags: () => [AIRLINECOMMISSION],
    }),
  }),
});

export const {
  useCreateAgencyCommissionMutation,
  useDeleteAgencyCommMutation,
  useEditAgencyCommissionMutation,
  useGetAllAgencyCommissionQuery

} = AgencyCommApiEndpoint;
