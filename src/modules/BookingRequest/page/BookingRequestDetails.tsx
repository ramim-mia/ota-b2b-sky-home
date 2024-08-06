import { Col, Divider, Row, Table, Tag } from "antd";
import { BreadcrumbProps } from "antd/lib";
import dayjs from "dayjs";
import { Render } from "keep-render";
import { Link, useParams } from "react-router-dom";
import { webRoutes } from "../../../route/RouteLinks";
import { useGetSingleBookingRequestDetailsQuery } from "../api/bookingRequestApiEndpoint";
import {
  fareDetailsTableColumn,
  travelSegmentsTableColumn,
} from "../utils/bookingdetailsTableColumn";
import { travelerTableColumns } from "../utils/BookingReavelersColum";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: webRoutes.bookingRequestDetails,
      title: <Link to={""}>Booking Request Details</Link>,
    },
  ],
};

const BookingRequestDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleBookingRequestDetailsQuery(id as string);

  const getCheckIn_outColor = (value: string) => {
    switch (value) {
      case "Approved":
        return "green";
      case "Cancelled":
        return "red";
      case "Pending":
        return "orange";
      default:
        return "";
    }
  };
  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center justify-between mx-4 mb-4">
        <div>
          <div className="flex justify-start gap-3">
            <span>Status : </span>
            <Tag color={getCheckIn_outColor(data?.data?.status ?? "")}>
              {data?.data?.status}
            </Tag>
          </div>

          <div className="mt-2">
            <span>Journey Type: </span>
            <span>{data?.data?.journey_type}</span>
          </div>
          <div className="mt-2">
            <span>Create Date : </span>
            <span>{dayjs(data?.data?.created_at).format("DD-MMM-YYYY")}</span>
          </div>
        </div>
      </div>
      <Row>
        <Col lg={24}>
          <Divider orientation="left">TRAVEL SEGMENTS</Divider>
          <Table
            columns={travelSegmentsTableColumn()}
            dataSource={data?.data && data?.data?.segments}
            loading={false}
            pagination={false}
            className="Table"
            rowClassName="TableTd"
            bordered={true}
          />
          <Render.When isTrue={!!(data?.data?.travelers?.length ?? 0)}>
            <Divider orientation="left" className="pt-3">
              TRAVELER DETAILS
            </Divider>
            <Table
              columns={travelerTableColumns}
              dataSource={data?.data?.travelers}
              loading={false}
              pagination={false}
              className="Table"
              rowClassName="TableTd"
              bordered={true}
            />
          </Render.When>
          <Divider orientation="left" className="pt-3">
            FARE DETAILS
          </Divider>
          <Table
            columns={fareDetailsTableColumn()}
            dataSource={[data?.data] as any}
            loading={false}
            pagination={false}
            className="Table"
            rowClassName="TableTd"
            bordered={true}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BookingRequestDetails;
