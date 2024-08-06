import { Divider, Tabs, theme } from "antd";
import { Render } from "keep-render";
import { FaPlane } from "react-icons/fa";
import DynamicAirlineImage from "../../../app_components/DynamicAirlineImage";
import { convertTime, formatFlightDateTime } from "../../../utils/convertTime";
import { minutesToHoursAndMinutes } from "../../../utils/minutesToHoursAndMinutes";
import { IFlightDetail, IOption } from "../types/TypeFlight";

type Props = {
  flights?: IFlightDetail[];
  cabinClass: string;
  bookingCode: string;
};

export interface TabDataTypes {
  label: string;
  content: IOption[];
  layover: string[];
}

const FlightListCard_Details = ({
  flights,
  cabinClass,
  bookingCode,
}: Props) => {
  const { token } = theme.useToken();

  let tabs_data: TabDataTypes[] = [];

  flights?.map((flight, index) => {
    let departure_airport = flight?.options[0]?.departure?.airport_code;
    let arrival_airport =
      flight?.options[flight.options.length - 1].arrival?.airport_code;
    let content = flight?.options;
    const flight_layover = flight?.layover_time || [];

    const makeData: any = {
      label: departure_airport + "-" + arrival_airport,
      layover: flight_layover,
      content,
    };
    tabs_data.push(makeData);
  });
  // console.log(tabs_data);
  return (
    <div className="pb-4">
      <Tabs
        defaultActiveKey=""
        items={tabs_data?.map((tab, index) => {
          const id = String(index);
          return {
            label: tab?.label,
            key: id,
            children: (
              <div>
                {tab?.content?.map((item, index) => (
                  <div key={index}>
                    <div className="flex flex-col items-start justify-between border-t border-b md:flex-row md:items-center">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <DynamicAirlineImage
                          className="w-10 h-10 my-2"
                          airLineCode={item?.carrier?.carrier_marketing_logo}
                        />
                        <div>
                          <div className="flex gap-2">
                            <div
                              className="font-bold text-md "
                              style={{ color: "rgb(9 85 156)" }}
                            >
                              {item?.carrier?.carrier_marketing_airline}
                            </div>
                            <div className="text-sm">
                              (
                              {(item?.carrier?.carrier_marketing_code || "") +
                                "-" +
                                item?.carrier?.carrier_marketing_flight_number}
                              )
                            </div>
                          </div>
                          <div className="">
                            <div className="text-sm font-semibold">
                              Aircraft :{" "}
                              <span className="">
                                {item?.carrier?.carrier_aircraft_name}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm">
                            Operated by :{" "}
                            {item?.carrier?.carrier_operating_airline || ""}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        {cabinClass} {`(${bookingCode})`}
                      </div>
                    </div>
                    <Divider className="m-0 mb-4" />
                    <div className="flex flex-col items-start justify-between gap-4 mb-4 md:items-center md:gap-0 md:flex-row">
                      <div className="flex-1">
                        <div className="text-lg font-semibold">
                          {item?.departure?.airport_code} -{" "}
                          {convertTime(item?.departure?.time)}
                        </div>
                        <div className="text-sm">
                          {formatFlightDateTime(item.departure?.date)}
                        </div>

                        <div className="text-xs ">
                          {item?.departure?.airport}
                          <Render.When isTrue={!!item?.departure?.terminal}>
                            <span className="ml-1 text-xs text-gray-500">
                              (Terminal - {item?.departure?.terminal})
                            </span>
                          </Render.When>
                        </div>
                      </div>
                      <div className="flex-1">
                        <FaPlane
                          style={{ color: token.colorPrimaryActive }}
                          className="flex justify-center w-full text-2xl"
                        />
                        <p className="mt-1 text-sm font-semibold text-center">
                          {minutesToHoursAndMinutes(item.elapsedTime)?.time}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold">
                          {item?.arrival?.airport_code} -{" "}
                          {convertTime(item?.arrival?.time)}
                        </div>
                        <div className="text-sm">
                          {formatFlightDateTime(item.arrival?.date)}
                        </div>
                        <div className="text-sm tracking-wider"></div>
                        <div className="text-xs">
                          {item?.arrival?.airport}

                          <Render.When isTrue={!!item?.arrival?.terminal}>
                            <span className="text-xs text-gray-500">
                              (Terminal - {item?.arrival?.terminal})
                            </span>
                          </Render.When>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Render.When isTrue={Number(tab?.layover[index]) !== 0}>
                        <div className="text-center bg-blue-300 rounded-md">
                          <h4 className="p-2 font-semibold text-blue-800 bg-blue-100 rounded-md">
                            Flight Layover at
                            <span className="px-2">
                              {item.arrival?.airport}
                            </span>
                            for -
                            <span className="ml-2">
                              {
                                minutesToHoursAndMinutes(
                                  Number(tab?.layover[index])
                                )?.time
                              }
                            </span>
                          </h4>
                        </div>
                      </Render.When>
                    </div>
                  </div>
                ))}
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default FlightListCard_Details;
