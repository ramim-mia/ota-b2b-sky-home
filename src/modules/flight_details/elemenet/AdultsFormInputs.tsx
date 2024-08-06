import {
  Alert,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { FormInstance } from "antd/lib";
import { referenceField } from "../../../constants/selectField";
import { useGetAllCountryQuery } from "../../travellers/api/TravelersEndpoints";

type Props = {
  type: string;
  index: number;
  form: FormInstance<any>;
};

const AdultsFormInputs = ({ type, index, form }: Props) => {
  // const [getSingleTravelers, { data }] = useLazyGetSingleTravelerQuery();

  const { data: ct } = useGetAllCountryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { Option } = Select;
  const { Title } = Typography;

  // const handleTravelers = (value: number) => {
  //   if (value) {
  //     getSingleTravelers(value);
  //   }
  // };

  // useEffect(() => {
  //   if (data?.data) {
  //     form.setFieldsValue({
  //       [`${type}-${index}-first_name`]: data?.data?.first_name,
  //       [`${type}-${index}-last_name`]: data?.data?.sur_name,
  //       [`${type}-${index}-email`]: data?.data?.email,
  //       [`${type}-${index}-phone`]: data?.data?.phone,
  //       [`${type}-${index}-country_id`]: data?.data?.country_id,
  //       [`${type}-${index}-city`]: data?.data?.city,
  //       [`${type}-${index}-date_of_birth`]: dayjs(data?.data?.date_of_birth),
  //       [`${type}-${index}-passport_number`]: data?.data?.passport_number,
  //       [`${type}-${index}-passport_expiry_date`]: dayjs(
  //         data?.data?.passport_expiry_date
  //       ),

  //       [`${type}-${index}-frequent_flyer_airline`]:
  //         data?.data?.frequent_flyer_airline,
  //       [`${type}-${index}-frequent_flyer_number`]:
  //         data?.data?.frequent_flyer_number,
  //       [`${type}-${index}-title`]: data?.data?.reference,
  //     });
  //   } else {
  //     const { minDate, maxDate } = getDisabledDateRange(type);
  //     form.setFieldsValue({
  //       [`${type}-${index}-date_of_birth`]: maxDate,
  //     });
  //   }
  // }, [data?.data]);

  return (
    <div className="p-2 mb-5">
      <h3 className="text-[#003566] text-[20px] m-0 mb-4 ">Personal Details</h3>
      <Alert
        message="As mentioned on your passport or government approved IDs"
        type="info"
        showIcon
        className="mb-6 text-xs"
      />
      <Row>
        {/* <SelectTravelerList
          passengerType="ADT"
          size={12}
          label="Select Travelers"
          name={`${type}-${index}-travellers`}
          onChange={handleTravelers}
        /> */}
      </Row>
      {/* form inputs */}
      <Form.Item
        label="Select reference"
        name={`${type}-${index}-title`}
        rules={[{ required: true, message: "Please select a reference!" }]}
        className="my-6"
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
            name={`${type}-${index}-first_name`}
            rules={[
              { required: true, message: "Please input your firstName!" },
            ]}
            className="mb-3"
          >
            <Input />
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
            label="Frequent Flyer Airline"
            className="mb-3"
            name={`${type}-${index}-frequent_flyer_airline`}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Frequent Flyer Number"
            className="mb-3"
            name={`${type}-${index}-frequent_flyer_number`}
          >
            <Input />
          </Form.Item>

          <Row gutter={12}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Select Country"
                className="mb-3"
                rules={[
                  { required: true, message: "Please select a Country!" },
                ]}
                name={`${type}-${index}-country_id`}
              >
                <Select
                  showSearch
                  placeholder="Select a Country"
                  filterOption={(input, option) => {
                    return (
                      option?.children?.toString()?.toUpperCase() as string
                    ).includes(input?.toUpperCase() as string);
                  }}
                >
                  {ct?.data?.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="City"
                rules={[{ required: true, message: "Please input your city!" }]}
                className="mb-3"
                name={`${type}-${index}-city`}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        {/* right side inputs */}
        <Col span={12}>
          <Form.Item
            className="mb-3"
            label="Last Name"
            name={`${type}-${index}-last_name`}
            rules={[{ required: true, message: "Please input your lastName!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={`${type}-${index}-date_of_birth`}
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
            rules={
              type === "adult"
                ? [
                    {
                      required: true,
                      message: "Please input your passport number!",
                    },
                  ]
                : []
            }
            name={`${type}-${index}-passport_number`}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Expire Date"
            rules={
              type === "adult"
                ? [
                    {
                      required: true,
                      message: "Please input your passport expiry date!",
                    },
                  ]
                : []
            }
            className="mb-3"
            name={`${type}-${index}-passport_expiry_date`}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default AdultsFormInputs;
