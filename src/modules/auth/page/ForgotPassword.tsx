import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "../../../route/RouteLinks";
import errorHandler from "../../common/errorHandler";
import { SendOTP, useSendOtpMutation } from "../api/authApiEndpoint";

const ForgotPassword = () => {
  const [sentOtp, { data, isLoading, isSuccess, isError, error }] =
    useSendOtpMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const onFinish = async (values: { email: string }) => {
    const body: SendOTP = {
      email: values?.email,
      type: "reset_btob",
    };
    setEmail(values?.email);
    await sentOtp(body);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("OTP sent successfully");
      navigate(`${webRoutes?.verifyOtp}?email=${email}`);
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <h1 className="text-center welcome">Find Your Account</h1>

      <p className="mb-4 text-base text-center text-gray-600 ">
        <a
          href="/login"
          className="transition-all duration-200 text-blue-dark hover:underline hover:text-blue-dark/90"
        >
          Back to login
        </a>
      </p>
      <Form onFinish={onFinish} className="z-10">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Provide your email"
            size="large"
            className="p-3"
          />
        </Form.Item>

        <Form.Item
          style={{
            textAlign: "center",
          }}
        >
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            loading={isLoading}
            className="font-mono font-bold tracking-wider w-[80%] hover:bg-[#FFFFFF]  "
          >
            {isLoading ? "Sending otp" : "Send OTP"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
