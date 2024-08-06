// const initialFilterState: FilterState = {
//   carrier_operating: "",
//   max_price: "",
//   min_price: "",
//   sort_by: "",
//   stoppage: "",
//   refundable: "",
// };

// const initialPassengerState = {
//   adult: 1,
//   kids: 0,
//   children: 0,
//   infant: 0,
// };

// const FlightSearch = () => {
//   // Define initial states and types

//   const [form] = Form.useForm();
//   const dispatch = useAppDispatch();
//   const settsSlice = useAppSelector(selectSetting);

//   const [age, setAge] = useState<any>(null);
//   const [route, setRoute] = useState("One Way");
//   const [cabinClass, setCabinClass] = useState<any>();
//   const [body, setBody] = useState<any>({});
//   const [passenger, setPassenger] = useState(initialPassengerState);
//   const [filter, setFilter] = useState<FilterState>(initialFilterState);

//   const [paginationCondition, setPaginationCondition] = useState<
//     "search" | "filter"
//   >("search");
//   const [data, setData] = useState<HTTPResponse<TFlightData> | undefined>();
//   const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });

//   const [
//     flightSearchV2,
//     { isError, isLoading, isSuccess, data: flightResponse },
//   ] = useFlightSearchV2Mutation();

//   const generateQueryArgs = (filter: FilterState) => {
//     return Object.entries(filter)
//       .filter(([key, value]) => value)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("&");
//   };

//   const handlePaginationChange = (current: number, pageSize: number) => {
//     setPagination({ current, pageSize });
//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       size: pageSize,
//       page: current,
//     }));
//   };

//   const prepareFlightDataBody = (body: any, passengerTypeQuantity: any) => {
//     const newOriginDestinationInformation =
//       body.OriginDestinationInformation.map((info: any) => {
//         const { name, ...restDestinationLocation } = info.DestinationLocation;
//         const { name: origin_airport_name, ...restOriginLocation } =
//           info.OriginLocation;
//         return {
//           ...info,
//           OriginLocation: restOriginLocation,
//           DestinationLocation: restDestinationLocation,
//         };
//       });

//     return {
//       OriginDestinationInformation: newOriginDestinationInformation,
//       PassengerTypeQuantity: passengerTypeQuantity,
//     };
//   };

//   const handleSearch = () => {
//     if (paginationCondition === "search" && Object.keys(body).length > 0) {
//       const passengerTypeQuantity = generatePassengerTypeQuantity({
//         ADT: passenger.adult,
//         C11: passenger.children,
//         INF: passenger.infant,
//         C05: passenger.kids,
//       });

//       const flightDataBody = prepareFlightDataBody(body, passengerTypeQuantity);

//       const localFlightDataBody = {
//         OriginDestinationInformation: body.OriginDestinationInformation,
//         PassengerTypeQuantity: passengerTypeQuantity,
//       };

//       setFilter(initialFilterState);
//       flightSearchV2({ body: flightDataBody });

//       if (body.route === "OneWay") {
//         lib.setLocalStorage(
//           "flightSearchOneWay",
//           JSON.stringify(localFlightDataBody)
//         );
//       }
//     }
//   };

//   const handleFilter = (arg: string) => {
//     if (arg) {
//       dispatch(flightSearchEndpoints.endpoints.flightFilterV2.initiate(arg))
//         .unwrap()
//         .then(setData)
//         .finally(() => setPaginationCondition("filter"));
//     }
//   };

//   useEffect(() => {
//     handleSearch();
//   }, [body, paginationCondition]);

//   useEffect(() => {
//     const arg = generateQueryArgs(filter);

//     if (!isLoading) {
//       if (
//         isSuccess &&
//         flightResponse &&
//         flightResponse.data &&
//         !Object.values(filter).some((item) => item)
//       ) {
//         setData(flightResponse);
//       } else {
//         handleFilter(arg);
//       }
//     }
//   }, [isSuccess, filter, pagination, isLoading]);

//   useEffect(() => {
//     if (route === "One Way") {
//       const searchFlightOneWay = JSON.parse(
//         lib.getFromLocalStorage("flightSearchOneWay") as string
//       );

//       if (
//         searchFlightOneWay?.OriginDestinationInformation?.length &&
//         searchFlightOneWay?.PassengerTypeQuantity?.length
//       ) {
//         const cabin =
//           searchFlightOneWay.OriginDestinationInformation[0].TPA_Extensions
//             ?.CabinPref?.Cabin || "Y";
//         form.setFieldsValue({ classes: cabin });
//         setCabinClass(cabin);

