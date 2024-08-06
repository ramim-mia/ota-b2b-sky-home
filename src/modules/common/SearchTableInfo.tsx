import { DatePicker, Input, Select } from "antd";
import { Render } from "keep-render";
const { Search } = Input;
type IProps = {
  title?: string;
  selectStatusFilter?: (value: string) => void;
  inputSearchChange?: (value: string) => void;
  options?: { value: string; label: string }[];
  hideStatus?: boolean;
  hideSearch?: boolean;
  hideDateRange?: boolean;
  setDate?: any;
  defaultStatus?: string;
  inputSearchLabel?: string;
};

const SearchTableInfo = ({
  title,
  selectStatusFilter,
  defaultStatus,
  inputSearchChange,
  options,
  hideSearch,
  hideDateRange,
  hideStatus,
  setDate,
  inputSearchLabel,
}: IProps) => {
  const handleDateRangeChange = (date: any, dateString: any) => {
    setDate(dateString);
  };
  return (
    <div className="flex flex-col w-full gap-4 mt-4 mb-6 lg:flex-row">
      <Render.When isTrue={!!title}>
        <span className="w-full mb-3 text-lg font-semibold md:mb-0">
          {title}
        </span>
      </Render.When>
      <div className="flex flex-col items-center justify-end w-full gap-3 mb-2 lg:flex-row md:mb-0">
        <Render.When isTrue={!hideDateRange}>
          <DatePicker.RangePicker
            className="lg:max-w-48"
            style={{
              minWidth: 200,

              width: "100%",
            }}
            format={"YYYY-MM-DD"}
            onChange={handleDateRangeChange}
          />
        </Render.When>
        <Render.When isTrue={!hideStatus}>
          <Select
            className="lg:max-w-24"
            style={{ minWidth: 200, width: "100%" }}
            defaultValue={defaultStatus}
            onChange={selectStatusFilter}
            options={options}
            placeholder="Filter By Status"
            allowClear
          />
        </Render.When>
        <Render.When isTrue={!hideSearch}>
          <Search
            className="lg:max-w-48"
            placeholder={inputSearchLabel || "Search"}
            onSearch={inputSearchChange}
            style={{ minWidth: 200 }}
          />
        </Render.When>
      </div>
    </div>
  );
};

export default SearchTableInfo;
