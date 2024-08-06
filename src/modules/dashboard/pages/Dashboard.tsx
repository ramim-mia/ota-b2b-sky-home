import { Divider } from "antd";
import DashboardAmountCards from "../Components/DashboardAmountCards";
import DashboardCards from "../Components/DashboardCards";
import DashboardReminder from "../Components/DashboardReminder";
import "../style/dashboard.css";
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="mx-4">
      <DashboardCards />
      <Divider className="my-8" />
      <DashboardAmountCards />
      <Divider className="my-8" />
      <DashboardReminder />
    </div>
  );
};

export default Dashboard;