//         const updatedPassenger = initialPassengerState;
//         searchFlightOneWay.PassengerTypeQuantity.forEach((item: any) => {
//           if (item.Code === "ADT") updatedPassenger.adult = item.Quantity;
//           if (item.Code === "C11") updatedPassenger.children = item.Quantity;
//           if (item.Code === "INF") updatedPassenger.infant = item.Quantity;
//           if (item.Code === "KID") updatedPassenger.kids = item.Quantity;
//         });
//         setPassenger(updatedPassenger);
//       } else {
//         form.setFieldsValue({ classes: "Y" });
//         setCabinClass("Y");
//       }
//     }
//   }, [route]);

const FlightSearchV2 = () => {
  return <div>FlightSearchV2</div>;
};

export default FlightSearchV2;

//! old code flight search

// const [form] = Form.useForm();
//   const dispatch = useAppDispatch();
//   const settsSlice = useAppSelector(selectSetting);

//   const [age, setAge] = useState<any>(null);
//   const [route, setRoute] = useState("One Way");
//   const [cabinClass, setCabinClass] = useState<any>();
//   const [body, setBody] = useState<any>({});
//   const [passenger, setPassenger] = useState({
//     adult: 1,
//     kids: 0,
//     children: 0,
//     infant: 0,
//   });
//   const [filter, setFilter] = useState<FilterState>({
//     carrier_operating: "",
//     max_price: "",
//     min_price: "",
//     sort_by: "",
//     stoppage: "",
//     refundable: "",
//   });

//   const [paginationCondition, setPaginationCondition] = useState<
//     "search" | "filter"
//   >("search");
//   // flight main data
//   const [data, setData] = useState<HTTPResponse<TFlightData> | undefined>();
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 20,
//   });

//   const [
//     flightSearchV2,
//     { isError, isLoading, isSuccess, data: flightResponse },
//   ] = useFlightSearchV2Mutation();

//   let arg = Object.entries(filter)
//     .filter(([key, value]) => value)
//     .map(([key, value]) => `${key}=${value}`)
//     .join("&");

//   const handlePaginationChange = (current: number, pageSize: number) => {
//     filter.size = pageSize;
//     filter.page = current;

//     setPagination((prevPagination) => ({
//       ...prevPagination,
//       current,
//       pageSize,
//     }));
//     // window.scrollTo(0, 0);
//   };

//   const PassengerTypeQuantity = generatePassengerTypeQuantity({
//     ADT: passenger?.adult || 1,
//     C11: passenger?.children,
//     INF: passenger?.infant,
//     C05: passenger?.kids,
//   });

//   // ! initial data load
//   useEffect(() => {
//     if (paginationCondition === "search") {
//       const isEmptyObject = Object.keys(body).length === 0;
//       if (!isEmptyObject) {
//         // name remove for prepared api payload data > because flight search api payload dose not allowed name
//         const newOriginDestinationInformation =
//           body.OriginDestinationInformation.map((info: any) => {
//             const { name, ...restDestinationLocation } =
//               info.DestinationLocation;
//             const newDestinationLocation = { ...restDestinationLocation };

//             const { name: origin_airport_name, ...restOriginLocationLocation } =
//               info.OriginLocation;
//             const newOriginLocationLocation = { ...restOriginLocationLocation };

//             return {
//               ...info,
//               OriginLocation: newOriginLocationLocation,
//               DestinationLocation: newDestinationLocation,
//             };
//           });

//         const flightDataBody = {
//           OriginDestinationInformation: newOriginDestinationInformation,
//           PassengerTypeQuantity: PassengerTypeQuantity,
//         };

//         // localStorage body data with name
//         const localFlightDataBody = {
//           OriginDestinationInformation: body?.OriginDestinationInformation,
//           PassengerTypeQuantity: PassengerTypeQuantity,
//         };

//         setFilter({
//           carrier_operating: "",
//           max_price: "",
//           min_price: "",
//           sort_by: "",
//           stoppage: "",
//           refundable: "",
//         });
//         flightSearchV2({ body: flightDataBody });
//         if (body.route === "OneWay") {
//           if (
//             flightDataBody.OriginDestinationInformation.length &&
//             flightDataBody.PassengerTypeQuantity.length
//           ) {
//             lib.setLocalStorage(
//               "flightSearchOneWay",
//               JSON.stringify(localFlightDataBody)
//             );
//           }
//         }
//       }
//     }
//   }, [body, paginationCondition]);

