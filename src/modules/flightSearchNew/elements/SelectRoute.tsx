import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { selectSetting } from "../../../redux/slice/settingsSlice";
import { useAppSelector } from "../../../utils/ReduxHook";

const SelectRoute = ({ setRoute, route: ac }: any) => {
  const settings = useAppSelector(selectSetting);
  const handleRouteChange = (e: RadioChangeEvent) => {
    setRoute(e.target.value);
  };
  const routes = ["One Way", "Round Trip", "Multi City"];

  return (
    <Radio.Group
      onChange={handleRouteChange}
      value={ac}
      className="flex flex-row "
    >
      {routes.map((route, index) => (
        <Radio
          className={` px-3 py-1 rounded-sm border-2 backdrop-blur-lg 
          ${
            route === ac
              ? "text-white bg-blue-400 shadow-lg "
              : "text-blue-600 bg-blue-300 bg-opacity-10"
          }
            shadow hover:shadow-md font-semibold text-lg`}
          key={index}
          value={route}
        >
          <div className="text-xs md:text-md ">{route}</div>
        </Radio>
      ))}
    </Radio.Group>

    // <div className="route-select ">
    //   <Segmented
    //     defaultValue="One Way"
    //     style={{
    //       marginBottom: 6,
    //       transition: "none",
    //       backgroundColor: settings.navTheme === "light" ? "#fff" : "#222",
    //     }}
    //     onChange={(value) => handleRouteChange(value.toString())} // Convert value to string
    //     options={["One Way", "Round Trip", "Multi City"]}
    //   />
    // </div>
  );
};

export default SelectRoute;
