import { Alert, Button, Card, Col, Modal, Row, Typography } from "antd";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import logo from "../../../assets/images/Airlines_Logo.png";
import EditProfile from "../components/EditProfile";
import { useAppSelector } from "../../../utils/ReduxHook";
import { selectUser } from "../../../redux/slice/userSlice";
import { imgHostLink } from "../../../redux/request";
import dayjs from "dayjs";

const MyAccount = () => {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectUser);

  const {
    name,
    email,
    mobile_number,
    photo,
    created_at,
    agency_name,
    agency_logo,
  } = user;
  return (
    <>
      <Row gutter={12} className="flex justify-center">
        <Col lg={12} xs={24}>
          <Card className="text-center">
            <Row gutter={12}>
              <Col span={12}>
                <Title level={4} className="m-0">
                  {agency_name}
                </Title>
                <div className="mb-1">
                  <Alert
                    message={<p className="text-xs m-0 ">User Info</p>}
                    type="info"
                  />
                </div>
                <div className="flex mb-3 pt-2">
                  <CgProfile style={{ fontSize: "20px" }} />
                  <p className="ms-3">{name}</p>
                </div>
                <div className="flex mb-3">
                  <MdOutlineEmail style={{ fontSize: "20px" }} />
                  <p className="ms-3">{email}</p>
                </div>

                <div className="flex mb-3">
                  <FaPhoneAlt style={{ fontSize: "20px" }} />
                  <p className="ms-3">{mobile_number}</p>
                </div>
                <p className="text-gray-500">
                  {created_at &&
                    `User since ${new Date(created_at).toLocaleDateString()}`}
                </p>
              </Col>
              <Col span={12}>
                <img
                  src={`${imgHostLink}/${photo}`}
                  style={{ width: "100%" }}
                  alt=""
                />

                <Button
                  type="primary"
                  className="mt-4"
                  style={{ width: "100%" }}
                  onClick={() => setOpen(true)}
                >
                  Edit Account{"  "}
                  <p className="hidden md:block">Information</p>
                </Button>

                <EditProfile open={open} setOpen={setOpen} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MyAccount;
