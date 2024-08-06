import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { VscArrowSwap } from "react-icons/vsc";
import SelectAirport from "../elements/SelectAirport";
import SelectDate from "../elements/SelectDate";

import { FaTelegramPlane } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import lib from "../../../utils/lib";
import { ISearchHistoryData } from "../types/flightSearchType";
import { searchHistoryReformate } from "../utils/searchHistoryReformate";

const OneWay = ({ setBody, cabinClass, setPaginationCondition }: any) => {
  const [fromAirport, setFromAirport] = useState<any>();
  const [toAirport, setToAirport] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null); // State to store selected date
  const [form] = Form.useForm();

  /*initial set field---------- */
  useEffect(() => {
    const searchFlight = JSON.parse(
      lib.getFromLocalStorage("flightSearchOneWay") as string
    );
    if (
      searchFlight?.OriginDestinationInformation?.length &&
      searchFlight?.PassengerTypeQuantity?.length
    ) {
      const history = {
        search_data: {
          PassengerTypeQuantity: searchFlight.PassengerTypeQuantity,
          OriginDestinationInformation:
            searchFlight.OriginDestinationInformation,
        },
      };
      const historyDataset = searchHistoryReformate(
        history as ISearchHistoryData
      );

      setFromAirport({
        iata_code: historyDataset?.OriginDestinationInformation[0].from,
        name: historyDataset?.OriginDestinationInformation[0].from_name,
      });
      setToAirport({
        iata_code: historyDataset?.OriginDestinationInformation[0].to,
        name: historyDataset?.OriginDestinationInformation[0].to_name,
      });
      form.setFieldsValue({
        date: historyDataset?.OriginDestinationInformation[0].date,
      });

      setSelectedDate(historyDataset?.OriginDestinationInformation[0].date);
    } else {
      setFromAirport({
        iata_code: "DAC",
        // name: 'Dhaka - Hazrat Shahjalal International Airport',
      });
      setToAirport({
        iata_code: "CXB",
        // name: "Cox's Bazar Airport",
      });
      form.setFieldsValue({
        date: dayjs().add(3, "day"),
      });
      setSelectedDate(dayjs().add(3, "day"));
    }
  }, []);

  const handleSwap = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  // submit functionality
  const handleSubmit = () => {
    const OriginDestinationInformation = [
      {
        RPH: "1",
        DepartureDateTime: selectedDate?.format("YYYY-MM-DDTHH:mm:ss"),
        DestinationLocation: {
          LocationCode: toAirport.iata_code,
          name: toAirport.name,
        },
        OriginLocation: {
          LocationCode: fromAirport.iata_code,
          name: fromAirport.name,
        },
        TPA_Extensions: {
          CabinPref: { Cabin: cabinClass, PreferLevel: "Preferred" },
        },
      },
    ];
    setPaginationCondition("search");
    setBody({ OriginDestinationInformation, route: "OneWay" });
  };

  useEffect(() => {
    if (!selectedDate) return;
    handleSubmit();
  }, [selectedDate]);

  return (
    <>
      <Form autoComplete="off" form={form}>
        <Row gutter={[5, 10]} className="relative">
          <Col md={8} xs={24}>
            <div className="flex justify-between">
              <SelectAirport
                airport={fromAirport}
                setAirport={setFromAirport}
                name="From?"
              />
            </div>
          </Col>
          <div className="absolute 2xl:top-5 xl:top-3  2xl:left-[32.4%]  xl:left-[31.9%]  md:left-[31.9%] left-[90%] top-[27%] z-20 ">
            <Button onClick={handleSwap} className="" size="small">
              <VscArrowSwap className="text-[12px] hidden md:block" />
              <LuArrowDownUp className="text-[12px] md:hidden block" />
            </Button>
          </div>

          <Col md={8} xs={24}>
            <SelectAirport
              airport={toAirport}
              setAirport={setToAirport}
              name="To?"
            />
          </Col>
          <Col md={8} xs={24} className="flex justify-between">
            <SelectDate
              name="date"
              placeholder={"Departure Date"}
              onDateChange={setSelectedDate}
              selectedDate={selectedDate}
              form={form}
            />
            <Button
              type="text"
              className="ms-2 search-button min-h-16 "
              size="large"
              onClick={handleSubmit}
              style={{
                background: "rgb(9 85 156)",
                color: "#fff",
                borderRadius: "0",
                height: "6.8vh",
              }}
            >
              <FaTelegramPlane className="m-0 text-[15px]" />
              <p className="text-sm leading-4">Search</p>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default OneWay;
