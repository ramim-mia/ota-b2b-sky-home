import { Button, Space, Tag } from "antd"; // Make sure to import Tag and Space from 'antd'
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IAirTicket } from "../type/airTicketTypes";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const airTicketListColumn: (
  current: number,
  pageSize: number
) => ColumnsType<IAirTicket> = (current, pageSize) => {
  return [
    {
      title: "SL",
      dataIndex: "booking_id",
      key: "booking_id",
      render: (_, __, index) => {
        return (current - 1) * pageSize + index + 1;
      },
    },

    {
      title: "PNR",
      dataIndex: "pnr_code",
      key: "pnr_code",
    },

    {
      title: "Booking Date",
      key: "booking_created_at",
      dataIndex: "booking_created_at",
      render: (_, { booking_created_at }) => (
        <>{dayjs(booking_created_at).format("DD-MMM-YYYY")}</>
      ),
    },
    {
      title: "Status",
      key: "booking_status",
      dataIndex: "booking_status",
      render: (_, { booking_status }: any) => {
        let color = "red";
        if (booking_status?.pending) color = "orange";
        if (booking_status?.cancelled) color = "red";
        if (booking_status?.issued) color = "green";
        if (booking_status?.refund) color = "blue";
        if (booking_status?.adm) color = "purple";
        if (booking_status)
          return (
            <Tag color={color}>
              {booking_status?.charAt(0)?.toUpperCase() +
                booking_status?.slice(1)}
            </Tag>
          );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Link
            to={`/airticket/${record.booking_id}`}
            state={location.pathname}
          >
            <Button size="small" type="primary">
              View
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
};
export default airTicketListColumn;
