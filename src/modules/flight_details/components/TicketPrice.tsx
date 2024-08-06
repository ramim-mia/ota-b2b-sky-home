import { Card, Divider, theme } from "antd";
import TimeCounter from "../../common/TimeCounter";
import FlightBaggage from "../../flightSearchNew/elements/FlightBaggage";
import { IFlight } from "../../flightSearchNew/types/TypeFlight";

type Props = {
  data: IFlight | undefined;
  passengerQuantity?:
    | 0
    | {
        adult: number;
        child: number;
        infant: number;
      }
    | undefined;
};

const TicketPrice = ({ data }: Props) => {
  const { token } = theme.useToken();
  const fare = data?.fare;
  return (
    <div className="sticky top-28 ">
      <div className="mt-2 mb-3">
        <TimeCounter />
      </div>
      <Card className="mb-4 ">
        <div className="mb-6">
          <Divider orientation="left" style={{ margin: "0" }}>
            Baggage
          </Divider>
          <FlightBaggage flightBaggage={data?.passengers} />
        </div>
      </Card>
      <Card className="">
        <h3 className="text-center m-0 text-[#003566] ">Price Break Down</h3>

        <div className="flex flex-col justify-between gap-1 pb-2 mt-4 text-md">
          <div className="flex justify-between w-full text-right">
            <span>Total</span>
            <span>BDT {fare?.total_price?.toFixed(2) || 0}</span>
          </div>

          <div className="flex justify-between w-full text-right">
            <span>Base Fare</span>
            <span>BDT {fare?.base_fare?.toFixed(2) || 0}</span>
          </div>

          <div className="flex justify-between w-full text-right">
            <span>Tax </span>
            <span>BDT {fare?.total_tax?.toFixed(2) || 0}</span>
          </div>

          <div className="flex justify-between w-full text-right">
            <span> AIT</span>
            <span>BDT {fare?.ait?.toFixed(2) || 0}</span>
          </div>

          <div className="flex justify-between w-full text-right text-blue-400">
            <span>Discount</span>
            <span>BDT {fare?.discount?.toFixed(2) || 0}</span>
          </div>
          {/* <Divider dashed className="py-0 my-0 bg-gray-300" /> */}
        </div>

        <Card style={{ background: token.colorPrimaryBg, marginTop: 12 }}>
          <div className="flex items-center justify-between">
            <h4 className="m-0 font-bold">You need to pay</h4>
            <h4 className="m-0 font-bold">
              BDT {fare?.payable?.toLocaleString()}
            </h4>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default TicketPrice;
