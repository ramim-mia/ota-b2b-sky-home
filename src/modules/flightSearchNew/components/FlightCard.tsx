import { Collapse, Divider, Row, Segmented, theme } from "antd";
import { CollapseProps } from "antd/lib";
import { Render } from "keep-render";
import Lottie from "lottie-react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import DynamicAirlineImage from "../../../app_components/DynamicAirlineImage";
import planeAnimation from "../../../assets/lottie/plane.json";
import useBreakpoint from "../../../utils/Breakpoin";
import { convertTime, formatFlightDateTime } from "../../../utils/convertTime";
import { minutesToHoursAndMinutes } from "../../../utils/minutesToHoursAndMinutes";
import FlightBaggage from "../elements/FlightBaggage";
import FlightFareSummary from "../elements/FlightFareSummary";
import RefundReissuePolicy from "../elements/RefundReissuePolicy";
import SegmentsTable from "../elements/SegmentsTable";
import { IFlight } from "../types/TypeFlight";
import FlightListCard_Details from "./FlightListCard_Details";

type Props = {
  Item: IFlight;
};
const FlightCard = ({ Item }: Props) => {
  const { token } = theme.useToken();

  const cabinClass =
    Item?.passengers?.[0]?.availability[0]?.segments[0]?.cabin_type || "";
  const bookingCode =
    Item?.passengers?.[0]?.availability[0]?.segments[0]?.booking_code || "";

  const short = (
    <div className="flex flex-col gap-6 xl:flex-row md:flex-col">
      <div className="flex flex-col md:flex-row items-center flex-[3] justify-center w-full ">
        <div className="flex flex-col items-center mx-auto w-60 ">
          <DynamicAirlineImage
            className="w-20 h-auto rounded"
            airLineCode={Item?.carrier_logo}
          />
          <div className="text-center">
            <span className="text-sm">
              <span className="text-[#1677ff]">{Item?.carrier_name}</span>
            </span>{" "}
            <br />
          </div>
        </div>

        <div className="flex flex-col">
          {Item?.flights?.map((flight, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-2 p-4 md:flex-row"
            >
              <div className="w-full py-4">
                <div className="flex flex-col items-center justify-between gap-2 px-6 md:flex-row ">
                  {/* //! departure flight details  */}
                  <div className="w-full md:max-w-[40%]">
                    <p className="font-semibold text-md">
                      {flight?.options[0]?.departure.airport} (
                      {flight?.options[0]?.departure.airport_code}){" - "}
                      {convertTime(flight?.options[0]?.departure.time)}
                    </p>

                    <p className="text-xs text-gray-500">
                      {formatFlightDateTime(flight?.options[0]?.departure.date)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {flight?.options[0]?.departure.city}
                    </p>
                  </div>
                  {/* //! time related  */}
                  <div className="flex flex-col items-center justify-center w-full mt-2">
                    <div className="flex justify-center w-full text-xs font-light ">
                      <span className="text-[#1677ff]">
                        {flight?.options?.length - 1
                          ? flight?.options?.length - 1 + " Stop"
                          : "Direct"}
                      </span>
                    </div>

                    <div className=" w-28">
                      <Lottie
                        animationData={planeAnimation}
                        loop={true}
                        className="plan-animation"
                      />
                    </div>

                    <div className=" flex font-light text-xs  justify-center w-full transform translate-y-[-5px]">
                      <span className="block text-center text-gray-500">
                        {minutesToHoursAndMinutes(flight?.elapsed_time)?.time}
                      </span>
                    </div>
                  </div>
                  {/* //! arrival flight details  */}
                  <div className="w-full md:max-w-[40%]">
                    <p className="font-semibold text-md">
                      {
                        flight?.options[flight?.options.length - 1]?.arrival
                          .airport
                      }
                      {" ("}
                      {
                        flight?.options[flight?.options.length - 1]?.arrival
                          .airport_code
                      }
                      {")"} {" - "}
                      {convertTime(
                        flight?.options[flight?.options.length - 1]?.arrival
                          .time
                      )}
                    </p>

                    <p className="text-xs text-gray-500">
                      {formatFlightDateTime(
                        flight?.options[flight?.options.length - 1]?.arrival
                          .date
                      )}
                    </p>

                    <p className="text-xs text-gray-500">
                      {
                        flight?.options[flight?.options.length - 1]?.arrival
                          .city
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING INFORMATION ----> */}
      <div
        style={{
          background:
            "linear-gradient(121.52deg, rgb(93, 127, 158) 0%, rgb(9 85 156) 77.49%)",
          color: "#fff",
        }}
        className="flex-[1] py-6 px-3 rounded-r-lg"
      >
        <div className="flex flex-col justify-center h-[80%] gap-2  2xl:px-4 xl:px-3">
          <div className="flex flex-col justify-between">
            <div className="flex justify-between w-full text-right">
              <span>Price</span>
              <span>BDT {Item.fare.total_price?.toFixed(2) || 0}</span>
            </div>

            <div className="flex justify-between w-full text-right">
              <span>Base Fare</span>
              <span>BDT {Item.fare.base_fare?.toFixed(2) || 0}</span>
            </div>

            <div className="flex justify-between w-full text-right">
              <span>Tax + AIT</span>
              <span>
                BDT {(Item.fare.total_tax + Item.fare.ait)?.toFixed(2) || 0}
              </span>
            </div>

            <div className="flex justify-between w-full text-right">
              <span>Discount</span>
              <span>BDT {Item.fare.discount?.toFixed(2) || 0}</span>
            </div>
            <Divider dashed className="py-0 my-0 bg-gray-300" />

            <div className="flex justify-between w-full pt-1 font-semibold text-right">
              <span>Payable</span>
              <span>BDT {Item.fare.payable?.toFixed(2) || 0}</span>
            </div>
          </div>

          <Link to={`/flight-details/${Item.flight_id}`}>
            <div
              style={{
                background: "rgb(34 116 193)",
                borderRadius: "3px",
                color: "#fff",
              }}
              className="book-now-button"
            >
              <div className="flex items-center justify-between p-1 transition-all duration-200 rounded cursor-pointer bg-button hover:bg-primary group">
                <div className="px-3 text-xs font-semibold group-hover:text-white">
                  BOOK NOW
                </div>

                <BsArrowRight className="mr-3 text-base font-semibold group-hover:text-white" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
  type Props = {
    cabinClass: string;
    bookingCode: string;
  };
  const Details = ({ cabinClass, bookingCode }: Props) => {
    const [route, setRoute] = useState("Flight Details");
    const handleRouteChange = (value: string) => {
      setRoute(value);
    };
    const isMobile = useBreakpoint();
    return (
      <div
        style={{
          background: token.colorBgContainerDisabled,
          padding: !isMobile ? "25px 28px" : "15px",
          marginTop: "12px",
        }}
      >
        <div className="text-center w-[78vw] md:w-full overflow-scroll ">
          <Segmented
            defaultValue="Flight Details"
            style={{ marginBottom: 10, transition: "none" }}
            onChange={(value) => handleRouteChange(value as string)}
            options={[
              "Flight Details",
              "Fare Summary",
              "Refund Reissue Policy",
              "Baggage",
              "Passenger",
            ]}
          />
        </div>

        <Row justify={"space-between"}>
          <div className="flex-[1.3] justify-center items-center border-r">
            <Render.When isTrue={route === "Flight Details"}>
              <FlightListCard_Details
                flights={Item?.flights}
                cabinClass={cabinClass}
                bookingCode={bookingCode}
              />
            </Render.When>
            <Render.When isTrue={route === "Fare Summary"}>
              <FlightFareSummary flight={Item} />
            </Render.When>
            <Render.When isTrue={route === "Refund Reissue Policy"}>
              <RefundReissuePolicy />
            </Render.When>
            <Render.When isTrue={route === "Baggage"}>
              <FlightBaggage flightBaggage={Item.passengers} />
            </Render.When>
            <Render.When isTrue={route === "Passenger"}>
              <SegmentsTable passengers={Item.passengers} />
            </Render.When>
          </div>
        </Row>
      </div>
    );
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: short,
      children: <Details cabinClass={cabinClass} bookingCode={bookingCode} />,
      showArrow: true,
      style: { background: token.colorBgBase, borderRadius: "10px" },
    },
  ];

  return (
    <>
      <div className="relative flight-cards">
        <Collapse
          size="small"
          items={items}
          expandIcon={({ isActive }) => (
            <Render>
              <Render.When isTrue={isActive!}>
                <p
                  className="absolute right-4 xl:bottom-[7px] bottom-[4px]"
                  style={{ fontSize: "13px" }}
                >
                  <span className="text-[#fff]">Hide Details</span>
                  <IoIosArrowUp
                    className="ms-2 text-[15px] text-[#fff]"
                    style={{ transform: "translate(0px, 1px)" }}
                  />
                </p>
              </Render.When>
              <Render.Else>
                <p
                  className="absolute right-4 xl:bottom-[7px] bottom-[4px]"
                  style={{ fontSize: "13px" }}
                >
                  <span className="text-[#fff] ">View Details</span>
                  <IoIosArrowDown
                    className="ms-2 text-[15px] text-[#fff]"
                    style={{ transform: "translate(0px, 1px)" }}
                  />
                </p>
              </Render.Else>
            </Render>
          )}
          className="p-0 mb-3 border-0"
        />
      </div>
    </>
  );
};

export default FlightCard;
