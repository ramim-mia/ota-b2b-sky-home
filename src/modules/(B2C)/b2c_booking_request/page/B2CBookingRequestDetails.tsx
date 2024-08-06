import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Col,
  Divider,
  Popconfirm,
  Row,
  Table,
  Tag,
  message,
} from "antd";

import { BreadcrumbProps } from "antd/lib";
import dayjs from "dayjs";
import BasePageContainer from "../../../../app_components/PageContainer";
import { webRoutes } from "../../../../route/RouteLinks";

import errorHandler from "../../../common/errorHandler";
import {
  useCancelB2CBookingRequestMutation,
  useGetSingleB2cBookingRequestQuery,
} from "../api/b2cBookingRequestEndPoint";
import {
  agencyUsersDetailsTableColumn,
  customerFareDetailsTableColumn,
  travelSegmentsTableColumn,
  travelerDetailsTableColumn,
} from "../utils/b2cbBookingdetailsTableColumn";

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

const B2CBookingRequestDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleB2cBookingRequestQuery(id as string);
  const navigate = useNavigate();
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

  const [cancelBookingRequest, { isLoading, isSuccess, isError, error }] =
    useCancelB2CBookingRequestMutation();

  const handleCancelConfirm = async (id: string) => {
    await cancelBookingRequest(id);
  };
  useEffect(() => {
    if (isSuccess) {
      message.success("B2C Booking Request has been Cancelled");
      navigate("/b2c/bookingRequest");
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isSuccess]);

  return (
    <>
      <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
        <div className="flex items-center justify-between mb-4">
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
          <div>
            <Popconfirm
              title="Cancel Booking Request"
              description="Are you sure you want to cancel?"
              onConfirm={() => handleCancelConfirm(id as string)}
              okButtonProps={{ loading: isLoading }}
            >
              <Button type="primary" danger>
                Cancel Request
              </Button>
            </Popconfirm>
          </div>
        </div>
        <Row gutter={[20, 10]}>
          <Col>
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

            <Divider orientation="left" className="pt-3">
              TRAVELER DETAILS
            </Divider>
            <Table
              columns={travelerDetailsTableColumn()}
              dataSource={[data?.data] as any}
              loading={false}
              pagination={false}
              className="Table"
              rowClassName="TableTd"
              bordered={true}
            />

            <Divider orientation="left" className="pt-3">
              CUSTOMER FARE DETAILS
            </Divider>
            <Table
              columns={customerFareDetailsTableColumn()}
              dataSource={[data?.data] as any}
              loading={false}
              pagination={false}
              className="Table"
              rowClassName="TableTd"
              bordered={true}
            />
            {/* <Divider orientation='left' className='pt-3'>
              AGENT FARE DETAILS
            </Divider>
            <Table
              columns={agentFareDetailsTableColumn()}
              dataSource={[data?.data] as any}
              loading={false}
              pagination={false}
              className='Table'
              rowClassName='TableTd'
              bordered={true}
            /> */}

            <Divider orientation="left" className="pt-3">
              AGENCY USER DETAILS
            </Divider>
            <Table
              columns={agencyUsersDetailsTableColumn()}
              dataSource={[data?.data] as any}
              loading={false}
              pagination={false}
              className="Table"
              rowClassName="TableTd"
              bordered={true}
            />
          </Col>
        </Row>
      </BasePageContainer>
    </>
  );
};

export default B2CBookingRequestDetails;
