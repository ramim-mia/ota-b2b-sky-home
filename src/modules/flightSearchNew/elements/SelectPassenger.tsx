import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Popconfirm, Row } from "antd";
import { FormInstance } from "antd/lib";
import React, { useEffect } from "react";
import { BiChild } from "react-icons/bi";
import { FaBaby, FaChild } from "react-icons/fa6";
import { IoIosMan } from "react-icons/io";

type Passenger = "adult" | "children" | "kids" | "infant";

type Props = {
  form: FormInstance<any>;
  setPassenger: any;
  passenger: any;
};

const SelectPassenger = ({
  form,
  setPassenger,
  // passFormateDate
  passenger,
}: Props) => {
  // [
  //   { Code: 'ADT', Quantity: 1 },
  //   { Code: 'C11', Quantity: 3 },
  //   { Code: 'INF', Quantity: 1 },
  //   { Code: 'C05', Quantity: 2 }
  // ]

  useEffect(() => {
    form.setFieldValue(["passenger", "adults"], passenger.adult);
    form.setFieldValue(["passenger", "child"], passenger.children);
    form.setFieldValue(["passenger", "kids"], passenger.kids);

    if (passenger.adult < passenger.infant) {
      setPassenger((prevPassenger: any) => ({
        ...prevPassenger,
        ["infant"]: Math.max(0, prevPassenger["infant"] - 1),
      }));
      form.setFieldValue(["passenger", "infant"], passenger.adult);
    } else {
      form.setFieldValue(["passenger", "infant"], passenger.infant);
    }
  }, [passenger, form]);

  return (
    <div>
      <Popconfirm
        // open={open}
        placement="bottomLeft"
        icon={false}
        title="Select Travelers"
        description={
          <Description setPassenger={setPassenger} passenger={passenger} />
        }
        onCancel={() =>
          setPassenger({ adult: 1, kids: 0, children: 0, infant: 0 })
        }
        cancelText="Reset"
      >
        <span
          style={{
            width: 150,
            marginTop: "3px",
            cursor: "pointer",
          }}
        >
          {passenger.adult +
            passenger.children +
            passenger.infant +
            passenger.kids}{" "}
          {passenger.adult +
            passenger.children +
            passenger.infant +
            passenger.kids >
          1
            ? "Travelers"
            : "Traveler"}
        </span>
      </Popconfirm>
    </div>
  );
};

export default SelectPassenger;

type ProsDes = {
  setPassenger: React.Dispatch<
    React.SetStateAction<{
      adult: number;
      children: number;
      infant: number;
      kids: number;
    }>
  >;
  passenger: {
    adult: number;
    children: number;
    infant: number;
    kids: number;
  };
};

