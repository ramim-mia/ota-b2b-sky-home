import { Button, Divider, Form, message } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateBookingRequestMutation } from "../../BookingRequest/api/bookingRequestApiEndpoint";
import TravellerForm from "../elemenet/TravellerForm";
import { formInitialValue } from "../utils/formInitialValue";

type IProps = {
  passengerQuantity:
    | 0
    | {
        adult: number;
        child: number;
        infant: number;
        kids: number;
      }
    | undefined;
};

const TicketForm = ({ passengerQuantity }: IProps) => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [form] = Form.useForm();

  const formInitialDateValue = formInitialValue();

  // booking request
  const [
    createBookingRequest,
    { isLoading: RequestLoading, isSuccess, isError: bookingRequestError },
  ] = useCreateBookingRequestMutation();

  const handleCombinedSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = [];
        let totalPassengerCount = 0;
        for (const [type, count] of Object.entries(
          passengerQuantity as { adult: number; child: number; infant: number }
        )) {
          totalPassengerCount += count;

          for (
            let i = totalPassengerCount - count + 1;
            i <= totalPassengerCount;
            i++
          ) {
            const passengerData = {
              type:
                type === "adult"
                  ? "ADT"
                  : type === "child"
                  ? "C11"
                  : type === "infant"
                  ? "INF"
                  : "C05",
              title: values[`${type}-${i}-title`],
              first_name: values[`${type}-${i}-first_name`],
              last_name: values[`${type}-${i}-last_name`],
              email: values[`${type}-${i}-email`],
              phone: values[`${type}-${i}-phone`],
              passport_number: values[`${type}-${i}-passport_number`],
              passport_expiry_date: values[`${type}-${i}-passport_expiry_date`],

              frequent_flyer_airline: values[
                `${type}-${i}-frequent_flyer_airline`
              ]
                ? values[`${type}-${i}-frequent_flyer_airline`]
                : undefined,
              frequent_flyer_number: values[
                `${type}-${i}-frequent_flyer_number`
              ]
                ? values[`${type}-${i}-frequent_flyer_number`]
                : undefined,
              date_of_birth:
                values[`${type}-${i}-date_of_birth`]?.format("YYYY-MM-DD"),
              country_id: values[`${type}-${i}-country_id`],
              city: values[`${type}-${i}-city`],
            };
            formData.push(passengerData);
          }
        }

        const data = {
          flight_id: id as string,
          traveler: formData as any,
        };
        createBookingRequest(data);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Your Booking Request has been Submitted ");
      navigate("/bookingRequest");
    } else if (bookingRequestError) {
      message.error("something went wrong");
    }
  }, [isSuccess, bookingRequestError]);

  return (
    <div className="mt-8">
      <Divider orientation="left" className="">
        <h3 className="text-[#003566] text-[20px] mt-4 mb-2">
          Enter Traveler Details
        </h3>
      </Divider>
      {/* dynamic collapsible Form */}
      <Form
        layout="vertical"
        form={form}
        initialValues={formInitialDateValue}
        onFinish={handleCombinedSubmit}
      >
        <TravellerForm passengers={passengerQuantity} form={form} />
        <br />
        <Form.Item style={{ textAlign: "end" }}>
          <Button loading={RequestLoading} type="primary" htmlType="submit">
            Book Ticket
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TicketForm;
