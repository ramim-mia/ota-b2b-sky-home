import {
  Alert,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useLazyGetSingleTravelerQuery } from "../../travellers/api/TravelersEndpoints";

import { genderSelect, referenceField } from "../../../constants/selectField";

type Props = {
  type: string;
  index: number;
  form: FormInstance<any>;
};

const ChildInfantFormInputs = ({ type, index, form }: Props) => {
  const { Option } = Select;
  const { Title } = Typography;
  const [getSingleTravelers, { data }] = useLazyGetSingleTravelerQuery();
  const handleTravelers = (value: number) => {
    if (value) {
      getSingleTravelers(value);
    }
  };
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        [`${type}-${index}-firstName`]: data?.data?.first_name,
        [`${type}-${index}-lastName`]: data?.data?.sur_name,
        [`${type}-${index}-email`]: data?.data?.email,
        [`${type}-${index}-phone`]: data?.data?.phone,
        // [`${type}-${index}-address`]: data?.data?.address,
        // [`${type}-${index}-gender`]: data?.data?.gender?.toUpperCase(),
        [`${type}-${index}-dateOfBirth`]: dayjs(data?.data?.date_of_birth),
        [`${type}-${index}-passport-number`]: data?.data?.passport_number,
        [`${type}-${index}-expire-date`]: dayjs(
          data?.data?.passport_expiry_date
        ),
        [`${type}-${index}-reference`]: data?.data?.reference,
      });
    }
  }, [data?.data]);

  return (
    <>
      <Title className="mt-0" level={4}>
        Personal Details
      </Title>
      <Alert
        message="As mentioned on your passport or government approved IDs"
        type="info"
        showIcon
        className="mb-6 text-xs"
      />
      {/* <Row>
        <SelectTravelerList
          passengerType={type === "infant" ? "INF" : "C11"}
          size={12}
          label="Select Travelers"
          name={`${type}-${index}-travellers`}
          onChange={handleTravelers}
        />
      </Row> */}
      {/* form inputs */}
      <Form.Item
        label="Select reference"
        name={`${type}-${index}-reference`}
        rules={[{ required: true, message: "Please select a reference!" }]}
        className="my-10"
      >
        <Radio.Group buttonStyle="solid">
          {referenceField?.map((item, index) => (
            <Radio.Button key={index} className="mr-3" value={item.value}>
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Row gutter={12}>
        {/* left side inputs */}
        <Col span={12}>
          <Form.Item
            label="First Name"
            name={`${type}-${index}-firstName`}
            rules={[
              { required: true, message: "Please input your firstName!" },
            ]}
            className="mb-3"
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="mb-3"
            name={`${type}-${index}-gender`}
            label="Gender"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              options={genderSelect}
            />
          </Form.Item>

          <Form.Item
            name={`${type}-${index}-email`}
            className="mb-3"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Frequent Flyer Number"
            className="mb-3"
            name={`${type}-${index}-frequent-flyer-number
            `}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Issue Date"
            className="mb-3"
            name={`${type}-${index}-issue-date
            `}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* right side inputs */}
        <Col span={12}>
          <Form.Item
            className="mb-3"
            label="Last Name"
            name={`${type}-${index}-lastName`}
            rules={[{ required: true, message: "Please input your lastName!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={`${type}-${index}-dateOfBirth`}
            label="Date Of Birth"
            rules={[
              { required: true, message: "Please input your date Of Birth!" },
            ]}
            className="mb-3"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name={`${type}-${index}-phone`}
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
            className="mb-3"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Passport Number"
            className="mb-3"
            name={`${type}-${index}-passport-number`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Expire Date"
            className="mb-3"
            name={`${type}-${index}-expire-date`}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ChildInfantFormInputs;
