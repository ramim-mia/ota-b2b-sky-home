import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFlight, IPassenger } from "../types/TypeFlight";

type IProps = {
  flight: IFlight | undefined;
};

export const FlightDetailsFareSummery: ColumnsType<IPassenger> = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (_, render) => (
      <span>
        {render.type}({render.number})
      </span>
    ),
  },
  {
    title: "Fare Breakdown",
    dataIndex: "fare",
    key: "fare",
    render: (fare) => <span>{fare.base_fare} BDT</span>,
  },
  {
    title: "Tax",
    dataIndex: "fare",
    key: "fare",
    render: (fare) => <span>{fare.tax} BDT</span>,
  },
  {
    title: "Total Fare",
    dataIndex: "fare",
    key: "fare",
    render: (fare) => <span>{fare.total_fare} BDT</span>,
  },
];

const FlightFareSummary = ({ flight }: IProps) => {
  const passengers = flight?.passengers;

  return (
    <div className="mt-5">
      <Table
        columns={FlightDetailsFareSummery}
        dataSource={passengers}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default FlightFareSummary;
