import { Table } from "antd";
import { useEffect, useState } from "react";
import SearchTableInfo from "../../../common/SearchTableInfo";
import { useLazyGetB2cBookingRequestQuery } from "../api/b2cBookingRequestEndPoint";
import b2cBookingRequestTableColumn from "../utils/b2cBookingRequestTableColumn";

const B2cBookingRequest = () => {
  const [getAllB2cBookingRequest, { data, isLoading }] =
    useLazyGetB2cBookingRequestQuery();
  const [statusFilter, setStatusFilter] = useState<string>("Pending");
  const selectStatusFilter = (value: string) => {
    setStatusFilter(value);
  };
  // search agency
  const [searchAgency, setSearchAgency] = useState<string>();
  const handleSearch = (value: string) => {
    setSearchAgency(value);
  };

  // pagination
  const size_limit = 20;
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
    window.scrollTo(0, 0);
  };

  // request url
  useEffect(() => {
    let url = `/btob/customer/booking-request?skip=${
      (pagination.current - 1) * size_limit
    }&limit=${pagination.pageSize}`;
    if (statusFilter) {
      url += `&status=${statusFilter}`;
    }

    if (searchAgency) {
      url += `&name=${searchAgency}`;
    }
    getAllB2cBookingRequest(url);
  }, [pagination, statusFilter, searchAgency]);

  return (
    <div className="mx-4 mt-4">
      <div>
        <div className="flex items-baseline justify-between">
          <div></div>
          <SearchTableInfo
            inputSearchChange={handleSearch}
            options={[
              { value: "Pending", label: "Pending" },
              { value: "Approved", label: "Approved" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
            selectStatusFilter={selectStatusFilter}
            defaultStatus={statusFilter}
            hideDateRange={true}
            inputSearchLabel="Search By Agency Name"
          />
        </div>

        <Table
          columns={b2cBookingRequestTableColumn()}
          dataSource={data?.data}
          loading={false}
          className="Table"
          rowClassName="TableTd"
          pagination={
            data?.total !== undefined && data?.total < 20
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
      </div>
    </div>
  );
};

export default B2cBookingRequest;
