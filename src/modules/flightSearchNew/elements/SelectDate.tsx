import { Button, DatePicker, Form } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { selectSetting } from "../../../redux/slice/settingsSlice";
import { useAppSelector } from "../../../utils/ReduxHook";

type Props = {
  name: any;
  onDateChange: (date: dayjs.Dayjs | null) => void;
  placeholder: string;
  selectedDate: any;
  form: any;
};

const SelectDate = ({
  name,
  onDateChange,
  placeholder,
  selectedDate,
  form,
}: Props) => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().startOf("day");
  };
  const settingSlice = useAppSelector(selectSetting);
  const [internalDate, setInternalDate] = useState<dayjs.Dayjs | null>(
    selectedDate
  );

  useEffect(() => {
    setInternalDate(selectedDate);
  }, [selectedDate]);

  // Function to handle click on previous day Button
  const handlePrevDay = () => {
    if (internalDate) {
      const prevDay = internalDate.subtract(1, "day");
      setInternalDate(prevDay);
      onDateChange(prevDay);
      form.setFieldsValue({
        [name]: prevDay,
      });
    }
  };

  // Function to handle click on next day Button
  const handleNextDay = () => {
    if (internalDate) {
      const nextDay = internalDate.add(1, "day");
      setInternalDate(nextDay);
      onDateChange(nextDay);
      form.setFieldsValue({
        [name]: nextDay,
      });
    }
  };

  return (
    <div className="relative w-full">
      <Form.Item style={{ margin: 0, padding: 0, width: "100%" }} name={name}>
        <DatePicker
          size="large"
          style={{
            width: "100%",
            height: "7vh",
            minHeight: "4rem",
            border: "1px solid #dbd7d7",
            background: settingSlice.navTheme === "light" ? "#F5F7FA" : "#222",
            borderRadius: "0",
            padding: "0 19px",
          }}
          disabledDate={disabledDate}
          onChange={(date) => {
            setInternalDate(date);
            onDateChange(date);
          }}
          placeholder={placeholder || "Date"}
          format={"YYYY/MM/DD"}
          suffixIcon={""}
          value={selectedDate}
          allowClear={false}
        />
      </Form.Item>
      <div className="absolute 2xl:top-[17px] xl:top-4 top-4 right-0 bg-transparent z-10">
        <Button type="text" onClick={handlePrevDay}>
          <MdKeyboardArrowLeft />
        </Button>
        <Button type="text" onClick={handleNextDay}>
          <MdKeyboardArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default SelectDate;
