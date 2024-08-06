import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { IPassenger, ISegment } from "../types/TypeFlight";

type IProps = {
  passengers: IPassenger[] | undefined;
};

const mainColumns: ColumnsType<IPassenger> = [
  {
    // title: "Passenger Type",
    dataIndex: "type",
    key: "type",
    render: (_, record) => {
      return (
        <div className="">
          <div className="">
            {record.type}
            <span className="text-sm text-gray-500">({record.number})</span>
          </div>
        </div>
      );
    },
  },

  {
    // title: "Refundable",
    dataIndex: "non_refundable",
    key: "non_refundable",
    render: (value) => {
      return (
        <div className="flex justify-end gap-4">
          {value ? (
            <div className="text-red-300">Non Refundable</div>
          ) : (
            <div className="text-blue-300">Refundable</div>
          )}
        </div>
      );
    },
  },
];

const segmentColumns: ColumnsType<ISegment> = [
  {
    title: "Segment",
    dataIndex: "name",
    key: "name",
  },
  // {
  //   title: "Cabin Code",
  //   dataIndex: "cabin_code",
  //   key: "cabin_code",
  // },
  {
    title: "Cabin Type",
    dataIndex: "cabin_type",
    key: "cabin_type",
    render: (_, record) => {
      return (
        <>
          {record.cabin_type} ({record.booking_code})
        </>
      );
    },
  },

  {
    title: "Meal Type",
    dataIndex: "meal_type",
    key: "meal_type",
  },
  {
    title: "Available Seat",
    dataIndex: "available_seat",
    key: "available_seat",
  },
  {
    title: "Available Break",
    dataIndex: "available_break",
    key: "available_break",
    render: (text) => <>{text ? "Yes" : "No"}</>,
  },
];

const expandableRow = {
  expandedRowRender: (record: IPassenger) => {
    return (
      <>
        {record?.availability.map((avail) => {
          const segments = avail.segments;

          return (
            <Table
              key={avail.id}
              className="mt-2"
              title={() => (
                <div className="text-lg font-semibold">
                  Destination {avail.from_airport} - {avail.to_airport}
                </div>
              )}
              columns={segmentColumns}
              dataSource={segments}
              pagination={false}
              rowKey="id"
            />
          );
        })}
      </>
    );
  },
};

const SegmentsTable = ({ passengers }: IProps) => {
  return (
    <div className="mt-4">
      <Table
        showHeader={false}
        expandable={{
          ...expandableRow,
          // defaultExpandAllRows: true,
          defaultExpandedRowKeys:
            passengers && passengers?.length > 0 ? [passengers[0].type] : [],
        }}
        columns={mainColumns}
        dataSource={passengers}
        rowKey="type"
        pagination={false}
      />
    </div>
  );
};
export default SegmentsTable;
