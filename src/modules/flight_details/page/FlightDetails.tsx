import { Button, Col, Divider, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import { useRevalidateQuery } from "../api/fligjhtDetailsEndpoints";
import FlightInfo from "../components/FlightInfo";
import TicketForm from "../components/TicketForm";
import TicketInfo from "../components/TicketInfo";
import TicketPrice from "../components/TicketPrice";
import { passengerCount } from "../utils/passengerCount";

const FlightDetails = () => {
  let { id } = useParams();
  const { data, isLoading, isFetching, isError } = useRevalidateQuery(
    id as string,
    { refetchOnMountOrArgChange: true }
  );

  // Count Flight Passenger's
  const passenger = data?.data?.passengers;
  const passengerQuantity = passenger?.length && passengerCount(passenger);

  return (
    <div className="px-2 md:px-8 ">
      <Divider orientation="left">
        <h3 className="text-[#003566] text-[20px] m-0 ">Review Your Booking</h3>
      </Divider>

      {isLoading || isFetching ? (
        <Loading />
      ) : isError || !passenger?.length ? (
        <div className="container flex items-center justify-center mx-auto min-w-screen">
          <div className="text-center">
            <h1 className="w-full text-center">
              This flight is already booked or something happen wrong
            </h1>
            <Button type="link" className="p-4">
              <Link className="text-lg tex-blue-500" to={"/flight-search"}>
                Search again
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <Row gutter={16}>
          <Col xl={18} lg={16} md={24} sm={24} xs={24}>
            {/* Displaying Ticket Details */}
            {data?.data?.flights?.map((item, index) => (
              <TicketInfo key={index} flight={item} passenger={passenger} />
            ))}
            <FlightInfo data={data?.data} />
            <TicketForm passengerQuantity={passengerQuantity} />
          </Col>

          <Col xl={6} lg={8} md={24} sm={24} xs={24}>
            <TicketPrice
              data={data?.data}
              passengerQuantity={passengerQuantity}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FlightDetails;
