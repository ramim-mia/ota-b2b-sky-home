import { Button, Col, Divider, Form, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { VscArrowSwap } from "react-icons/vsc";
import SelectAirport from "../elements/SelectAirport";
import SelectDate from "../elements/SelectDate"; // Import the SelectDate component

import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { getOrdinalSuffix } from "../utils/getOrdinalSuffix";

const MultiCity = ({ setBody, cabinClass, setPaginationCondition }: any) => {
  const [cities, setCities] = useState<
    { origin: any; destination: any; date: dayjs.Dayjs | null }[]
  >([
    { origin: null, destination: null, date: null },
    { origin: null, destination: null, date: null },
  ]);
  const [form] = Form.useForm();

  // Function to add a new city row
  const addCity = () => {
    if (cities.length < 6) {
      setCities([...cities, { origin: null, destination: null, date: null }]);
    }
  };

  // Function to handle removal of a city row
  const removeCity = (index: number) => {
    setCities(cities.filter((_, i) => i !== index));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (
      cities.some(
        (city) =>
          city.origin === null ||
          city.destination === null ||
          city.date === null
      )
    ) {
      return;
    }

    const OriginDestinationInformation = cities.map((city, index) => ({
      RPH: (index + 1)?.toString(),
      DepartureDateTime: city.date?.format("YYYY-MM-DDTHH:mm:ss"),
      DestinationLocation: {
        LocationCode: city.destination?.iata_code,
      },
      OriginLocation: {
        LocationCode: city.origin?.iata_code,
      },
      TPA_Extensions: {
        CabinPref: { Cabin: cabinClass, PreferLevel: "Preferred" },
      },
    }));

    setPaginationCondition("search");
    setBody({ OriginDestinationInformation, route: "MultiCity" });
  };

  // Function to handle airport swap
  const handleSwap = (index: number) => {
    setCities(
      cities.map((city, i) =>
        i === index
          ? { ...city, origin: city.destination, destination: city.origin }
          : city
      )
    );
  };

  useEffect(() => {
    const searchFlight = JSON.parse(
      localStorage.getItem("flightSearchMultiCity") as string
    );

    if (searchFlight?.OriginDestinationInformation?.length) {
      const newCities = searchFlight.OriginDestinationInformation.map(
        (info: any) => ({
          origin: { iata_code: info.OriginLocation.LocationCode },
          destination: { iata_code: info.DestinationLocation.LocationCode },
          date: dayjs(info.DepartureDateTime),
        })
      );

      setCities(newCities);
      // Set form values
      newCities.forEach((city: { date: any }, index: any) => {
        form.setFieldsValue({
          [`date${index}`]: city.date,
        });
      });
    } else {
      const defaultCities = [
        {
          origin: { iata_code: "DAC" },
          destination: { iata_code: "JFK" },
          date: dayjs(),
        },
        {
          origin: { iata_code: "JFK" },
          destination: { iata_code: "DAC" },
          date: dayjs().add(1, "day"),
        },
      ];

      setCities(defaultCities);
      defaultCities.forEach((city, index) => {
        form.setFieldsValue({
          [`date${index}`]: city.date,
        });
      });
    }
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [cities]);
  return (
    <div className="w-full">
      <Form autoComplete="off" form={form}>
        <Row gutter={[5, 10]}>
          {cities.map((city, index) => (
            <Row gutter={[5, 5]} key={index} className="relative w-full">
              <div>
                {index > 0 && (
                  <Button
                    type="text"
                    danger
                    onClick={() => removeCity(index)}
                    className="absolute right-0 block m-auto text-center top-2"
                  >
                    <CloseOutlined />
                  </Button>
                )}
              </div>
              <Divider
                className="mt-4 mb-2 "
                children={
                  <div className="relative">
                    <p className="text-xs">{`${index + 1}${getOrdinalSuffix(
                      index + 1
                    )} Flight`}</p>
                  </div>
                }
                orientation="left"
              />

              <Col lg={8} xs={12} className="flex justify-between">
                <SelectAirport
                  airport={city.origin}
                  setAirport={(airport: any) => {
                    setCities(
                      cities.map((city, i) =>
                        i === index ? { ...city, origin: airport } : city
                      )
                    );
                  }}
                  name={`From ${index + 1}`}
                  placeholder="From?"
                />
              </Col>
              <div className="absolute  2xl:left-[32.4%] xl:left-[32%] left-[45.5%] top-[58%] z-20 ">
                <Button
                  onClick={() => handleSwap(index)}
                  className=""
                  size="small"
                >
                  <VscArrowSwap className="text-[12px] " />
                </Button>
              </div>

              <Col lg={8} xs={12}>
                <SelectAirport
                  airport={city.destination}
                  setAirport={(airport: any) => {
                    setCities(
                      cities.map((city, i) =>
                        i === index ? { ...city, destination: airport } : city
                      )
                    );
                  }}
                  name={`To ${index + 1}`}
                  placeholder="To?"
                />
              </Col>
              <Col lg={8} xs={24} className="flex items-center justify-between">
                <SelectDate
                  name={`date${index}`}
                  placeholder={`Departure Date`}
                  onDateChange={(date) => {
                    setCities(
                      cities.map((city, i) =>
                        i === index ? { ...city, date } : city
                      )
                    );
                  }}
                  selectedDate={city.date}
                  form={form}
                />
              </Col>
            </Row>
          ))}
        </Row>

        <div className="flex justify-between mt-5 text-lg">
          <Button icon={<PlusOutlined />} onClick={addCity} type="link">
            Add another flight
          </Button>

          <Button
            style={{ background: "rgb(9 85 156)" }}
            type="primary"
            onClick={handleSubmit}
            className="mt-2 "
          >
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MultiCity;
