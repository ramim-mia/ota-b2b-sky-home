import { TRANSACTIONHISTORY } from '../../../constants/TagType';
import { api } from '../../../redux/api/api';
import { HTTPResponse } from '../../common/commonType';
import { ITansactionHistory } from '../types/ticketIssuedTypes';

export const transectionHistoryEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactionHistoryList: build.query<
      HTTPResponse<ITansactionHistory[]>,
      void
    >({
      query: (body) => ({ url: '/btob/transactions' }),
      providesTags: () => [TRANSACTIONHISTORY],
    }),
  }),
});

export const { useGetTransactionHistoryListQuery } =
  transectionHistoryEndpoints;
