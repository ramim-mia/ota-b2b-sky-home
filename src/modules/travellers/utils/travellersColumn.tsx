import { Space } from "antd"; // Make sure to import Tag and Space from 'antd'
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { IAllTravelers } from "../types/travelersTypes";

const travellersColumn: (
  current: number,
  pageSize: number
) => ColumnsType<IAllTravelers> = (current, pageSize) => {
  const [isModalOpen, setIsModalOpen] = useState({
    modalOpen: false,
    id: 0,
  });
  console.log(isModalOpen, "isModalOpen");
  return [
    {
      title: "SL",
      dataIndex: "first_name",
      key: "name",
      render: (_, __, index) => {
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Given Name",
      dataIndex: "first_name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Surname",
      dataIndex: "sur_name",
      key: "age",
    },
    // {
    //   title: 'Gender',
    //   dataIndex: 'gender',
    //   key: 'gender',
    //   render: (_, value) => (value.gender === 'm' ? 'male' : 'female'),
    // },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Date Of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (_, value) => dayjs(value.date_of_birth).format("DD-MMM-YYYY"),
    },
    {
      title: "Passport Number",
      key: "passport_number",
      dataIndex: "passport_number",
    },
    // {
    //   title: "Expired Date",
    //   key: "action",
    //   render: (_, value) =>
    //     dayjs(value.passport_expire_date).format("DD/MMM/YYYY"),
    // },

    {
      title: "Email",
      key: "action",
      dataIndex: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Link to={`/travelers/view-travels/${record.id}`}>
              <a>
                <FaEdit size={20} color="green" />
              </a>
            </Link>

            <a>
              <MdDeleteForever size={22} color="red" />
            </a>
          </Space>
        );
      },
    },
  ];
};

export default travellersColumn;
