import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FilterState } from "../modules/flightSearchNew/types/flightSearchType";
import { FlightFilter } from "../modules/flightSearchNew/types/TypeFlight";
import DynamicAirlineImage from "./DynamicAirlineImage";

interface Props {
  filter: any;
  filterItem: FlightFilter | undefined;
  airlineClick: (carrierMarketing: string) => void;
  filterState?: FilterState;
}

const SliderImageSearch = ({
  filterItem,
  airlineClick,
  filterState,
}: Props) => {
  return (
    <div className="w-full ">
      <Swiper
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        slidesPerView={5}
        spaceBetween={0}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="flex items-center justify-center rounded-md sm:items-start md:items-end"
      >
        {filterItem?.airlines?.map((airline, index) => (
          <SwiperSlide className="min-w-[140px] md:w-[200px]" key={index}>
            <div
              onClick={() => airlineClick(airline.airline_code)}
              key={index}
              className={`cursor-pointer h-16  w-full flex flex-col items-center justify-center
               
          ${
            filterState?.carrier_operating?.includes(airline.airline_code)
              ? "bg-blue-300 text-white"
              : "border-gray-300 hover:bg-gray-100 "
          }`}
            >
              <div className="flex justify-between gap-4">
                <div className="">
                  <DynamicAirlineImage
                    className="w-10"
                    airLineCode={airline.airline_logo}
                  />
                </div>
                <div className="text-start">
                  <p className="text-sm font-semibold">
                    {airline.airline_code as string}
                  </p>
                  <p className="text-xs md:text-sm ">৳ {airline.price}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderImageSearch;
