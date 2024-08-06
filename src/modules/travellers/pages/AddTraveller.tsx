import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { Option } from "antd/es/mentions";
import { BreadcrumbProps } from "antd/lib";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasePageContainer from "../../../app_components/PageContainer";
import { passengerField, referenceField } from "../../../constants/selectField";
import { webRoutes } from "../../../route/RouteLinks";
import {
  useGetAllCountryQuery,
  usePostTravelerMutation,
} from "../api/TravelersEndpoints";
import { IAllTravelers } from "../types/travelersTypes";
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.addTraveler,
      title: <Link to={webRoutes.addTraveler}>Travelers</Link>,
    },

    {
      key: webRoutes.addTraveler,
      title: <Link to={webRoutes.addTraveler}>Add Travelers</Link>,
    },
  ],
};

const AddTraveller = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<string>("ADT");

  console.log(type);
  const [postTravelers, { isSuccess, isError }] = usePostTravelerMutation();
  const { data: ct } = useGetAllCountryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const onFinish = (values: IAllTravelers) => {
    // postTravelers(values);
    console.log(values);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Travelers Updated successfully");
      navigate("/travelers/view-travels");
    } else if (isError) {
      message.error("something went wrong");
    }
  }, [isSuccess, isError]);

  return (
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      <Card>
        <Typography.Title level={3}>Add Travelers</Typography.Title>

        <Form onFinish={onFinish} autoComplete="off" layout="vertical">
          <Form.Item
            label="Select reference"
            name={`reference`}
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
                name={`first_name`}
                rules={[
                  { required: true, message: "Please input your firstName!" },
                ]}
                className="mb-3"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={`email`}
                className="mb-3"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Type" name={"type"}>
                <Select
                  onChange={(value) => setType(value as string)}
                  placeholder="Select Type"
                >
                  {passengerField?.map((item, index) => (
                    <Select.Option key={index} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Frequent Flyer Airline"
                className="mb-3"
                name={`frequent_flyer_airline`}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Frequent Flyer Number"
                className="mb-3"
                name={`frequent_flyer_number`}
              >
                <Input />
              </Form.Item>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    label="Select Country"
                    className="mb-3"
                    rules={[
                      { required: true, message: "Please select a city!" },
                    ]}
                    name={`country_id`}
                  >
                    <Select
                      showSearch
                      placeholder="Select a city"
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

                <Col span={12}>
                  <Form.Item
                    label="City"
                    rules={[
                      { required: true, message: "Please input your city!" },
                    ]}
                    className="mb-3"
                    name={`city`}
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
                name={`last_name`}
                rules={[
                  { required: true, message: "Please input your lastName!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={`date_of_birth`}
                label="Date Of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please input your date Of Birth!",
                  },
                ]}
                className="mb-3"
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name={`phone`}
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
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
                name={`passport_number`}
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
                name={`passport_expiry_date`}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </BasePageContainer>
  );
};

export default AddTraveller;
