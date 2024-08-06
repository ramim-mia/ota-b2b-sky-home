import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import { VscArrowSwap } from "react-icons/vsc";
import SelectAirport from "../elements/SelectAirport";
import SelectRangeDate from "../elements/SelectRangeDate";

const RoundWay = ({
  setBody,
  cabinClass,
  setPaginationCondition,
  setPassenger,
}: any) => {
  const [fromAirport, setFromAirport] = useState<any>();
  const [toAirport, setToAirport] = useState<any>();
  const [selectDate, setSelectDate] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);

  const [form] = Form.useForm();

  useEffect(() => {
    const searchFlight = JSON.parse(
      localStorage.getItem("flightSearchRoundWay") as string
    );
    if (searchFlight?.OriginDestinationInformation?.length) {
      console.log(searchFlight?.PassengerTypeQuantity);
      setFromAirport({
        iata_code:
          searchFlight.OriginDestinationInformation[0].OriginLocation
            .LocationCode,
      });
      setToAirport({
        iata_code:
          searchFlight.OriginDestinationInformation[0].DestinationLocation
            .LocationCode,
      });
      setSelectDate([
        dayjs(searchFlight.OriginDestinationInformation[0].DepartureDateTime),
        dayjs(searchFlight.OriginDestinationInformation[1].DepartureDateTime),
      ]);
    } else {
      setFromAirport({
        iata_code: "DAC",
      });
      setToAirport({
        iata_code: "CXB",
      });
      form.setFieldsValue({
        returnDate: [dayjs(), dayjs().add(1, "day")],
      });
      setSelectDate([dayjs(), dayjs().add(1, "day")]);
    }
  }, []);

  const handleSwap = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const handleSubmit = () => {
    if (fromAirport && toAirport && selectDate[0] && selectDate[1]) {
      const OriginDestinationInformation = [
        {
          RPH: "1",
          DepartureDateTime: selectDate[0].format("YYYY-MM-DDTHH:mm:ss"),
          DestinationLocation: {
            LocationCode: toAirport.iata_code,
          },
          OriginLocation: {
            LocationCode: fromAirport.iata_code,
          },
          TPA_Extensions: {
            CabinPref: { Cabin: cabinClass, PreferLevel: "Preferred" },
          },
        },
        {
          RPH: "2",
          DepartureDateTime: selectDate[1].format("YYYY-MM-DDTHH:mm:ss"),
          DestinationLocation: {
            LocationCode: fromAirport.iata_code,
          },
          OriginLocation: { LocationCode: toAirport.iata_code },
          TPA_Extensions: {
            CabinPref: { Cabin: cabinClass, PreferLevel: "Preferred" },
          },
        },
      ];
      setPaginationCondition("search");
      setBody({ OriginDestinationInformation, route: "RoundWay" });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      returnDate: selectDate,
    });
    if (selectDate[0] && selectDate[1]) {
      handleSubmit();
    }
  }, [selectDate]);

  return (
    <>
      <Form autoComplete="off" form={form}>
        <Row gutter={[5, 10]} className="relative">
          <Col sm={6} xs={24} className="flex justify-between">
            <SelectAirport
              airport={fromAirport}
              setAirport={setFromAirport}
              name="From?"
            />
          </Col>
          <div className="absolute md:top-5  md:left-[24%] left-[90%] top-12  z-20 ">
            <Button onClick={handleSwap} className="" size="small">
              <VscArrowSwap className="text-[12px] hidden md:block" />
              <LuArrowDownUp className="text-[12px] md:hidden block" />
            </Button>
          </div>

          <Col sm={6} xs={24}>
            <SelectAirport
              airport={toAirport}
              setAirport={setToAirport}
              name="To?"
            />
          </Col>

          <Col lg={12} xs={24} className="flex justify-between">
            <SelectRangeDate
              name="returnDate"
              placeholder="Return Date"
              onDateChange={setSelectDate}
              selectedDate={selectDate}
              form={form}
            />

            <Button
              type="text"
              className="hidden ms-2 search-button md:block"
              size="large"
              onClick={handleSubmit}
              style={{
                background: "rgb(9 85 156)",
                color: "#fff",
                minHeight: "4rem",
                borderRadius: "0",
                height: "6.8vh",
              }}
            >
              <FaTelegramPlane className="m-0 text-[15px]" />
              <p className="text-sm leading-4">Search</p>
            </Button>
          </Col>
          {/* only mobile */}
          <Col xs={24} className="block w-full md:hidden">
            <Button
              type="text"
              className="w-full search-button"
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

export default RoundWay;
