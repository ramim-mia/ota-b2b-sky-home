import { BreadcrumbProps, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { webRoutes } from "../../../route/RouteLinks";
import SearchTableInfo from "../../common/SearchTableInfo";
import { useLazyGetTicketIssuedListQuery } from "../api/ticketIssuedEndpoints";
import ticketissueListColumn from "../utils/ticketissueListColumn";
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.home,
      title: <Link to={webRoutes.home}>Dashboard</Link>,
    },
    {
      key: webRoutes.issuedTicket,
      title: <Link to={""}>Issued Ticket</Link>,
    },
  ],
};
const TicketIssue = () => {
  const [getTicketIssued, { data }] = useLazyGetTicketIssuedListQuery();
  const [status, setStatus] = useState<any>();
  const [input, setInputSearch] = useState<any>();

  /* search and filter */
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  useEffect(() => {
    getTicketIssued(
      `/btob/ticket-issue?skip=${pagination.current - 1}&limit=${
        pagination.pageSize
      }`
    );
  }, [pagination]);
  useEffect(() => {
    status
      ? getTicketIssued(`/btob/ticket-issue?ticket_issue_status=${status}`)
      : getTicketIssued(`/btob/ticket-issue`);
  }, [status]);
  useEffect(() => {
    if (input?.indexOf("@") !== -1) {
      input
        ? getTicketIssued(`/btob/ticket-issue?email=${input}`)
        : getTicketIssued(`/btob/ticket-issue`);
    } else {
      input
        ? getTicketIssued(`/btob/ticket-issue?name=${input}`)
        : getTicketIssued(`/btob/ticket-issue`);
    }
  }, [input]);

  const selectSearchs = (value: string) => {
    setStatus(value);
  };
  const selectSearchon = (value: string) => {
    setInputSearch(value);
  };
  const handlePaginationChange = (current: number, pageSize: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current,
      pageSize,
    }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="mx-4 mt-4">
      <div>
        <SearchTableInfo
          title={`Issued Ticket List (${data?.total || 0})`}
          selectStatusFilter={selectSearchs}
          inputSearchChange={selectSearchon}
          options={[
            { value: "complete", label: "Complete" },
            { value: "incomplete", label: "Incomplete" },
            { value: "refund", label: "Refund" },
            { value: "reissue", label: "Reissue" },
          ]}
        />
        <Table
          size="small"
          columns={ticketissueListColumn()}
          dataSource={data?.data}
          style={{ borderTop: "1px solid #E7E7E7" }}
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
    </div>
  );
};

export default TicketIssue;
