import { Card, theme } from "antd";
import React from "react";
import { useAppSelector } from "../../../utils/ReduxHook";
import { selectUser } from "../../../redux/slice/userSlice";

const RefundReissuePolicy = () => {
  const { token } = theme.useToken();
  const user = useAppSelector(selectUser);
  return (
    <Card className="flex-1 px-6 py-3 mt-4">
      <h3 className="m-0 text-center">Policy</h3>
      <div>
        <p className="text-sm">
          Cancellation Fee ={" Airline's"} Fee + {user.agency_name}
        </p>
        <p className="text-sm">
          Fee Refund Amount = Paid Amount - Cancellation Fee Re-issue
        </p>
        <p className="text-sm">
          Re-issue Fee ={" Airline's"} Fee + Fare Difference +{" "}
          {user.agency_name}
        </p>
        <p className="text-sm">
          Fee *The {"airline's"} fee is indicative and per person.
        </p>
        <p>Convenience fee is non-refundable.</p>
      </div>
    </Card>
  );
};

export default RefundReissuePolicy;
