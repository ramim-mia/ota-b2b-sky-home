import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../utils/ReduxHook";
import { Col, Row } from "antd";
import "../modules/login/style/Login.css";
import logo from "../assets/images/logo_website.png";
import { selectUser } from "../redux/slice/userSlice";

const AuthLayout = () => {
  const user = useAppSelector((state) => state.user);
  const location = useLocation();

  if (user?.agency_id) {
    return <Navigate to={location.state?.from?.pathname || "/home"} />;
  }

  return (
    <div className="auth-container">
      <div className="inner xl:w-[25%] lg:w-[30%] sm:w-[50%] w-[80%] xl:p-[45px] lg:p-[40px] sm:p-[30px] p-[20px]">
        <div className="headerTopInfo">
          {/* <img src={logo} className='logo' /> */}
          <h1>Sky Home</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
