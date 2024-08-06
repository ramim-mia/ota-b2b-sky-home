import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { IPassenger } from "../types/TypeFlight";

type IProps = {
  flightBaggage: IPassenger[] | undefined;
};

const columns: ColumnsType<IPassenger> = [
  {
    title: "Travelers",
    dataIndex: "type",
    key: "type",
    render: (_, record) => (
      <div className="">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">
            {record.type} ({record.number})
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Count",
    dataIndex: "baggage",
    key: "weight",
    render: (_, record) => {
      return <>{record?.availability[0]?.baggage.count}</>;
    },
  },
  {
    title: "Unit",
    dataIndex: "baggage",
    key: "unit",
    render: (_, record) => record?.availability[0]?.baggage.unit,
  },
];
const FlightBaggage = ({ flightBaggage }: IProps) => {
  return (
    <div className="mt-4">
      <Table
        columns={columns}
        dataSource={flightBaggage}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default FlightBaggage;
