import { Table } from 'antd';
import React from 'react';
import SearchTableInfo from '../../common/SearchTableInfo';
import BasePageContainer from '../../../app_components/PageContainer';
import { BreadcrumbProps } from 'antd/lib';
import { webRoutes } from '../../../route/RouteLinks';
import { Link } from 'react-router-dom';
import generalLedgerColumn from '../utils/generalLedgerColumn';

const GeneralLedger = () => {
  const data: any = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const selectSearchs = (value: string) => {
    console.log(value);
  };
  const selectSearchon = (value: string) => {
    console.log(value);
  };

  const breadcrumb: BreadcrumbProps = {
    items: [
      {
        key: webRoutes.generalLedger,
        title: <Link to={webRoutes.generalLedger}>General Ledger</Link>,
      },
    ],
  };
  return (
    <div>
      <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
        <SearchTableInfo
          selectStatusFilter={selectSearchs}
          inputSearchChange={selectSearchon}
          options={[
            { value: 'showall', label: 'Show All' },
            { value: 'Deposit', label: 'Deposit' },
            { value: 'Purchase', label: 'Purchase' },
            { value: 'Loan', label: 'Loan' },
            { value: 'Return', label: 'Return' },
          ]}
        />
        <Table
          columns={generalLedgerColumn()}
          dataSource={data}
          style={{ border: '1px solid #E7E7E7' }}
        />
      </BasePageContainer>
    </div>
  );
};

export default GeneralLedger;
