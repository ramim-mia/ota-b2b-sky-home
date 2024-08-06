import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "../app_components/RequireAuth";
import { SidebarLayout } from "../app_components/SidebarLayout";
import AirTicket from "../modules/airticket/pages/AirTicket";
import AirTicketDetails from "../modules/airticket/pages/AirTicketDetails";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import Deposit from "../modules/deposit_request/page/Deposit";
import InstantDeposit from "../modules/deposit_request/page/InstantDeposit";
import FlightDetails from "../modules/flight_details/page/FlightDetails";

import CustomerSupport from "../modules/(B2C)/customer_support/pages/CustomerSupport";
import GeneralLedger from "../modules/generalLedger/pages/GeneralLedger";
import TicketIssue from "../modules/issued/pages/TicketIssue";
import ViewTicketIssuSinglePage from "../modules/issued/pages/ViewTicketIssuSinglePage";
import MyAccount from "../modules/my_account/page/MyAccount";
import ErrorPage from "../modules/not_found/ErrorPage";
import NotFound from "../modules/not_found/NotFound";

import AuthLayout from "../app_components/AuthLayout";
import B2cBookingRequest from "../modules/(B2C)/b2c_booking_request/page/B2cBookingRequest";
import B2CBookingRequestDetails from "../modules/(B2C)/b2c_booking_request/page/B2CBookingRequestDetails";
import ForgotPassword from "../modules/auth/page/ForgotPassword";
import ResetPassword from "../modules/auth/page/ResetPassword";
import VerifyOtp from "../modules/auth/page/VerifyOtp";
import BookingRequest from "../modules/BookingRequest/page/BookingRequest";
import BookingRequestDetails from "../modules/BookingRequest/page/BookingRequestDetails";
import FlightSearch from "../modules/flightSearchNew/pages/FlightSearch";
import FlightSearchV2 from "../modules/flightSearchNew/pages/FlightSearchV2";
import PaymentSuccess from "../modules/issued/pages/PaymentSuccess";
import PaymentUnsuccess from "../modules/issued/pages/PaymentUnsuccess";
import Login from "../modules/login/pages/Login";
import CreateMyAgency from "../modules/my_agency/page/CreateMyAgency";
import MyAgency from "../modules/my_agency/page/MyAgency";
import SingleSubAgencyInfo from "../modules/my_agency/page/SingleMyAgencyInfo";
import TestPage from "../modules/test/page/TestPage";
import TransactionHistory from "../modules/transactionHistory/pages/TransactionHistory";
import Users from "../modules/users/pages/Users";
import { B2CRoutes, webRoutes } from "./RouteLinks";

// import FlightSearch from '../modules/flight_search/pages/FlightSearch';

const errorElement = <ErrorPage />;

export const browserRouter = (btoc_commission: string | null | undefined) =>
  createBrowserRouter([
    {
      element: <AuthLayout />,
      errorElement: errorElement,
      children: [
        {
          path: webRoutes.login,
          element: <Login />,
        },
        {
          path: webRoutes.forgotPassword,
          element: <ForgotPassword />,
        },
        {
          path: webRoutes.verifyOtp,
          element: <VerifyOtp />,
        },
        {
          path: webRoutes.resetPassword,
          element: <ResetPassword />,
        },
      ],
    },

    // protected routes
    {
      element: (
        <RequireAuth>
          <SidebarLayout />
        </RequireAuth>
      ),
      errorElement: errorElement,
      children: [
        {
          path: webRoutes.homeID,
          element: <Dashboard />,
        },
        // {
        //   path: "/airline-commission",
        //   element: <AgencyCommission />,
        // },
        {
          path: webRoutes.home,
          element: <Dashboard />,
        },
        {
          path: webRoutes.flight_search,
          element: <FlightSearch />,
        },
        {
          path: webRoutes.flight_search_id,
          element: <FlightSearch />,
        },
        {
          path: webRoutes.about,
          element: <Dashboard />,
        },
        {
          path: webRoutes.flight_details,
          element: <FlightDetails />,
        },

        {
          path: webRoutes.airticket,
          element: <AirTicket />,
        },
        {
          path: webRoutes.airticketDetails,
          element: <AirTicketDetails />,
        },
        // {
        //   path: webRoutes.travelers,
        //   element: <Travelers />,
        // },
        // {
        //   path: webRoutes.editTravelers,
        //   element: <EditAddTravelers />,
        // },
        // {
        //   path: webRoutes.addTraveler,
        //   element: <AddTraveller />,
        // },
        {
          path: webRoutes.transactionHistory,
          element: <TransactionHistory />,
        },
        {
          path: webRoutes.generalLedger,
          element: <GeneralLedger />,
        },
        {
          path: webRoutes.deposit,
          element: <Deposit />,
        },
        {
          path: webRoutes.instantDeposit,
          element: <InstantDeposit />,
        },
        {
          path: webRoutes.myAccount,
          element: <MyAccount />,
        },

        {
          path: webRoutes.issuedTicket,
          element: <TicketIssue />,
        },
        {
          path: webRoutes.viewIssuedTicket,
          element: <ViewTicketIssuSinglePage />,
        },
        {
          path: webRoutes.paymentSuccess,
          element: <PaymentSuccess />,
        },
        {
          path: "test",
          element: <TestPage />,
        },
        {
          path: webRoutes.paymentUnsuccess,
          element: <PaymentUnsuccess />,
        },
        {
          path: webRoutes.bookingRequest,
          element: <BookingRequest />,
        },
        {
          path: webRoutes.bookingRequestDetails,
          element: <BookingRequestDetails />,
        },
        {
          path: webRoutes.users,
          element: <Users />,
        },
        {
          path: webRoutes.myAgency,
          element: <MyAgency />,
        },
        {
          path: webRoutes.createMyAgency,
          element: <CreateMyAgency />,
        },
        {
          path: webRoutes.myAgencyDetails,
          element: <SingleSubAgencyInfo />,
        },

        // B2C Routes

        {
          path: B2CRoutes.bookingRequest,
          element: btoc_commission && <B2cBookingRequest />,
        },
        {
          path: B2CRoutes.b2cBookingRequestDetails,
          element: btoc_commission && <B2CBookingRequestDetails />,
        },
        {
          path: B2CRoutes.customerSupport,
          element: <CustomerSupport />,
        },

        // {
        //   path: B2CRoutes.user,
        //   element: <B2C_User />,
        // },
        // {
        //   path: B2CRoutes.payment,
        //   element: <B2C_Payment />,
        // },
        // {
        //   path: B2CRoutes.report,
        //   element: <B2C_Report />,
        // },
        // {
        //   path: B2CRoutes.customerSupport,
        //   element: <CustomerSupport />,
        // },
        // {
        //   path: B2CRoutes.createComplain,
        //   element: <CreateComplain />,
        // },
        // {
        //   path: B2CRoutes.detailsComplain,
        //   element: <DetailsComplain />,
        // },
        // {
        //   path: B2CRoutes.setting,
        //   element: <B2C_Setting />,
        // },
        // {
        //   path: B2CRoutes.ticket,
        //   element: <TicketList />,
        // },
        // {
        //   path: B2CRoutes.viewTicket,
        //   element: <ViewSingleTicket />,
        // },

        // 404
        {
          path: "*",
          element: <NotFound />,
          errorElement: errorElement,
        },
      ],
    },

    {
      path: webRoutes.flight_search_V2,
      element: <FlightSearchV2 />,
    },
  ]);
