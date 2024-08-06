import { useEffect, useState } from "react";

import { Table } from "antd";
import SearchTableInfo from "../../common/SearchTableInfo";
import { useLazyGetAllBookingRequestWithPaginationAndFilterQuery } from "../api/bookingRequestApiEndpoint";
import BookingRequestColumn from "../utils/BookingRequestColumn";

const BookingRequest = () => {
  const [getAllBookingRequest, { data, isLoading }] =
    useLazyGetAllBookingRequestWithPaginationAndFilterQuery();

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
  };

  // set date range state
  const [date, setDate] = useState();

  const [statusFilter, setStatusFilter] = useState<string>("Pending");
  const selectStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  // request url
  useEffect(() => {
    let url = `/btob/booking-request?skip=${
      (pagination.current - 1) * size_limit
    }&limit=${pagination.pageSize}`;
    if (statusFilter) {
      url += `&status=${statusFilter}`;
    }
    if (date) {
      url += `&from_date=${date[0] || ""}&to_date=${date[1] || ""}`;
    }

    getAllBookingRequest(url);
  }, [pagination, statusFilter, date]);

  return (
    <div className="mx-4">
      <div>
        <SearchTableInfo
          title={`All Request List (${!isLoading ? data?.total : 0})`}
          hideSearch={true}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Approved", label: "Approved" },
            { value: "Cancelled", label: "Cancelled" },
          ]}
          selectStatusFilter={selectStatusFilter}
          defaultStatus={statusFilter}
          setDate={setDate}
        />
      </div>

      <Table
        columns={BookingRequestColumn()}
        dataSource={data?.data}
        loading={isLoading}
        pagination={false}
        className="Table"
        rowClassName="TableTd"
      />
    </div>
  );
};

export default BookingRequest;
