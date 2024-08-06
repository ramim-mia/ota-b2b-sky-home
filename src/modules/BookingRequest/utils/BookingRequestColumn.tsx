import { Button, Popconfirm, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCancelBookingRequestMutation } from "../api/bookingRequestApiEndpoint";
import { IGetBookingRequest } from "../type/bookingRequestType";

const BookingRequestColumn: () => ColumnsType<IGetBookingRequest> = () => {
  const [cancelConfirmation, setCancelConfirmation] = useState<number | null>(
    null
  );
  const [cancelBookingRequest, { isLoading }] =
    useCancelBookingRequestMutation();

  const handleCancelConfirm = async (id: number) => {
    await cancelBookingRequest(id);
    setCancelConfirmation(null); // Close the Popconfirm after handling cancel
  };

  const handleCancel = () => {
    setCancelConfirmation(null); // Close the Popconfirm if canceled
  };

  const showCancelConfirmation = (id: number) => {
    setCancelConfirmation(id);
  };

  return [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      key: "id",
    },
    {
      title: "Journey Type",
      dataIndex: "journey_type",
      key: "journey_type",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, { status }: any) => {
        let color = "red";
        if (status === "Pending") color = "orange";
        if (status === "Cancelled") color = "red";
        if (status === "Approved") color = "green";

        return (
          <Tag color={color}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      align: "center",
      key: "created_at",
      render: (created_at: string) => (
        <>{dayjs(created_at).format("DD-MMM-YYYY")}</>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record: IGetBookingRequest) => (
        <Space size="small">
          <Link to={`/bookingRequest/${record.id}`}>
            <Button size="small" type="primary">
              View
            </Button>
          </Link>
          {record.status === "Pending" && (
            <Popconfirm
              title="Cancel Booking Request"
              description="Are you sure you want to cancel?"
              visible={cancelConfirmation === record.id}
              onConfirm={() => handleCancelConfirm(record.id)}
              okButtonProps={{ loading: isLoading }}
              onCancel={handleCancel}
            >
              <Button
                type="primary"
                danger
                size="small"
                onClick={() => showCancelConfirmation(record.id)}
              >
                Cancel
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
};

export default BookingRequestColumn;
