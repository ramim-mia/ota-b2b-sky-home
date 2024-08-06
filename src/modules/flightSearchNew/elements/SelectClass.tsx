import { ArrowDownOutlined } from "@ant-design/icons";
import { Form, Select } from "antd";

const SelectClass = ({ name, setCabinClass }: any) => {
  return (
    <div className="">
      <Form.Item
        name={name}
        required
        className="text-blue-600 bg-blue-300 shadow-sm bg-opacity-15 backdrop-blur-lg"
      >
        <Select
          size="middle"
          bordered={false}
          defaultValue={"Y"}
          placeholder="Select Class"
          options={[
            { value: "Y", label: "Economy" },
            { value: "P", label: "Premium Economy" },
            { value: "C", label: "Business" },
            { value: "F", label: "First Class" },
          ]}
          onChange={(value) => setCabinClass(value)}
          suffixIcon={<ArrowDownOutlined />}
        />
      </Form.Item>
    </div>
  );
};

export default SelectClass;
