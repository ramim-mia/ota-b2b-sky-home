import { ColumnsType } from 'antd/es/table';
import { Button, Image, Space } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { imgHostLink } from '../../../../redux/request';
import { size_limit } from '../../../../constants/Pagination';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
type IProps = {
  pagination: {
    current: number;
    pageSize: number;
  };
};
const customerSupportColumn: ({}: IProps) => ColumnsType<any> = ({
  pagination,
}) => [
  {
    title: 'SL',
    dataIndex: 'SL',
    key: 'SL',
    align: 'center',
    render: (_, value, index) =>
      (pagination.current - 1) * size_limit + (index + 1),
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'search_data',
    dataIndex: 'search_data',
    align: 'center',
    render: (_, record) => {
      return (
        <Space size='middle'>
          <Link to='/b2c/details-complain'>
            <Button type='primary'>Details</Button>
          </Link>
          <Button danger>Delete</Button>
        </Space>
      );
    },
  },
];

export default customerSupportColumn;
