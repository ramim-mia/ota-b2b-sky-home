import { DatePicker, Form } from "antd";
import moment from "moment";

const AgeCalculate = ({ setAge, age }: any) => {
  const onFinish = (values: any) => {
    const birthDate = values.birthDate.format("YYYY-MM-DD");
    const today = moment().format("YYYY-MM-DD");
    const diff = moment(today).diff(moment(birthDate));
    const duration = moment.duration(diff);
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    setAge({ years, months, days });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Enter your birth date"
          name="birthDate"
          rules={[
            { required: true, message: "Please select your birth date!" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <span className="cursor-pointer">Calculate Age</span>
        </Form.Item>
      </Form>
      {age && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Your age is: {age.years} years {age.months} months {age.days}
            days
          </h3>
        </div>
      )}
    </div>
  );
};

export default AgeCalculate;
