import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleTravelerQuery,
  useUpdateTravelerMutation,
} from "../api/TravelersEndpoints";
import { IAllTravelers } from "../types/travelersTypes";

const EditAddTravelers = () => {
  const { id } = useParams();
  const { data } = useGetSingleTravelerQuery(Number(id));
  const [form] = useForm();
  // useEffect(() => {
  //   if (data?.data) {
  //     form.setFieldsValue({
  //       ...data?.data,
  //       date_of_birth: data?.data?.date_of_birth
  //         ? dayjs(data?.data?.date_of_birth)
  //         : undefined,

  //       passport_expire_date: data?.data?.passport_expire_date
  //         ? dayjs(data?.data?.passport_expire_date)
  //         : undefined,
  //     });
  //   }
  // }, [data?.data]);
  const [updateTravelers, { isSuccess, isError }] = useUpdateTravelerMutation();
  const onFinish = (values: IAllTravelers) => {
    // const updateValues: IAllTravelers = {
    //   ...values,
    //   date_of_birth: dayjs(values.date_of_birth).format("YYYY-MM-DD"),
    //   passport_expire_date: dayjs(values.passport_expire_date).format(
    //     "YYYY-MM-DD"
    //   ),
    // };
    const createFormData = (data: Record<string, any>): FormData => {
      const formData = new FormData();
      for (const key in data) {
        if (values?.hasOwnProperty(key)) {
          const value = data[key];
          if (key === "passport_photo" && !(typeof value === "string")) {
            const file = value?.fileList[0]?.originFileObj;
            formData.append(key, file);
          } else if (key === "visa_photo" && !(typeof value === "string")) {
            const file = value?.fileList[0]?.originFileObj;
            formData.append(key, file);
          } else {
            formData.append(key, value?.toString());
          }
        }
      }
      return formData;
    };
    // const formData = createFormData(updateValues);
    // updateTravelers({ formData, id: id as string });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Updated Successfully");
    } else if (isError) {
      message.error("something went wrong");
    }
  }, [isSuccess, isError]);
  return (
    <div className="px-4 md:px-8">
      <div>
        <Space size={"middle"} direction="vertical">
          <Typography.Title level={3}>Edit Travelers</Typography.Title>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Row gutter={10}>
              <Col lg={8}>
                <Form.Item
                  label="Given Name"
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input size="middle" placeholder="Given Name" />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  label="Surname"
                  name="sur_name"
                  rules={[
                    { required: true, message: "Please input your surname!" },
                  ]}
                >
                  <Input size="middle" placeholder="Surname" />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    { required: true, message: "Please input your gender!" },
                  ]}
                >
                  <Select
                    size="middle"
                    placeholder="Select Gender"
                    options={[
                      {
                        value: "m",
                        label: "Male",
                      },
                      {
                        value: "f",
                        label: "Female",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  label="Nationality"
                  name="nationality"
                  rules={[
                    {
                      required: true,
                      message: "Please input your nationality!",
                    },
                  ]}
                >
                  <Select
                    size="middle"
                    placeholder="Select Nationality"
                    options={[
                      {
                        value: "Bangladeshi",
                        label: "Bangladesh",
                      },
                      {
                        value: "Afganistan",
                        label: "Afganistan",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  label="Passenger Type"
                  name={"type"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your passengerType!",
                    },
                  ]}
                >
                  <Select
                    size="middle"
                    placeholder="Passenger Type"
                    options={[
                      {
                        label: "Adult",
                        value: "adt",
                      },
                      {
                        value: "c11",
                        label: "Child",
                      },
                      {
                        value: "inf",
                        label: "Infant",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  required
                  label="Date of Birth"
                  name={"date_of_birth"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Date of Birth!",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} size="middle" />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  required
                  label="Passport Number"
                  name={"passport_number"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Passport Number!",
                    },
                  ]}
                >
                  <Input placeholder="Passport Number" />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  required
                  label="Passport Expire Date"
                  name={"passport_expire_date"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Passport Expire Date!",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"phone"}
                  required
                  label="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"email"}
                  required
                  label="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                  ]}
                >
                  <Input placeholder="Email address" type="email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4}>
                {/* <UploadImageInputs
                  name="passport_photo"
                  label="passport_photo"
                  uploadButtonText="Upload Your Passport"
                  updateImgUrl={data?.data?.passport_photo}
                /> */}
              </Col>
              {/* <Col span={7} xs={24} sm={24} md={24} lg={6}>
                <UploadImageInputs
                  name="visa_photo"
                  label="Visa Photo"
                  uploadButtonText="Upload Your Visa Photo"
                  updateImgUrl={data?.data?.visa_photo}
                />
              </Col> */}
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default EditAddTravelers;
