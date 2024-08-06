import { Card, Table, TableColumnsType } from "antd";
import { BreadcrumbProps } from "antd/lib";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { size_limit } from "../../../constants/Pagination";
import { webRoutes } from "../../../route/RouteLinks";
import SearchTableInfo from "../../common/SearchTableInfo";
import { useLazyGetAllFlightBookingWithPaginationAndFilterQuery } from "../api/airTicketEndpoints";
import airTicketListColumn from "../utils/airTicketListColumn";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: webRoutes.airticket,
      title: <Link to={webRoutes.airticket}>Air-Ticket</Link>,
    },
  ],
};
const AirTicket = () => {
  const [bookingFilter, setBookingFilter] = useState<string>("pending");
  const selectSearchs = (value: string) => {
    setBookingFilter(value);
  };
  const selectSearchon = (value: string) => {};

  const [getAllFlightBooking, { data: airTicketList, isFetching }] =
    useLazyGetAllFlightBookingWithPaginationAndFilterQuery();
  const columns: TableColumnsType<any> = [
    {
      title: "From",
      dataIndex: "origin_loc_code",
      key: "origin_loc_code",
    },
    {
      title: "To",
      dataIndex: "destination_loc_code",
      key: "destination_loc_code",
    },

    { title: "Airline Code", dataIndex: "airline_code", key: "airline_code" },
    {
      title: "Flight Number",
      dataIndex: "flight_number",
      key: "flight_number",
    },
    {
      title: "Departure Date & Time",
      dataIndex: "departure_time",
      key: "departure_time",
      render: (_, { departure_time }) => (
        <>{dayjs(departure_time).format("DD-MMM-YYYY HH:mm:ss")}</>
      ),
    },
    {
      title: "Arrival Date & Time",
      dataIndex: "arrival_time",
      key: "arrival_time",
      render: (_, { arrival_time }) => (
        <>{dayjs(arrival_time).format("DD-MMM-YYYY HH:mm:ss")}</>
      ),
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  useEffect(() => {
    getAllFlightBooking(
      `/btob/flight-booking?status=${bookingFilter}&skip=${
        (pagination.current - 1) * size_limit
      }&limit=${pagination.pageSize} `
    );
  }, [pagination, bookingFilter]);

  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
    window.scrollTo(0, 0);
  };

  const formateAirticketList = airTicketList?.data?.map((item, index) => ({
    ...item,
    key: index,
  }));

  return (
    <div className="mx-4 mt-4">
      <div>
        <SearchTableInfo
          title={`All Booking List (${airTicketList?.total || 0})`}
          selectStatusFilter={selectSearchs}
          inputSearchChange={selectSearchon}
          // bookingFilter={bookingFilter}
          options={[
            { value: "pending", label: "Pending" },
            { value: "Canceled", label: "cancelled" },
            { value: "issued", label: "Issued" },
          ]}
        />
        <Table
          size="small"
          expandable={{
            expandedRowRender: ({ flight_segment }) => (
              <Card
                size="small"
                title={
                  <p
                    style={{ backgroundColor: "#F9F9F9", padding: "3px" }}
                    className="rounded-lg"
                  >
                    Segment Details
                  </p>
                }
              >
                <Table
                  columns={columns}
                  dataSource={flight_segment}
                  pagination={false}
                />
              </Card>
            ),
            defaultExpandedRowKeys: ["0"],
          }}
          columns={airTicketListColumn(pagination.current, pagination.pageSize)}
          dataSource={formateAirticketList || []}
          style={{ borderTop: "1px solid #E7E7E7" }}
          pagination={
            airTicketList?.total !== undefined && airTicketList?.total < 20
              ? false
              : {
                  ...pagination,
                  total: airTicketList?.total,
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

export default AirTicket;