//   useEffect(() => {
//     if (isLoading) return;
//     const hasValue = Object.values(filter).some((item) => item !== "");

//     if (isSuccess && flightResponse && flightResponse.data && !hasValue) {
//       setData(flightResponse);
//       arg = "";
//     } else {
//       if ((hasValue && paginationCondition === "filter") || arg) {
//         const data = dispatch(
//           flightSearchEndpoints.endpoints.flightFilterV2.initiate(`${arg}`)
//         );
//         data
//           .unwrap()
//           .then((res) => {
//             setData(res);
//           })
//           .finally(() => {
//             setPaginationCondition("filter");
//           });
//       }
//     }
//   }, [isSuccess, filter, pagination, isLoading, arg]);

//   useEffect(() => {
//     if (route === "One Way") {
//       if (
//         searchFlightOneWay?.OriginDestinationInformation?.length &&
//         searchFlightOneWay?.PassengerTypeQuantity?.length
//       ) {
//         const cabin =
//           searchFlightOneWay?.OriginDestinationInformation[0]?.TPA_Extensions
//             ?.CabinPref?.Cabin;
//         form.setFieldsValue({
//           classes: cabin,
//         });

//         setCabinClass(cabin);
//         const passenger = {
//           adult: 1,
//           kids: 0,
//           children: 0,
//           infant: 0,
//         };
//         searchFlightOneWay?.PassengerTypeQuantity?.map((item: any) => {
//           if (item.Code === "ADT") {
//             passenger.adult = item.Quantity;
//           } else if (item.Code === "C11") {
//             passenger.children = item.Quantity;
//           } else if (item.Code === "INF") {
//             passenger.infant = item.Quantity;
//           } else if (item.Code === "KID") {
//             passenger.kids = item.Quantity;
//           }
//         });
//         setPassenger(passenger);
//       } else {
//         form.setFieldsValue({
//           classes: "Y",
//         });
//         setCabinClass("Y");
//       }
//     }
//   }, [route]);

//   const searchFlightOneWay = JSON.parse(
//     lib.getFromLocalStorage("flightSearchOneWay") as string
//   );

//! old code flight search

// import { Form, Pagination, Segmented } from "antd";
// import { Render } from "keep-render";
// import { useEffect, useState } from "react";
// import lib from "../../../utils/lib";
// import { useAppDispatch } from "../../../utils/ReduxHook";
// import { HTTPResponse } from "../../common/commonType";
// import Loading from "../../common/Loading";
// import {
//   flightSearchEndpoints,
//   useFlightSearchV2Mutation,
// } from "../api/flightSearchEndpoints";
// import FlightCard from "../components/FlightCard";
// import FlightSearchSideBar from "../components/FlightSearchSideBar";
// import MultiCity from "../components/MultiCity";
// import OneWay from "../components/OneWay";
// import RoundWay from "../components/RoundWay";
// import SelectClass from "../elements/SelectClass";
// import SelectPassenger from "../elements/SelectPassenger";
// import SelectRoute from "../elements/SelectRoute";
// import TopFilterComponents from "../elements/TopFilterComponents";
// import { FilterState } from "../types/flightSearchType";
// import { TFlightData } from "../types/TypeFlight";
// import { generatePassengerTypeQuantity } from "../utils/generatePassengerQuantity";

// const initialFilterState: FilterState = {
//   carrier_operating: "",
//   max_price: "",
//   min_price: "",
//   sort_by: "",
//   stoppage: "",
//   refundable: "",
// };

// const initialPassengerState = {
//   adult: 1,
//   kids: 0,
//   children: 0,
//   infant: 0,
// };

// const FlightSearch = () => {
//   const [form] = Form.useForm();
//   const dispatch = useAppDispatch();

//   const [age, setAge] = useState<any>(null);
//   const [route, setRoute] = useState(
//     localStorage.getItem("route") || "One Way"
//   );
//   const [cabinClass, setCabinClass] = useState<any>();
//   const [body, setBody] = useState<any>({});
//   const [passenger, setPassenger] = useState(initialPassengerState);
//   const [filter, setFilter] = useState<FilterState>(initialFilterState);
//   const [paginationCondition, setPaginationCondition] = useState<
//     "search" | "filter"
//   >("search");
//   const [data, setData] = useState<HTTPResponse<TFlightData> | undefined>();
//   const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });

