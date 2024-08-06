import { ColumnsType } from 'antd/es/table';
import { Image, Space } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { IB2CUserListType } from '../type/b2cUserTypes';
import { imgHostLink } from '../../../../redux/request';
import { size_limit } from '../../../../constants/Pagination';
type IProps = {
  setIsModalOpen: React.Dispatch<
    React.SetStateAction<{
      moalOpen: boolean;
      id: number;
    }>
  >;
  pagination: {
    current: number;
    pageSize: number;
  };
};
const b2cUserColumn: ({
  setIsModalOpen,
}: IProps) => ColumnsType<IB2CUserListType> = ({
  setIsModalOpen,
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
  },

  {
    title: 'Phone Number',
    key: 'mobile_number',
    dataIndex: 'mobile_number',
    align: 'center',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    render: (value, record) => (record.status === 1 ? 'Active' : 'InActive'),
  },
  {
    title: 'Verified',
    key: 'is_verified',
    dataIndex: 'is_verified',
    align: 'center',
    render: (value, record) =>
      record.is_verified === 1 ? 'Verified' : 'Non-Verified',
  },
  {
    title: 'Photo',
    key: 'photo',
    dataIndex: 'photo',
    align: 'center',
    render: (_, value) => {
      return value.photo ? (
        <Image
          width={40}
          src={`${imgHostLink}/${value.photo}`}
          alt=''
        />
      ) : (
        <></>
      );
    },
  },

  {
    title: 'Action',
    key: 'search_data',
    dataIndex: 'search_data',
    align: 'center',
    render: (_, record) => {
      return (
        <Space size='middle'>
          <div
            onClick={() => setIsModalOpen({ id: record.id, moalOpen: true })}
          >
            <a>
              <FaEdit
                size={20}
                color='green'
              />
            </a>
          </div>

          {/* <a>
            <MdDeleteForever
              size={22}
              color='red'
            />
          </a> */}
        </Space>
      );
    },
  },
];

export default b2cUserColumn;
