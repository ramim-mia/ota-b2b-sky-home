import { Table } from "antd";
import SearchTableInfo from "../../common/SearchTableInfo";
import { useGetTransactionHistoryListQuery } from "../api/transectionHistoryEndpoints";
import transactionHistoryColumn from "../utils/transactionHistoryColumn";

const TransactionHistory = () => {
  const { data }: any = useGetTransactionHistoryListQuery();
  const selectSearchs = (value: string) => {
    console.log(value);
  };
  const selectSearchon = (value: string) => {
    console.log(value);
  };

  return (
    <div className="mx-4 mt-4">
      <SearchTableInfo
        title="Transaction History"
        selectStatusFilter={selectSearchs}
        inputSearchChange={selectSearchon}
        options={[
          { value: "Issue", label: "Issue" },
          { value: "Reissue", label: "Reissue" },
          { value: "Refund", label: "Refund" },
          { value: "Void Charge", label: "Void Charge" },
        ]}
      />
      <Table
        columns={transactionHistoryColumn()}
        dataSource={data?.data?.data}
        style={{ border: "1px solid #E7E7E7" }}
        pagination={false}
      />
    </div>
  );
};

export default TransactionHistory;
