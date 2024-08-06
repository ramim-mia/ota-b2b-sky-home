import { Button, DatePicker, Form } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { selectSetting } from "../../../redux/slice/settingsSlice";
import { useAppSelector } from "../../../utils/ReduxHook";

type Props = {
  name: string;
  onDateChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void;
  placeholder: string;
  selectedDate: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  form: any;
};

const SelectRangeDate = ({
  name,
  onDateChange,
  placeholder,
  selectedDate,
  form,
}: Props) => {
  const disabledDate = (current: Dayjs | null): boolean => {
    return current ? current.isBefore(dayjs().startOf("day")) : false;
  };

  const handlePrevDay = (pickerIndex: number) => {
    const dateToChange = selectedDate[pickerIndex];
    if (dateToChange) {
      const newDate = dateToChange.subtract(1, "day");
      const updatedDates = [...selectedDate];
      updatedDates[pickerIndex] = newDate;
      onDateChange(updatedDates as any);
      form.setFieldsValue({
        [name]: updatedDates,
      });
    }
  };

  const handleNextDay = (pickerIndex: number) => {
    const dateToChange = selectedDate[pickerIndex];
    if (dateToChange) {
      const newDate = dateToChange.add(1, "day");
      const updatedDates = [...selectedDate];
      updatedDates[pickerIndex] = newDate;
      onDateChange(updatedDates as any);
      form.setFieldsValue({
        [name]: updatedDates,
      });
    }
  };
  const settingSlice = useAppSelector(selectSetting);

  return (
    <div className="relative w-full ">
      <Form.Item style={{ margin: 0, padding: 0, width: "100%" }} name={name}>
        <DatePicker.RangePicker
          size="small"
          style={{
            width: "100%",
            height: "7vh",
            minHeight: "4rem",
            background: settingSlice.navTheme === "light" ? "#fff" : "#222",
            borderRadius: "0",
          }}
          disabledDate={disabledDate}
          onChange={(dates) =>
            onDateChange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])
          }
          suffixIcon={""}
          placeholder={["Departure Date", "Return Date"]}
          format="YYYY/MM/DD"
          value={selectedDate}
          allowClear={false}
        />
      </Form.Item>
      <div className="absolute top-[30%]   left-[41%]">
        <Button
          type="text"
          onClick={() => handlePrevDay(0)}
          className="p-0"
          disabled={!selectedDate}
        >
          <MdKeyboardArrowLeft />
        </Button>
        <Button
          type="text"
          onClick={() => handleNextDay(0)}
          className="p-0"
          disabled={!selectedDate}
        >
          <MdKeyboardArrowRight />
        </Button>
      </div>
      <div className="absolute top-[30%] right-[3%]">
        <Button
          type="text"
          onClick={() => handlePrevDay(1)}
          className="p-0"
          disabled={!selectedDate}
        >
          <MdKeyboardArrowLeft />
        </Button>
        <Button
          type="text"
          onClick={() => handleNextDay(1)}
          className="p-0"
          disabled={!selectedDate}
        >
          <MdKeyboardArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default SelectRangeDate;
