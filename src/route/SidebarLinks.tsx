import { CrownFilled } from "@ant-design/icons";
import { BiLogoSquarespace, BiSolidDashboard } from "react-icons/bi";
import { FaSearchengin } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { MdAirplaneTicket, MdOutline6FtApart } from "react-icons/md";
import { selectUser } from "../redux/slice/userSlice";
import { useAppSelector } from "../utils/ReduxHook";
import { B2CRoutes, webRoutes } from "./RouteLinks";

export default (btoc_commission: string | null | undefined) => {
  const user = useAppSelector(selectUser);

  return {
    route: {
      path: "/",
      routes: [
        {
          path: webRoutes.home,
          name: "Dashboard",
          icon: <BiSolidDashboard />,
        },
        {
          path: webRoutes.flight_search,
          name: "Flight Search",
          icon: <FaSearchengin />,
        },

        {
          path: webRoutes.bookingRequest,
          name: "Booking Request",
          icon: <MdAirplaneTicket />,
        },

        {
          path: webRoutes.airticket,
          name: "Booking List",
          icon: <MdAirplaneTicket />,
        },
        {
          path: webRoutes.issuedTicket,
          name: "Ticket Issued",
          icon: <MdAirplaneTicket />,
        },
        {
          path: "/transaction-history",
          name: "Transaction History",
          icon: <GrTransaction />,
          component: "./travelers",
        },
        {
          path: user?.ref_id ? "" : webRoutes.myAgency,
          name: "My Agency",
          icon: <BiLogoSquarespace />,
        },
        // {
        //   name: "Setting",
        //   path: "/",
        //   icon: <CrownFilled />,
        //   routes: [
        //     {
        //       path: "/airline-commission",
        //       name: "Agency Commission",
        //       icon: <CrownFilled />,
        //     },
        //   ],
        // },

        btoc_commission && {
          path: "//",
          name: <p className="font-semibold text-white">B2C</p>,
          icon: <MdOutline6FtApart />,
          routes: [
            {
              path: B2CRoutes.bookingRequest,
              name: "B2C Booking Request",
              icon: <CrownFilled />,
            },
          ],
        },
      ],
    },
    location: {
      pathname: "/",
    },
  };
};