//   const [
//     flightSearchV2,
//     { isError, isLoading, isSuccess, data: flightResponse },
//   ] = useFlightSearchV2Mutation();

//   const generateQueryArgs = (filter: FilterState) => {
//     return Object.entries(filter)
//       .filter(([key, value]) => value)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("&");
//   };

//   useEffect(() => {
//     localStorage.setItem("route", route);
//   }, [route]);

//   const handlePaginationChange = (current: number, pageSize: number) => {
//     setPagination({ current, pageSize });
//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       size: pageSize,
//       page: current,
//     }));
//   };

//   const prepareFlightDataBody = (body: any, passengerTypeQuantity: any) => {
//     const newOriginDestinationInformation =
//       body?.OriginDestinationInformation?.map((info: any) => {
//         const { name, ...restDestinationLocation } =
//           info?.DestinationLocation || {};
//         const { name: origin_airport_name, ...restOriginLocation } =
//           info?.OriginLocation || {};
//         return {
//           ...info,
//           OriginLocation: restOriginLocation,
//           DestinationLocation: restDestinationLocation,
//         };
//       }) || [];

//     return {
//       OriginDestinationInformation: newOriginDestinationInformation,
//       PassengerTypeQuantity: passengerTypeQuantity,
//     };
//   };

// const handleSearch = (storedBody: any, storedPassenger: any) => {
//   if (paginationCondition === "search" && storedBody) {
//     const passengerTypeQuantity =
//       generatePassengerTypeQuantity(storedPassenger);

//     const flightDataBody = prepareFlightDataBody(
//       storedBody,
//       passengerTypeQuantity
//     );

//     setFilter(initialFilterState);

//     console.log(flightDataBody);
//     flightSearchV2({ body: flightDataBody });
//   }
// };

//   const handleFilter = (arg: string) => {
//     if (arg) {
//       dispatch(flightSearchEndpoints.endpoints.flightFilterV2.initiate(arg))
//         .unwrap()
//         .then(setData)
//         .finally(() => setPaginationCondition("filter"));
//     }
//   };

//   useEffect(() => {
//     const arg = generateQueryArgs(filter);

//     if (!isLoading) {
//       if (
//         isSuccess &&
//         flightResponse &&
//         flightResponse.data &&
//         !Object.values(filter).some((item) => item)
//       ) {
//         setData(flightResponse);
//       } else {
//         handleFilter(arg);
//       }
//     }
//   }, [isSuccess, filter, pagination, isLoading]);

//   useEffect(() => {
//     let storedData;
//     if (route === "One Way") {
//       storedData = JSON.parse(
//         lib.getFromLocalStorage("flightSearchOneWay") as string
//       );
//     } else if (route === "Round Trip") {
//       storedData = JSON.parse(
//         lib.getFromLocalStorage("flightSearchRoundTrip") as string
//       );
//     }

//     if (storedData) {
//       const { OriginDestinationInformation, PassengerTypeQuantity } =
//         storedData || {};

//       const cabin =
//         OriginDestinationInformation?.[0]?.TPA_Extensions?.CabinPref?.Cabin ||
//         "Y";
//       form.setFieldsValue({ classes: cabin });
//       setCabinClass(cabin);

//       const updatedPassenger = initialPassengerState;
//       PassengerTypeQuantity?.forEach((item: any) => {
//         if (item.Code === "ADT") updatedPassenger.adult = item.Quantity;
//         if (item.Code === "C11") updatedPassenger.children = item.Quantity;
//         if (item.Code === "INF") updatedPassenger.infant = item.Quantity;
//         if (item.Code === "KID") updatedPassenger.kids = item.Quantity;
//       });
//       setPassenger(updatedPassenger);

//       handleSearch({ OriginDestinationInformation }, updatedPassenger);
//     } else {
//       form.setFieldsValue({ classes: "Y" });
//       setCabinClass("Y");
//     }
//   }, [route]);

