import { B2CUSER } from '../../../../constants/TagType';
import { api } from '../../../../redux/api/api';
import { HTTPResponse } from '../../../common/commonType';
import { IB2CUserListType } from '../type/b2cUserTypes';

export const b2cuserEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getUserList: build.query<HTTPResponse<IB2CUserListType[]>, string>({
      query: (url) => ({
        url: `${url}`,
      }),
      providesTags: () => [B2CUSER],
    }),
    // getUserList: build.query<
    //   HTTPResponse<IB2CUserListType[]>,
    //   { skip: number; limit: number }
    // >({
    //   query: ({ skip, limit }) => ({
    //     url: `/btob/btoc-user?skip=${skip}&limit=${limit}`,
    //   }),
    //   providesTags: () => [B2CUSER],
    // }),
    getSingleUser: build.query<HTTPResponse<IB2CUserListType>, number>({
      query: (id) => ({
        url: `/btob/btoc-user/${id}`,
      }),
      providesTags: () => [B2CUSER],
    }),
    updateUser: build.mutation<HTTPResponse<void>, { id: number; body: any }>({
      query: ({ id, body }) => ({
        url: `/btob/btoc-user/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: () => [B2CUSER],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useLazyGetUserListQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = b2cuserEndpoints;
