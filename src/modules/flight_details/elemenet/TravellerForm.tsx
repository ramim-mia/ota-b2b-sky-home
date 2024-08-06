import { Collapse, Typography, theme } from "antd";
import { FormInstance } from "antd/lib";
import React from "react";
import AdultsFormInputs from "./AdultsFormInputs";

type Props = {
  passengers:
    | 0
    | {
        adult: number;
        child: number;
        infant: number;
      }
    | undefined;
  form: FormInstance<any>;
};

type ItemType = {
  key: string | number | undefined;
  header: React.ReactNode;
  panel?: React.ReactNode;
  style?: React.CSSProperties;
};

const TravellerForm = ({ passengers, form }: Props) => {
  const { Title } = Typography;
  const { token } = theme.useToken();

  // render Passenger Form
  const renderPassengerForm = (
    type: string,
    count: number,
    totalPassengerCount: number
  ) => {
    const forms = [];
    for (
      let i = totalPassengerCount - count + 1;
      i <= totalPassengerCount;
      i++
    ) {
      const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillContent,
        borderRadius: token.borderRadiusLG,
        border: "none",
      };

      forms.push({
        key: `${type}-${i}`,
        header: (
          <Title level={5} className="my-1">
            Passenger {i}{" "}
            <span
              className="inline-block p-2 px-6 ml-2 text-xs rounded ms-2"
              style={{ backgroundColor: "#053969", color: "#fff" }}
            >
              {type?.toUpperCase()}
            </span>
          </Title>
        ),
        panel: <AdultsFormInputs type={type} index={i} form={form} />,
        style: panelStyle,
      });
    }
    return forms;
  };

  // render All Passenger Forms
  let totalPassengerCount = 0;
  const renderAllPassengerForms = (): any => {
    const formPanels: ItemType[] = [];
    if (passengers) {
      for (const [type, count] of Object.entries(passengers)) {
        totalPassengerCount += count;
        formPanels.push(
          ...renderPassengerForm(type, count, totalPassengerCount)
        );
      }
      return formPanels;
    }
  };

  // collapsible items
  const items = renderAllPassengerForms()?.map(
    ({
      key,
      header,
      panel,
      style,
    }: {
      key: number;
      header: any;
      panel: any;
      style: any;
    }) => ({
      key,
      label: header,
      children: panel,
      style,
    })
  );

  return (
    <>
      <Collapse
        expandIconPosition="end"
        defaultActiveKey={["adult-1"]}
        items={items}
        style={{
          background: "#E6F4FF",
          border: "none",
        }}
      />
    </>
  );
};

export default TravellerForm;
