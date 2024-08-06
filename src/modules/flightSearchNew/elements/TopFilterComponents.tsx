import { useEffect, useState } from "react";
import SliderImageSearch from "../../../app_components/SliderImageSearch";
import { FilterState } from "../types/flightSearchType";
import { FlightFilter } from "../types/TypeFlight";

interface Props {
  filter: FlightFilter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  filterState: FilterState;
}

const TopFilterComponents = ({ filter, setFilter, filterState }: Props) => {
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const airlineClick = (carrierMarketing: string) => {
    setSelectedAirlines((prev) => {
      if (prev.includes(carrierMarketing)) {
        return prev.filter((airline) => airline !== carrierMarketing);
      } else {
        return [...prev, carrierMarketing];
      }
    });
  };

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      carrier_operating: selectedAirlines.join(","),
    }));
  }, [selectedAirlines]);

  return (
    <div className="mb-4 ">
      <SliderImageSearch
        filterState={filterState}
        filter={selectedAirlines}
        filterItem={filter}
        airlineClick={airlineClick}
      />
    </div>
  );
};

export default TopFilterComponents;
