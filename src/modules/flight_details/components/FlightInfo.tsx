import { Divider } from "antd";
import FlightFareSummary from "../../flightSearchNew/elements/FlightFareSummary";
import RefundReissuePolicy from "../../flightSearchNew/elements/RefundReissuePolicy";
import SegmentsTable from "../../flightSearchNew/elements/SegmentsTable";
import { IFlight } from "../../flightSearchNew/types/TypeFlight";

type Props = {
  data: IFlight | undefined;
};
const FlightInfo = ({ data }: Props) => {
  return (
    <div>
      <Divider orientation="left" className="pt-3">
        Travelers Fare Summary
      </Divider>
      <FlightFareSummary flight={data} />

      <Divider orientation="left"> Travelers Passenger Summary</Divider>
      <SegmentsTable passengers={data?.passengers} />

      <Divider orientation="left" className="pt-3">
        Refund Reissue Policy
      </Divider>
      <RefundReissuePolicy />
    </div>
  );
};

export default FlightInfo;
