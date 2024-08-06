import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleSubAgencyQuery } from "../api/agencyApiEndpoint";

import { Card, Col, Divider, Row, Table, Tag } from "antd";
import dayjs from "dayjs";
import { imgHostLink } from "../../../redux/request";
import subAgencySingleTable from "../utils/myAgencySingleTable";

const SingleSubAgencyInfo = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleSubAgencyQuery(Number(id));

  const [editSelectedAgencyId, setEditSelectedAgencyId] = useState<
    number | null
  >(null);

  const handleEditAgency = (id: number) => {
    setEditSelectedAgencyId(id);
  };
  const handleEditModalClose = () => {
    setEditSelectedAgencyId(null);
  };
  return (
    <div className="mx-4 mt-4">
      <div>
        <Row gutter={[20, 10]}>
          <Col lg={10}>
            <Card className="grid gap-2 mb-4">
              <div className="flex gap-2">
                <span>
                  <div className="flex items-center gap-3">
                    {data?.data?.logo ? (
                      <img
                        src={`${imgHostLink}/${data?.data?.logo}`}
                        alt="agency_logo"
                        width={25}
                        height={25}
                      />
                    ) : (
                      ""
                    )}
                    <span className="text-2xl font-semibold">
                      {data?.data?.agency_name?.toLocaleUpperCase()}
                    </span>
                  </div>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Agency Email</span>
                <span className="font-semibold ml-7">:</span>
                <span>
                  {data?.data?.email ? data?.data?.email : "Not Available"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Agency Phone No</span>
                <span className="font-semibold">:</span>
                <span>
                  {data?.data?.phone ? data?.data?.phone : "Not Available"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Commission</span>
                <span className="font-semibold ml-9">:</span>
                <span>{data?.data?.commission}%</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Created Date</span>
                <span className="ml-8 font-semibold">:</span>
                <div className="flex gap-1">
                  <span>
                    {dayjs(data?.data?.created_at).format("DD-MM-YYYY ") ||
                      "N/A"}
                  </span>
                  <span>
                    &#40;
                    {dayjs(data?.data?.created_at).format("hh:mm A") || ""}
                    &#41;
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Status</span>
                <span className="ml-[75px] font-semibold">:</span>
                <span>
                  {data?.data?.status === 1 ? (
                    <Tag color="green">Active</Tag>
                  ) : (
                    <Tag color="orange">Inactive</Tag>
                  )}
                </span>
              </div>
            </Card>
          </Col>

          {/* <Col lg={6}>
              <div className='flex justify-end '>
                <Button
                  type='primary'
                  className='mb-3'
                  onClick={() => handleEditAgency(data?.data?.id as number)}
                >
                  Update
                </Button>
              </div>
            </Col> */}
        </Row>
        <Divider />
        <Table
          title={() => <p className="font-bold">Users List</p>}
          columns={subAgencySingleTable()}
          dataSource={data?.data?.users}
          loading={false}
          pagination={false}
          className="Table"
          rowClassName="TableTd"
        />
      </div>
      {/* {editSelectedAgencyId && (
          <UpdateAgency
            adminId={editSelectedAgencyId}
            onClose={handleEditModalClose}
          />
        )} */}
    </div>
  );
};

export default SingleSubAgencyInfo;
