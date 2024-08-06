import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useLoginMutation } from "../api/loginApiEndpoint";
import lib from "../../../utils/lib";
import { useAppDispatch } from "../../../utils/ReduxHook";
import errorHandler from "../../common/errorHandler";
import { webRoutes } from "../../../route/RouteLinks";

export type ILogin = {
  email: string;
  password: string;
};
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [postLogin, { data, isSuccess, isLoading, isError, error }] =
    useLoginMutation();
  const location = useLocation();
  const onFinish = async (values: ILogin) => {
    await postLogin(values);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Login successful");
      if (data && data.token) {
        lib.setLocalStorage("token", data.token);
      }
      navigate(location.state?.from?.pathname || "/home");
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <h1 className="welcome text-center">Welcome to sky home</h1>
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
            placeholder="Email"
            size="large"
            className="p-3"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 8, message: "Password must be at least 8 characters long!" },
          ]}
          className="m-0 mb-2"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
            className="p-3"
          />
        </Form.Item>

        <div className="text-end">
          <Link to={webRoutes.forgotPassword} className="font-bold block pb-3">
            Forget password
          </Link>
        </div>
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
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
