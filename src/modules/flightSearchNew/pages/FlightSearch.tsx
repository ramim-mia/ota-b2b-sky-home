import { Button, Drawer, Form, Pagination, Segmented } from "antd";
import { Render } from "keep-render";
import { useEffect, useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import lib from "../../../utils/lib";
import { HTTPResponse } from "../../common/commonType";
import Loading from "../../common/Loading";
import {
  useFlightFilterV2Query,
  useFlightSearchV2Mutation,
} from "../api/flightSearchEndpoints";
import FlightCard from "../components/FlightCard";
import FlightSearchSideBar from "../components/FlightSearchSideBar";
import MultiCity from "../components/MultiCity";
import OneWay from "../components/OneWay";
import RoundWay from "../components/RoundWay";
import SelectClass from "../elements/SelectClass";
import SelectPassenger from "../elements/SelectPassenger";
import SelectRoute from "../elements/SelectRoute";
import TopFilterComponents from "../elements/TopFilterComponents";
import { FilterState } from "../types/flightSearchType";
import { TFlightData } from "../types/TypeFlight";
import { generatePassengerTypeQuantity } from "../utils/generatePassengerQuantity";
import backgroundImage from "../../../assets/images/b_1.jpg";
const initialFilterState: FilterState = {
  carrier_operating: "",
  max_price: "",
  min_price: "",
  sort_by: "",
  stoppage: "",
  refundable: "",
};

const initialPassengerState = {
  adult: 1,
  kids: 0,
  children: 0,
  infant: 0,
};

const FlightSearch = () => {
  const [form] = Form.useForm();
  const [route, setRoute] = useState(
    localStorage.getItem("route") || "One Way"
  );
  const [cabinClass, setCabinClass] = useState<any>("Y");
  const [body, setBody] = useState<any>({});

  const [passenger, setPassenger] = useState(initialPassengerState);
  const [filter, setFilter] = useState<FilterState>(initialFilterState);
  const [paginationCondition, setPaginationCondition] = useState<
    "search" | "filter"
  >("search");
  const [data, setData] = useState<HTTPResponse<TFlightData> | undefined>();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });

  useEffect(() => {
    if (route) {
      localStorage.setItem("route", route);
    }
    setFilter(initialFilterState);
  }, [route]);

  useEffect(() => {
    setPagination((pre) => {
      return {
        ...pre,
        current: 1,
      };
    });
  }, [
    filter.carrier_operating ||
      filter.stoppage ||
      filter.refundable ||
      filter.sort_by ||
      filter.max_price ||
      filter.min_price,
  ]);

  const [
    flightSearchV2,
    { isError, isLoading, isSuccess, data: flightResponse },
  ] = useFlightSearchV2Mutation();

  const generateQueryArgs = (filter: FilterState) => {
    return Object.entries(filter)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };
  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination({ current, pageSize });
  };

  const {
    data: filterData,
    isFetching,
    isLoading: filterLoadingRTK,
    refetch,
  } = useFlightFilterV2Query(generateQueryArgs(filter), {
    skip: !Object.values(filter).some((item) => item),
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (
      isSuccess &&
      flightResponse &&
      flightResponse.data &&
      !Object.values(filter).some((item) => item)
    ) {
      setData(flightResponse);
    } else if (filterData) {
      setData(filterData);
      if (paginationCondition === "filter") {
        refetch();
      }
    }
  }, [isSuccess, flightResponse, filterData, isLoading, filter]);

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      size: pagination.pageSize,
      page: pagination.current,
    }));
  }, [pagination.current, pagination.pageSize]);

  const prepareFlightDataBody = (body: any, passengerTypeQuantity: any) => {
    const newOriginDestinationInformation =
      body.OriginDestinationInformation.map((info: any) => {
        const { name, ...restDestinationLocation } = info.DestinationLocation;
        const { name: origin_airport_name, ...restOriginLocation } =
          info.OriginLocation;
        return {
          ...info,
          OriginLocation: restOriginLocation,
          DestinationLocation: restDestinationLocation,
        };
      });

    return {
      OriginDestinationInformation: newOriginDestinationInformation,
      PassengerTypeQuantity: passengerTypeQuantity,
    };
  };

  const handleSearch = () => {
    if (paginationCondition === "search" && Object.keys(body).length > 0) {
      const passengerTypeQuantity = generatePassengerTypeQuantity({
        ADT: passenger.adult,
        C11: passenger.children,
        INF: passenger.infant,
        C05: passenger.kids,
      });
      const flightDataBody = prepareFlightDataBody(body, passengerTypeQuantity);

      const localFlightDataBody = {
        OriginDestinationInformation: body.OriginDestinationInformation,
        PassengerTypeQuantity: passengerTypeQuantity,
      };

      setFilter(initialFilterState);
      flightSearchV2({ body: flightDataBody });

      if (body.route === "OneWay") {
        lib.setLocalStorage(
          "flightSearchOneWay",
          JSON.stringify(localFlightDataBody)
        );
      } else if (body.route === "RoundWay") {
        lib.setLocalStorage(
          "flightSearchRoundWay",
          JSON.stringify(localFlightDataBody)
        );
      } else {
        lib.setLocalStorage(
          "flightSearchMultiCity",
          JSON.stringify(localFlightDataBody)
        );
      }
    }
  };
  useEffect(() => {
    handleSearch();
  }, [body, paginationCondition]);

  useEffect(() => {
    setFilter(initialFilterState);
    const updateFlightData = (flightData: any) => {
      const cabin =
        flightData.OriginDestinationInformation[0]?.TPA_Extensions?.CabinPref
          ?.Cabin || "Y";
      form.setFieldsValue({ classes: cabin });
      setCabinClass(cabin);

      const updatedPassenger = initialPassengerState;
      flightData.PassengerTypeQuantity.forEach((item: any) => {
        if (item.Code === "ADT") updatedPassenger.adult = item.Quantity;
        if (item.Code === "C11") updatedPassenger.children = item.Quantity;
        if (item.Code === "INF") updatedPassenger.infant = item.Quantity;
        if (item.Code === "C05") updatedPassenger.kids = item.Quantity;
      });
    };

    if (route === "One Way") {
      const searchFlightOneWay = JSON.parse(
        lib.getFromLocalStorage("flightSearchOneWay") as string
      );
      if (
        searchFlightOneWay?.OriginDestinationInformation?.length &&
        searchFlightOneWay?.PassengerTypeQuantity?.length
      ) {
        updateFlightData(searchFlightOneWay);
      }
    } else if (route === "Round Trip") {
      const searchFlightRoundWay = JSON.parse(
        lib.getFromLocalStorage("flightSearchRoundWay") as string
      );
      if (
        searchFlightRoundWay?.OriginDestinationInformation?.length &&
        searchFlightRoundWay?.PassengerTypeQuantity?.length
      ) {
        updateFlightData(searchFlightRoundWay);
      }
    }
  }, [route]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const allLoading = isLoading || isFetching || filterLoadingRTK;
  return (
    <div className="relative duration-1000">
      <div className="relative w-full">
        {/* <video autoPlay loop muted className="object-cover w-full -mt-10 h-96">
          <source
            src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/hero-bg-cover.mp4"
            type="video/mp4"
          />
        </video> */}
        <div className="h-96 absolute bg-gradient-to-r from-indigo-500"></div>
        <div>
          <img
            className="object-cover w-full -mt-10 h-96"
            src={backgroundImage}
            alt=""
          />
        </div>
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-transparent via-black to-transparent"></div>
        <div className="absolute top-10 left-16">
          <span className="text-4xl text-white">
            Welcome to <span className="font-semibold">Sky Home OTA!</span>
          </span>
          <br />
          <span className="font-semibold text-white ">
            Find Flights at Best Price
          </span>
        </div>
      </div>
      <div className="flex justify-center mx-4 -mt-48 rounded-md shadow-md bg-white/70 backdrop-blur-lg md:mx-8 md:py-5 md:px-10 top-20">
        <div className="w-full px-4 pt-6 duration-500 rounded-md ">
          <Form autoComplete="off" form={form} className="mb-[10px]">
            <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
              <SelectRoute setRoute={setRoute} route={route} />
              <div className="flex gap-1">
                <div className="flex items-center justify-center w-full h-8 px-3 text-sm font-semibold text-blue-400 bg-blue-400 rounded bg-opacity-10 text-primary">
                  <SelectPassenger
                    form={form}
                    setPassenger={setPassenger}
                    passenger={passenger}
                  />
                </div>
                <SelectClass name={"classes"} setCabinClass={setCabinClass} />
              </div>
            </div>
          </Form>
          <div className="mb-2">
            <Render.When isTrue={route === "One Way"}>
              <OneWay
                setPaginationCondition={setPaginationCondition}
                setBody={setBody}
                cabinClass={cabinClass}
              />
            </Render.When>
            <Render.When isTrue={route === "Round Trip"}>
              <RoundWay
                setPaginationCondition={setPaginationCondition}
                setBody={setBody}
                cabinClass={cabinClass}
                setPassenger={setPassenger}
              />
            </Render.When>
            <Render.When isTrue={route === "Multi City"}>
              <MultiCity
                setPaginationCondition={setPaginationCondition}
                setBody={setBody}
                cabinClass={cabinClass}
              />
            </Render.When>
          </div>
        </div>
      </div>

      <div className="lg:flex w-full px-4 md:px-8 mt-5 pt-5 mx-auto md:gap-4  bg-[#F5F7FA] backdrop-blur relative">
        <div className="hidden lg:block w-full lg:w-[25%] sticky top-20 h-[90vh] overflow-scroll ">
          <Render.When isTrue={allLoading}>
            <div className="absolute top-0 z-50 w-full h-full bg-transparent backdrop-blur-sm" />
          </Render.When>
          <FlightSearchSideBar
            filter={data?.data?.filter}
            filterState={filter}
            paginationCondition={paginationCondition}
            setFilter={setFilter}
          />
        </div>
        <div className="lg:hidden">
          <Drawer
            style={{ overflowY: "scroll" }}
            open={isOpen}
            onClose={toggleDrawer}
            placement="left"
          >
            <FlightSearchSideBar
              filter={data?.data?.filter}
              filterState={filter}
              paginationCondition={paginationCondition}
              setFilter={setFilter}
            />
          </Drawer>
        </div>

        <div className="flex flex-col w-full lg:w-[75%] relative">
          <div className="relative">
            <Render.When isTrue={allLoading}>
              <div className="absolute top-0 z-50 w-full h-16 bg-transparent backdrop-blur-xl" />
            </Render.When>
            <TopFilterComponents
              filterState={filter}
              setFilter={setFilter}
              filter={data?.data?.filter}
            />
          </div>
          <Render.When
            isTrue={!(data?.data?.results?.length === 0) && !isError}
          >
            <div className="flex gap-2 mb-6 ">
              <Button
                className="flex items-center justify-center h-full gap-2 p-2 text-sm lg:hidden"
                onClick={toggleDrawer}
              >
                <FaSlidersH className="text-blue-500" />
                <span>More</span>
              </Button>
              <div className="w-full ">
                <Segmented
                  style={{
                    background: "white",
                  }}
                  value={
                    filter.sort_by
                      ? filter.sort_by === "EARLIEST"
                        ? "Earliest"
                        : filter.sort_by === "CHEAPEST"
                        ? "Cheapest"
                        : "Fastest"
                      : ""
                  }
                  options={["Earliest", "Cheapest", "Fastest"]}
                  onChange={(value) => {
                    setFilter((prev: any) => ({
                      ...prev,
                      sort_by:
                        value === "Earliest"
                          ? "EARLIEST"
                          : value === "Cheapest"
                          ? "CHEAPEST"
                          : "FASTEST",
                    }));
                  }}
                  size="middle"
                  block
                />
              </div>
            </div>
          </Render.When>

          <Render isLoading={allLoading}>
            <Render.When
              isTrue={
                (isError && paginationCondition == "search") ||
                (data?.data?.results?.length === 0 && !isFetching)
              }
            >
              <div className="h-[200px] flex justify-center items-center text-3xl">
                Sorry! No Flights Found.
              </div>
            </Render.When>
            <Render.Else>
              <div className="">
                {data?.data?.results?.map((item, index) => (
                  <FlightCard Item={item} key={index} />
                ))}

                <Render.When isTrue={(data?.count || 0) > 5}>
                  <Pagination
                    size="small"
                    {...pagination}
                    total={data?.count || 0}
                    defaultPageSize={1}
                    showSizeChanger
                    pageSizeOptions={[20, 50, 100]}
                    onChange={handlePaginationChange}
                    className="flex justify-end"
                  />
                </Render.When>
              </div>
            </Render.Else>
            <Render.Loading>
              <div className="min-h-[40vh] flex flex-col items-center justify-center">
                <Loading />
              </div>
            </Render.Loading>
          </Render>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
