// adminListColumn function
import { Button, Popconfirm, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDeleteAgencyCommMutation } from "../api/AgencyApiEndpoint";
import { IGetAgencyCommission } from "../type/AgencyCommissionType";

const AirlineCommissionTableColumn: (
  handleEditAirComm: (data: IGetAgencyCommission) => void
) => ColumnsType<IGetAgencyCommission> = (handleEditAirComm) => {
  const [deleteAirlineCommission] = useDeleteAgencyCommMutation();
  const confirm = (airline_code: string) => {
    deleteAirlineCommission(airline_code);
  };
  return [
    {
      title: "Airline",
      dataIndex: "airline_logo",
      key: "airline_logo",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            className="object-cover w-6 h-6 rounded-full"
            width={50}
            style={{ objectFit: "cover" }}
            src={`https://m360-Sky Home.s3.ap-south-1.amazonaws.com/ota-files/airlines/${record?.airline_code}.png`}
            alt=""
          />
          <span>{record.airline_name}</span>
        </div>
      ),
    },

    {
      title: "Airline Code",
      dataIndex: "airline_code",
      key: "airline_code",
    },

    {
      title: "Capping",
      dataIndex: "capping",
      key: "capping",
      render: (capping) => {
        return capping === 1 ? (
          <Tag color="green"> Available </Tag>
        ) : (
          <Tag color="red">Unavailable </Tag>
        );
      },
    },
    {
      title: "Domestic Commission",
      dataIndex: "domestic_commission",
      key: "domestic_commission",
      render: (_, record) => (
        <div>
          {record.domestic_commission ? record.domestic_commission + "%" : 0}
        </div>
      ),
    },
    {
      title: "Form Dhaka",
      dataIndex: "from_dac_commission",
      key: "from_dac_commission",
      render: (_, record) => (
        <div>
          {record.from_dac_commission ? record.from_dac_commission + "%" : 0}
        </div>
      ),
    },
    {
      title: "To Dhaka",
      dataIndex: "to_dac_commission",
      key: "to_dac_commission",
      render: (_, record) => (
        <div>
          {record.to_dac_commission ? record.to_dac_commission + "%" : 0}
        </div>
      ),
    },

    {
      title: "Soto Commission",
      dataIndex: "soto_commission",
      key: "soto_commission",
      render: (_, record) => (
        <div>{record.soto_allowed === 1 && record.soto_commission + "%"}</div>
      ),
    },
    {
      title: "Updated By",
      dataIndex: "updated_by",
      key: "updated_by",
      render: (_, record) => <div>{record?.updated_by}</div>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Space size="small">
          <Button
            size="small"
            type="primary"
            onClick={() => handleEditAirComm(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title={`Sure Remove thisAgency commission?`}
            onConfirm={() => {
              confirm(record.airline_code);
            }}
          >
            {/* <Button loading={isLoading} size="small" danger> */}
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};

export default AirlineCommissionTableColumn;
