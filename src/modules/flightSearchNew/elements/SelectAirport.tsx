import { Popover, Spin } from "antd";
import { useState } from "react";
import { selectSetting } from "../../../redux/slice/settingsSlice";
import useBreakpoint from "../../../utils/Breakpoin";
import { useAppSelector } from "../../../utils/ReduxHook";
import { useGetAirportListQuery } from "../api/flightSearchEndpoints";
import AirportSelect from "./AirportSelect";

const SelectAirport = ({ airport, setAirport, name, placeholder }: any) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const settsSlice = useAppSelector(selectSetting);
  const { data, isLoading }: any = useGetAirportListQuery({
    search: inputValue.toLocaleUpperCase(),
  });
  const isMobile = useBreakpoint();

  const handleClosePopover = () => {
    setPopoverOpen(false);
    setInputValue("");
  };

  const handlePopoverOpenChange = (open: boolean) => {
    setPopoverOpen(open);
  };

  const content = (
    <AirportSelect
      setAirport={setAirport}
      airport={airport}
      closePopover={handleClosePopover}
      name={name}
      data={data?.data}
      setInputValue={setInputValue}
      inputValue={inputValue}
      placeholder={placeholder}
    />
  );

  return (
    <div className="w-full ">
      <Popover
        content={content}
        placement="bottom"
        trigger="click"
        arrow={false}
        style={{ width: "100%" }}
        align={{ offset: [0, -68] }}
        overlayStyle={{ width: isMobile ? "90%" : "25vw" }}
        open={popoverOpen}
        onOpenChange={handlePopoverOpenChange}
      >
        <div className="relative">
          <div
            className=" min-h-16 select-airport"
            style={{
              border: "1px solid #dbd7d7",
              borderRadius: "4px",
              backgroundColor: settsSlice.navTheme == "light" ? "#F5F7FA" : "",
            }}
          >
            {!airport ? (
              <span>{placeholder || name}</span>
            ) : (
              <>
                <p className="text-[#5D7F9E] font-bold 2xl:text-[16px] ">
                  {airport?.iata_code}
                </p>
                <p className="text-xs 2xl:text-sm">{airport?.name}</p>
              </>
            )}
          </div>
          {isLoading && (
            <div className="absolute top-2 right-3">
              <Spin />
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default SelectAirport;
