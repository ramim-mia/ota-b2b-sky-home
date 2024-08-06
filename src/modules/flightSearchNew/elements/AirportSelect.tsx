import { Divider, Input, List } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { LuPlane } from "react-icons/lu";
import "../style/AirportSelect.css";
import { IAirportList } from "../types/flightSearchType";

const AirportSelect = ({
  setAirport,
  closePopover,
  name,
  airport,
  data,
  setInputValue,
  placeholder,
  inputValue,
}: any) => {
  const inputRef = useRef<any>(null);
  const [airportList, setAirportList] = useState<IAirportList[]>();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setTimeout(() => {
      setAirportList(data.slice(0, 8));
    }, 100);
  }, [data]);

  const handleAirportSelection = (selectedAirport: IAirportList) => {
    setAirport(selectedAirport);
    closePopover();
  };

  // useEffect(() => {
  //   setDefaultAirport(airport?.iata_code || '');
  //   setInputValue(airport?.iata_code || '');
  // }, [airport]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Input
        size="large"
        bordered={false}
        placeholder={placeholder || name}
        name={name}
        prefix={<LuPlane size={22} />}
        style={{ outline: "none !important" }}
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Divider style={{ margin: "7px" }} />
      <div style={{ height: "35vh", overflow: "auto" }}>
        <List
          size="small"
          dataSource={airportList}
          renderItem={(item) => (
            <List.Item
              className="custom-list-item"
              onClick={() => handleAirportSelection(item)}
            >
              {item.iata_code} - {item.name}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default AirportSelect;
