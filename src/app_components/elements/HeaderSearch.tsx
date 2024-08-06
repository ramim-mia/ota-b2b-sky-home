import { Input, theme } from 'antd';
import React from 'react';
import type { SearchProps } from 'antd/es/input/Search';
import { SearchOutlined } from '@ant-design/icons';

const HeaderSearch = () => {
  const { Search } = Input;

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  return (
    <div
      key='SearchOutlined'
      style={{
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: 25,
      }}
    >
      <Search
        placeholder='PNR / Ticket No / Booking ID'
        allowClear
        enterButton={<SearchOutlined />}
        size='middle'
        onSearch={onSearch}
        style={{ width: '300px' }}
      />
    </div>
  );
};

export default HeaderSearch;
