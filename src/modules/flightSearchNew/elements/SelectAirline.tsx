import { Select } from "antd";
import React from "react";
import { FilterState } from "../types/flightSearchType";
import { FlightFilter } from "../types/TypeFlight";

type Props = {
  filter: FlightFilter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
};

const SelectAirline = ({ filter, setFilter }: Props) => {
  const handleSelectChange = (selectedAirlines: string[]) => {
    setFilter((prev) => ({
      ...prev,
      carrier_operating: selectedAirlines.join(","),
    }));
  };

  return (
    <Select
      bordered={false}
      size="small"
      placeholder="Select Airline"
      style={{
        width: 150,
        border: "none",
        cursor: "pointer",
      }}
      className="mt-[4px]"
      mode="multiple"
      onChange={handleSelectChange}
      optionFilterProp="roleMobile"
      popupMatchSelectWidth={250}
      showSearch={true}
      allowClear
      filterOption={(input, option) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      {filter?.airlines &&
        filter?.airlines?.map((item: any) => (
          <Select.Option
            key={item?.airline_name}
            value={item.carrier_marketing}
            title="Select Attribute"
          >
            {item?.airline_name}
          </Select.Option>
        ))}
    </Select>
  );
};

export default SelectAirline;
