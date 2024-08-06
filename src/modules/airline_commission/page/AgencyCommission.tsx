import { Button, Input, Table } from "antd";
import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { useGetAllAgencyCommissionQuery } from "../api/AgencyApiEndpoint";
import { IGetAgencyCommission } from "../type/AgencyCommissionType";
import AirlineCommissionTableColumn from "../utils/AirlineCommissionTableColumn";
import AddAgencyCommission from "./AddAgencyCommission";
import EditAgencyCommission from "./EditAgencyCommission";

const AgencyCommission = () => {
  const { Search } = Input;

  const [search, setSearch] = useState<string>("");

  const initialPage = 1;
  const initialPageSize = 50;
  const { pagination, handlePaginationChange, arg } = usePagination(
    initialPage,
    initialPageSize
  );
  const query = `${search ? `&code=${search}` : ""}`;

  const { data, isLoading } = useGetAllAgencyCommissionQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const [createModal, setCreateModal] = useState<boolean>(false);

  // -------------------- EditAgency commission
  const [editSelectedAirComm, setEditSelectedAirComm] =
    useState<IGetAgencyCommission | null>(null);

  const handleEditAirComm = (data: IGetAgencyCommission) => {
    setEditSelectedAirComm(data);
  };
  const handleCloseEditAirComm = () => {
    setEditSelectedAirComm(null);
  };

  return (
    <div className="mx-4 md:mx-8">
      <div className="flex items-baseline justify-between">
        <Button
          type="primary"
          className="mb-3"
          onClick={() => setCreateModal(true)}
        >
          Agency commission
        </Button>
        <Search
          placeholder={"Search By code "}
          onSearch={(value) => setSearch(value)}
          style={{ width: 220 }}
        />
      </div>
      <Table
        columns={AirlineCommissionTableColumn(handleEditAirComm)}
        dataSource={data?.data}
        loading={isLoading}
        className="Table"
        rowClassName="TableTd"
        pagination={
          data?.total !== undefined && data?.total < 0
            ? false
            : {
                ...pagination,
                total: data?.total,
                showSizeChanger: true,
                pageSizeOptions: ["20", "50", "100"],
                onChange: handlePaginationChange,
              }
        }
      />

      {createModal && (
        <AddAgencyCommission open={createModal} setOpen={setCreateModal} />
      )}
      {editSelectedAirComm && (
        <EditAgencyCommission
          airCommData={editSelectedAirComm}
          onClose={handleCloseEditAirComm}
        />
      )}
    </div>
  );
};

export default AgencyCommission;
