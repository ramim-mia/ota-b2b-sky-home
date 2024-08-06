import { Card, Col, Divider, Row, theme } from "antd";

import Style from "../style/Flight_details.module.css";

import Lottie from "lottie-react";
import DynamicAirlineImage from "../../../app_components/DynamicAirlineImage";
import planeAnimation from "../../../assets/lottie/plane.json";
import { convertTime, formatFlightDateTime } from "../../../utils/convertTime";
import { minutesToHoursAndMinutes } from "../../../utils/minutesToHoursAndMinutes";
import {
  IFlightDetail,
  IPassenger,
} from "../../flightSearchNew/types/TypeFlight";

type Props = {
  flight: IFlightDetail;
  passenger: IPassenger[];
};

const TicketInfo = ({ flight, passenger }: Props) => {
  const { token } = theme.useToken();

  const flight_option = flight.options;
  const flight_layover = flight?.layover_time || [];

  const cabinClass =
    passenger?.[0]?.availability[0].segments[0].cabin_type || "";
  const bookingCode =
    passenger?.[0]?.availability[0].segments[0].booking_code || "";

  return (
    <>
      <Card className="mt-2 mb-3">
        {flight_option?.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <DynamicAirlineImage
                className="w-auto h-10"
                airLineCode={item?.carrier.carrier_marketing_logo}
              />
              <div className="flex items-center justify-between w-full">
                <div>
                  <h2 className="flex gap-2 m-0 text-base text-blue-600">
                    {item?.arrival.airport}
                    <div className="text-gray-500 text-xs flex gap-1 my-[3px]">
                      (
                      {item?.carrier.carrier_marketing_airline +
                        " " +
                        item.carrier.carrier_marketing_flight_number}
                      )
                    </div>
                  </h2>

                  <div className="">
                    <div className="text-sm font-semibold">
                      Aircraft :{" "}
                      <span className="text-sm">
                        {item?.carrier.carrier_aircraft_name}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    Operated by :{" "}
                    {item?.carrier.carrier_operating_airline || ""}
                  </div>
                </div>

                <div>
                  <p className="text-[#053969] font-medium">
                    {cabinClass}
                    {`(${bookingCode})`}{" "}
                  </p>
                </div>
              </div>
            </div>

            <Divider className="m-0 mt-5" />
            <div className={Style.details}>
              <Row gutter={16}>
                <Col lg={8} md={12} sm={24} xs={24}>
                  <div className={Style.depart_arrival}>
                    <p className="text-sm font-semibold ">Departure Flight</p>
                    <h2 className="text-[#053969]">
                      {item?.departure.airport_code}-
                      {convertTime(item?.departure.time)}
                    </h2>
                    <p>{formatFlightDateTime(item?.departure.date)}</p>
                    <p>
                      {" "}
                      {item?.departure.airport}
                      {item?.departure.terminal && (
                        <span className="ml-1 text-xs text-gray-500">
                          (Terminal - {item?.departure.terminal})
                        </span>
                      )}
                    </p>
                  </div>
                </Col>
                <Col lg={8} md={12} sm={24} xs={24}>
                  <div className="w-[70%] me-6 mt-6 m-auto text-center">
                    <Lottie
                      animationData={planeAnimation}
                      loop={true}
                      className="plan-animation"
                    />
                    <p className="font-bold text-[#053969]">
                      {minutesToHoursAndMinutes(item.elapsedTime)?.time}
                    </p>
                  </div>
                </Col>
                <Col
                  lg={8}
                  md={12}
                  sm={24}
                  xs={24}
                  className="flex md:justify-end"
                >
                  <div className={Style.depart_arrival}>
                    <p className="text-sm font-semibold">Arrival Flight</p>
                    <h2 className="text-[#053969]">
                      {item?.arrival.airport_code}-
                      {convertTime(item?.arrival.time)}
                    </h2>
                    <p>{formatFlightDateTime(item?.arrival.date)}</p>
                    <p>
                      {" "}
                      {item?.arrival.airport}
                      {item?.arrival.terminal && (
                        <span className="text-xs text-gray-500">
                          (Terminal - {item?.arrival.terminal})
                        </span>
                      )}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              {Number(flight_layover[index]) !== 0 && (
                <div className="text-center bg-blue-300 rounded-md">
                  <h4 className="p-2 font-semibold text-blue-800 bg-blue-100 rounded-md">
                    Flight Layover at
                    <span className="px-2">
                      {flight_option[index].arrival.airport}
                    </span>
                    for -
                    <span className="ml-2 capitalize">
                      {minutesToHoursAndMinutes(flight_layover[index])?.time}
                    </span>
                  </h4>
                </div>
              )}
            </div>
          </div>
        ))}
      </Card>
    </>
  );
};

export default TicketInfo;
