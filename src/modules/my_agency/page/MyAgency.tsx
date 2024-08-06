import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchTableInfo from "../../common/SearchTableInfo";
import { useLazyGetAllSubAgencyQuery } from "../api/agencyApiEndpoint";
import subAgencyTableColumn from "../utils/myAgencyTableColumn";

const MyAgency = () => {
  const [getAllSubAgency, { data }] = useLazyGetAllSubAgencyQuery();
  const [statusFilter, setStatusFilter] = useState<string>("1");
  const selectStatusFilter = (value: string) => {
    setStatusFilter(value);
  };
  // search agency
  const [searchAgency, setSearchAgency] = useState<string>();
  const handleSearch = (value: string) => {
    setSearchAgency(value);
  };

  // pagination
  const size_limit = 20;
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
    window.scrollTo(0, 0);
  };

  // request url
  useEffect(() => {
    let url = `/btob/sub-agent?skip=${
      (pagination.current - 1) * size_limit
    }&limit=${pagination.pageSize}`;
    if (statusFilter) {
      url += `&status=${statusFilter}`;
    }

    if (searchAgency) {
      url += `&name=${searchAgency}`;
    }
    getAllSubAgency(url);
  }, [pagination, statusFilter, searchAgency]);

  return (
    <div className="mx-4 mt-4">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <Link to={"/createMyAgency"} className="w-full">
          <Button type="primary" className="mb-3">
            Create Sub Agency
          </Button>
        </Link>

        <SearchTableInfo
          inputSearchChange={handleSearch}
          options={[
            { value: "1", label: "Active" },
            { value: "0", label: "Inactive" },
          ]}
          selectStatusFilter={selectStatusFilter}
          defaultStatus={statusFilter}
          hideDateRange={true}
          inputSearchLabel="Search By Agency Name"
        />
      </div>

      <Table
        columns={subAgencyTableColumn()}
        dataSource={data?.data}
        loading={false}
        className="Table"
        rowClassName="TableTd"
        pagination={
          data?.total !== undefined && data?.total < 20
            ? false
            : {
                ...pagination,
                total: data?.total,
                showSizeChanger: true,
                pageSizeOptions: ["20", "50", "100"],
                onChange: handlePaginationChange,
              }
        }
      />
    </div>
  );
};

export default MyAgency;
