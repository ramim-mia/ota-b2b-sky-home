import { CaretRightOutlined } from "@ant-design/icons";
import { Card, Col, Collapse, Divider, Radio, Row, Slider, theme } from "antd";
import { CollapseProps } from "antd/lib";
import { Render } from "keep-render";
import React, { CSSProperties, useEffect, useState } from "react";
import CommonCheckbox from "../../common/CommonCheckbox";
import { FilterState } from "../types/flightSearchType";
import { FlightFilter } from "../types/TypeFlight";

type Props = {
  filter: FlightFilter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  paginationCondition: any;
  filterState: FilterState;

  // setPagination: React.Dispatch<
  //   React.SetStateAction<{ current: number; pageSize: number }>
  // >;
};

const FlightSearchSideBar = ({
  filter,
  setFilter,
  filterState,
  paginationCondition,
}: Props) => {
  const [range, setRange] = useState<number[]>([0, 1000000]);

  const min_price: number = filter?.price_rage?.min || 0;
  const max_price: number = filter?.price_rage?.max || 9999;

  const formatter = (value: any) => `${Number(value)} BDT`;
  const [stoppage, setStoppage] = useState<
    {
      label: string;
      value: string;
    }[]
  >();

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  useEffect(() => {
    if (filter?.total_stoppage?.length) {
      const stoppages = filter?.total_stoppage?.map((item: number) => {
        return {
          label:
            item === 0
              ? "Direct"
              : item === 1
              ? "1 Stop"
              : item === 2
              ? "2 Stop"
              : item === 3
              ? "3 Stop"
              : "",
          value: item?.toString(),
        };
      });
      setStoppage(stoppages);
    }
  }, [filter?.total_stoppage]);
  const handlePriceChange = (value: number[]) => {
    setRange([value[0], value[1]]);
  };

  // ! Filter
  const handleAfterChange = (e: number[]) => {
    setFilter((prev) => ({
      ...prev,
      min_price: String(e[0]),
      max_price: String(e[1]),
    }));
  };
  const handleCHeck = (values: any) => {
    const data = values?.join(",");
    setFilter((prev) => ({
      ...prev,
      carrier_operating: data,
    }));
  };
  const handleRefundable = (e: any) => {
    setFilter((prev) => ({
      ...prev,
      refundable: e.target.value,
    }));
  };
  const handleStoppage = (values: any) => {
    const data = values?.join(",");
    setFilter((prev) => ({
      ...prev,
      stoppage: data,
    }));
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: <span style={{ fontSize: "15px", fontWeight: "600" }}>Price</span>,
      children: (
        <Render.When isTrue={!!(min_price && max_price)}>
          <Slider
            range={{ draggableTrack: true }}
            value={range ? range : [min_price, max_price]}
            tooltip={{ formatter }}
            min={min_price}
            max={max_price}
            onChange={handlePriceChange}
            onChangeComplete={handleAfterChange}
          />

          <Row justify={"end"}>
            <Col lg={12}> BDT {min_price}</Col>
            <Col lg={12} style={{ textAlign: "end" }}>
              BDT {max_price}
            </Col>
          </Row>
          <Divider className="mb-0" />
        </Render.When>
      ),
      style: panelStyle,
    },
    {
      key: "4",
      label: (
        <Col style={{ fontSize: "15px", fontWeight: "600" }}>No of Stops</Col>
      ),
      children: (
        <Render.When isTrue={!!(stoppage?.length ?? 0)}>
          <CommonCheckbox
            paginationCondition={paginationCondition}
            options={stoppage || []}
            checked={filterState?.stoppage?.split(",")}
            width="120px"
            setChecked={handleStoppage}
          />
          <Divider className="mb-0" />
        </Render.When>
      ),
      style: panelStyle,
    },
    {
      key: "5",
      label: (
        <Col style={{ fontSize: "15px", fontWeight: "600" }}>Fare Type</Col>
      ),
      children: (
        <Render.When isTrue={!!(stoppage?.length ?? 0)}>
          <div>
            <Radio.Group
              onChange={handleRefundable}
              value={filterState?.refundable}
              name="radiogroup"
            >
              <Radio value={"true"}>Refundable</Radio>
              <Radio value={"false"}>Non Refundable</Radio>
            </Radio.Group>
            <Divider className="mb-0" />
          </div>
        </Render.When>
      ),
      style: panelStyle,
    },
    {
      key: "6",
      label: (
        <span style={{ fontSize: "15px", fontWeight: "600" }}>Airlines</span>
      ),
      children: (
        <Render.When isTrue={!!(filter?.airlines?.length ?? 0)}>
          <CommonCheckbox
            paginationCondition={paginationCondition}
            options={
              filter?.airlines?.length
                ? filter?.airlines?.map((item, index) => ({
                    label: item?.airline_name,
                    value: item?.airline_code,
                  }))
                : []
            }
            checked={filterState?.carrier_operating?.split(",")}
            setChecked={handleCHeck}
            width="250px"
          />
        </Render.When>
      ),
      style: panelStyle,
    },
  ];

  return (
    <Card>
      <Collapse
        defaultActiveKey={["1", "4", "5", "6"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems(panelStyle)}
        className={token.colorBorderSecondary}
        ghost
        bordered={false}
        expandIconPosition="end"
      />
    </Card>
  );
};
export default FlightSearchSideBar;
