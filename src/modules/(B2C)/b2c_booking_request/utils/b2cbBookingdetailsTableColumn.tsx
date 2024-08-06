import { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import DynamicAirlineImage from "../../../../app_components/DynamicAirlineImage";
import {
  IGetSingleB2cBookingRequest,
  Segment,
} from "../type/b2cBookingRequestType";

export const travelSegmentsTableColumn: () => ColumnsType<Segment> = () => {
  return [
    {
      title: "Airline",
      dataIndex: "airline",
      key: "airline",
      render: (_, record) => (
        <div className="flex gap-2">
          <DynamicAirlineImage airLineCode={record.airline} />
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
        const formattedDepartureDate =
          dayjs(departureDate).format("YYYY-MM-DD");
        const formattedDepartureTime = dayjs(departureTime, "HH:mm:ss").format(
          "hh:mm A"
        );
        let departureDateTime;
        if (formattedDepartureDate != "Invalid Date") {
          departureDateTime = `${formattedDepartureDate} ${formattedDepartureTime}`;
        } else {
          departureDateTime = "N/A";
        }
        return departureTime;
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
        const arrivalTime = record.arrival_time!.split("+")[0];
        const formattedArrivalDate = dayjs(arrivalDate).format("YYYY-MM-DD");
        const formattedArrivalTime = dayjs(arrivalTime, "HH:mm:ss").format(
          "hh:mm A"
        );

        const arrivalDateTime = `${formattedArrivalDate} ${formattedArrivalTime}`;

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

export const customerFareDetailsTableColumn: () => ColumnsType<IGetSingleB2cBookingRequest> =
  () => {
    return [
      {
        title: "Total Price",
        dataIndex: "total_price",
        key: "total_price",
      },

      {
        title: "Tax",
        dataIndex: "total_tax",
        key: "total_tax",
      },
      {
        title: "Customer Commission",
        dataIndex: "customer_commission",
        key: "customer_commission",
      },

      {
        title: "Customer Discount",
        dataIndex: "customer_discount",
        key: "customer_discount",
      },
      {
        title: "Customer Price",
        dataIndex: "customer_price",
        key: "customer_price",
      },
    ];
  };

export const agentFareDetailsTableColumn: () => ColumnsType<IGetSingleB2cBookingRequest> =
  () => {
    return [
      {
        title: "Base Fair",
        dataIndex: "base_fair",
        key: "base_fair",
      },
      {
        title: "Agent Price",
        dataIndex: "agent_price",
        key: "agent_price",
      },

      {
        title: "Agent Commission",
        dataIndex: "agent_commission",
        key: "agent_commission",
      },

      {
        title: "Agent Discount",
        dataIndex: "agent_discount",
        key: "agent_discount",
      },
      {
        title: "Agency Profit",
        dataIndex: "agency_profit",
        key: "agency_profit",
      },
    ];
  };

export const travelerDetailsTableColumn: () => ColumnsType<IGetSingleB2cBookingRequest> =
  () => {
    return [
      {
        title: "Adult",
        dataIndex: "traveler_adult",
        key: "traveler_adult",
      },
      {
        title: "Children",
        dataIndex: "traveler_children",
        key: "traveler_children",
      },

      {
        title: "Kids",
        dataIndex: "traveler_kids",
        key: "traveler_kids",
      },

      {
        title: "Infants",
        dataIndex: "traveler_infants",
        key: "traveler_infants",
      },
    ];
  };

export const agencyUsersDetailsTableColumn: () => ColumnsType<IGetSingleB2cBookingRequest> =
  () => {
    return [
      {
        title: "User Name",
        dataIndex: "user_name",
        key: "user_name",
      },

      {
        title: " Email",
        dataIndex: "user_email",
        key: "user_email",
      },
      {
        title: "Mobile Number",
        dataIndex: "user_mobile_number",
        key: "user_mobile_number",
      },
    ];
  };
