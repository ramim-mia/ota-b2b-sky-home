import { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import { imgHostLink } from "../../../redux/request";
import { IGetBookingRequestDetails, Segment } from "../type/bookingRequestType";

export const travelSegmentsTableColumn: () => ColumnsType<Segment> = () => {
  return [
    {
      title: "Airline",
      dataIndex: "airline",
      key: "airline",
      render: (_, record) => (
        <div className="flex gap-2">
          <img
            width={60}
            style={{ objectFit: "cover" }}
            src={record.airline_logo}
            alt=""
          />
          <span>{record.airline}</span>
        </div>
      ),
    },
    {
      title: "Flight",
      dataIndex: "flight_number",
      key: "flight_number",
    },

    {
      title: "Departs",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Departure Date/Time",
      dataIndex: "departure_date",
      key: "departure",
      render: (departureDate: string, record: Segment) => {
        const departureTime = record.departure_time;
        const departureDateTime = `${dayjs(departureDate).format(
          "YYYY-MM-DD"
        )} ${dayjs(departureTime, "HH:mm:ss").format("HH:mm")}`;

        return departureDateTime;
      },
    },

    {
      title: "Arrives",
      dataIndex: "destination",
      key: "destination",
    },

    {
      title: "Arrival Date/Time",
      dataIndex: "arrival_date",
      key: "arrival_date",
      render: (arrivalDate: string, record: Segment) => {
        const arrivalTime = record.arrival_time;
        const arrivalDateTime = `${dayjs(arrivalDate).format(
          "YYYY-MM-DD"
        )} ${dayjs(arrivalTime, "HH:mm:ss").format("HH:mm")}`;
        return arrivalDateTime;
      },
    },
    {
      title: "Baggage",
      dataIndex: "baggage",
      key: "baggage",
    },
    {
      title: "Cabin",
      dataIndex: "class",
      key: "class",
    },
  ];
};

export const fareDetailsTableColumn: () => ColumnsType<IGetBookingRequestDetails> =
  () => {
    return [
      {
        title: "Total Price",
        dataIndex: "total_price",
        key: "total_price",
        render: (total_price, currency) => (
          <>
            {total_price && currency?.currency
              ? `${total_price} ${currency?.currency}`
              : `${total_price}`}
          </>
        ),
      },

      {
        title: "Discount",
        dataIndex: "discount",
        key: "discount",
        render: (discount, currency) => (
          <>
            {discount && currency?.currency
              ? `${discount} ${currency?.currency}`
              : `${discount}`}
          </>
        ),
      },
      {
        title: "Agent Price",
        dataIndex: "agent_price",
        key: "agent_price",
        render: (agent_price, currency) => (
          <>
            {agent_price && currency?.currency
              ? `${agent_price} ${currency?.currency}`
              : `${agent_price}`}
          </>
        ),
      },
    ];
  };

export const agencyDetailsTableColumn: () => ColumnsType<IGetBookingRequestDetails> =
  () => {
    return [
      {
        title: "Agency Name",
        dataIndex: "agency_name",
        key: "agency_name",
        render: (_, record) => (
          <div className="flex items-center gap-3">
            {record?.agency_logo ? (
              <img
                src={`${imgHostLink}/${record?.agency_logo}`}
                alt="agency_user_photo"
                width={25}
                height={25}
                className="rounded-full"
              />
            ) : (
              ""
            )}
            <span>{record?.agency_name}</span>
          </div>
        ),
      },

      {
        title: "Agency Phone",
        dataIndex: "agency_phone",
        key: "agency_phone",
      },
    ];
  };

export const contactDetailsTableColumn: () => ColumnsType<IGetBookingRequestDetails> =
  () => {
    return [
      {
        title: "Name (By Requested)",
        dataIndex: "requested_by_name",
        key: "requested_by_name",
      },

      {
        title: "Phone",
        dataIndex: "requested_by_phone",
        key: "requested_by_phone",
      },
    ];
  };