//   return (
//     <div className="relative duration-1000">
//       <div className="relative w-full">
//         <video autoPlay loop muted className="object-cover w-full -mt-10 h-96">
//           <source
//             src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/hero-bg-cover.mp4"
//             type="video/mp4"
//           />
//         </video>
//         <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-transparent via-black to-transparent"></div>
//         <div className="absolute top-10 left-16">
//           <span className="text-4xl text-white">
//             Welcome to <span className="font-semibold">Sky Home OTA!</span>
//           </span>
//           <br />
//           <span className="font-semibold text-white ">
//             Find Flights at Best Price
//           </span>
//         </div>
//       </div>
//       <div className="sticky flex justify-center mx-4 -mt-48 rounded-md shadow-md bg-white/70 backdrop-blur-lg md:mx-8 md:py-5 md:px-10 top-20">
//         <div className="w-full px-4 pt-6 duration-500 rounded-md ">
//           <Form autoComplete="off" form={form} className="mb-[10px]">
//             <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row">
//               <SelectRoute setRoute={setRoute} route={route} />
//               <div className="flex gap-1">
//                 <div className="flex items-center justify-center w-full h-8 px-3 text-sm font-semibold text-blue-400 bg-blue-400 rounded bg-opacity-10 text-primary">
//                   <SelectPassenger
//                     form={form}
//                     setPassenger={setPassenger}
//                     passenger={passenger}
//                   />
//                 </div>
//                 <SelectClass name={"classes"} setCabinClass={setCabinClass} />
//               </div>
//             </div>
//           </Form>
//           <div className="mb-2">
//             <Render.When isTrue={route === "One Way"}>
//               <OneWay
//                 setPaginationCondition={setPaginationCondition}
//                 setBody={setBody}
//                 cabinClass={cabinClass}
//               />
//             </Render.When>
//             <Render.When isTrue={route === "Round Trip"}>
//               <RoundWay
//                 setPaginationCondition={setPaginationCondition}
//                 setBody={setBody}
//                 cabinClass={cabinClass}
//               />
//             </Render.When>
//             <Render.When isTrue={route === "Multi City"}>
//               <MultiCity
//                 setPaginationCondition={setPaginationCondition}
//                 setBody={setBody}
//                 cabinClass={cabinClass}
//               />
//             </Render.When>
//           </div>
//         </div>
//       </div>

//       <div className="flex w-full px-4 md:px-8 mt-5 pt-5 mx-auto md:gap-4  bg-[#F5F7FA] backdrop-blur">
//         <div className="hidden lg:block w-full lg:w-[20%] sticky top-20 h-screen overflow-scroll ">
//           <FlightSearchSideBar
//             filter={data?.data?.filter}
//             paginationCondition={paginationCondition}
//             setFilter={setFilter}
//           />
//         </div>

//         <div className="flex flex-col w-full lg:w-[80%]">
//           <TopFilterComponents
//             filterState={filter}
//             setFilter={setFilter}
//             filter={data?.data?.filter}
//           />

//           <Render.When isTrue={!(data?.data?.results?.length === 0)}>
//             <div className="mb-6">
//               <Segmented
//                 style={{
//                   background: "white",
//                 }}
//                 options={["Earliest", "Cheapest", "Fastest"]}
//                 defaultValue=""
//                 onChange={(value) => {
//                   setFilter((prev: any) => ({
//                     ...prev,
//                     sort_by:
//                       value === "Earliest"
//                         ? "EARLIEST"
//                         : value === "Cheapest"
//                         ? "CHEAPEST"
//                         : "FASTEST",
//                   }));
//                 }}
//                 size="middle"
//                 block
//               />
//             </div>
//           </Render.When>
//           <Render isLoading={isLoading}>
//             <Render.When
//               isTrue={
//                 (isError && paginationCondition == "search") ||
//                 data?.data?.results?.length === 0
//               }
//             >
//               <div className="h-[200px] flex justify-center items-center text-3xl">
//                 Sorry! No Flights Found.
//               </div>
//             </Render.When>
//             <Render.Else>
//               {data?.data?.results?.map((item, index) => (
//                 <FlightCard Item={item} key={index} />
//               ))}
//               <Render.When isTrue={(data?.count || 0) > 5}>
//                 <Pagination
//                   size="small"
//                   {...pagination}
//                   total={data?.count || 0}
//                   defaultPageSize={1}
//                   showSizeChanger
//                   pageSizeOptions={[20, 50, 100]}
//                   onChange={handlePaginationChange}
//                   className="flex justify-end"
//                 />
//               </Render.When>
//             </Render.Else>
//             <Render.Loading>
//               <Loading />
//             </Render.Loading>
//           </Render>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlightSearch;