const Description = ({ setPassenger, passenger }: ProsDes) => {
  const incrementPassenger = (type: Passenger) => {
    if (
      type === "adult" &&
      passenger.adult + passenger.children + passenger.kids >= 9
    )
      return;
    if (
      type === "children" &&
      passenger.adult + passenger.children + passenger.kids >= 9
    )
      return;
    if (
      type === "kids" &&
      passenger.adult + passenger.children + passenger.kids >= 9
    )
      return;

    if (type === "infant" && passenger.infant >= passenger.adult) return;

    setPassenger((prevPassenger) => ({
      ...prevPassenger,
      [type]: prevPassenger[type] + 1,
    }));
  };

  const decrementPassenger = (type: Passenger) => {
    if (type === "adult" && passenger[type] === 1) return;
    if (type === "children" && passenger[type] === 0) return;
    if (type === "infant" && passenger[type] === 0) return;
    if (type === "kids" && passenger[type] === 0) return;

    if (type === "adult" && passenger[type] < passenger.infant) {
      setPassenger((prevPassenger) => ({
        ...prevPassenger,
        [type]: prevPassenger[type] - 1,
        ["infant"]: prevPassenger["infant"] - 1,
      }));
    } else {
      setPassenger((prevPassenger) => ({
        ...prevPassenger,
        [type]: prevPassenger[type] - 1,
      }));
    }
  };

  return (
    <div>
      {/* ADULTS */}
      <Row
        gutter={[12, 120]}
        justify={"space-between"}
        align={"middle"}
        className="mt-3 mb-2"
      >
        <Col span={12}>
          <div className="flex items-center">
            <p className="me-2">
              <IoIosMan className="text-[20px] text-[#9ba6b2]" />
            </p>
            <div>
              <span>Adults</span>{" "}
              <p className="text-[10px]">12 years & above</p>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <Row justify={"center"} align={"middle"}>
            <Col xs={8} className="flex justify-center">
              <Button type="link" onClick={(e) => decrementPassenger("adult")}>
                <MinusCircleOutlined />
              </Button>
            </Col>
            <Col xs={8}>
              <Form.Item name={["passenger", "adults"]} label={false} noStyle>
                <Input style={{ width: "100px" }} bordered={false} />
              </Form.Item>
            </Col>

            <Col xs={8} className="flex justify-center">
              <Button type="link" onClick={(e) => incrementPassenger("adult")}>
                <PlusCircleOutlined />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* CHILD */}
      <Row
        justify={"space-between"}
        align={"middle"}
        gutter={12}
        className="mb-2"
      >
        <Col span={12}>
          <div className="flex items-center">
            <p className="me-2">
              <FaChild className="text-[20px] text-[#9ba6b2]" />
            </p>
            <div>
              <span>Children</span>{" "}
              <p className="text-[10px]">From 5 to under 12</p>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <Row justify={"center"} align={"middle"}>
            <Col xs={8} className="flex justify-center">
              <Button
                type="link"
                onClick={(e) => decrementPassenger("children")}
              >
                <MinusCircleOutlined />
              </Button>
            </Col>
            <Col xs={8}>
              <Form.Item name={["passenger", "child"]} label={false} noStyle>
                <Input style={{ width: "100px" }} bordered={false} />
              </Form.Item>
            </Col>

            <Col xs={8} className="flex justify-center">
              <Button
                type="link"
                onClick={(e) => incrementPassenger("children")}
              >
                <PlusCircleOutlined />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Kids */}
      <Row
        justify={"space-between"}
        align={"middle"}
        gutter={12}
        className="mb-2"
      >
        <Col span={12}>
          <div className="flex items-center">
            <p className="me-2">
              <BiChild className="text-[20px] text-[#9ba6b2]" />
            </p>
            <div>
              <span>Kids</span> <p className="text-[10px]">From 2 to under 5</p>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <Row justify={"center"} align={"middle"}>
            <Col xs={8} className="flex justify-center">
              <Button type="link" onClick={(e) => decrementPassenger("kids")}>
                <MinusCircleOutlined />
              </Button>
            </Col>
            <Col xs={8}>
              <Form.Item name={["passenger", "kids"]} label={false} noStyle>
                <Input style={{ width: "100px" }} bordered={false} />
              </Form.Item>
            </Col>

            <Col xs={8} className="flex justify-center">
              <Button type="link" onClick={(e) => incrementPassenger("kids")}>
                <PlusCircleOutlined />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* INFANT */}
      <Row
        gutter={12}
        justify={"space-between"}
        align={"middle"}
        className="mb-2"
      >
        <Col span={12}>
          <div className="flex items-center">
            <p className="me-2">
              <FaBaby className="text-[20px] text-[#9ba6b2]" />
            </p>
            <div>
              <span>Infants</span> <p className="text-[10px]">Under 2 years</p>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <Row justify={"center"} align={"middle"}>
            <Col xs={8} className="flex justify-center">
              <Button type="link" onClick={(e) => decrementPassenger("infant")}>
                <MinusCircleOutlined />
              </Button>
            </Col>
            <Col xs={8}>
              <Form.Item name={["passenger", "infant"]} label={false} noStyle>
                <Input style={{ width: "100px" }} bordered={false} />
              </Form.Item>
            </Col>

            <Col xs={8} className="flex justify-center">
              <Button type="link" onClick={(e) => incrementPassenger("infant")}>
                <PlusCircleOutlined className="cursor-pointer" />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
