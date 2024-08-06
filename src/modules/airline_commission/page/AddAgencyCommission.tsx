import { Button, Checkbox, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import errorHandler from "../../common/errorHandler";
import { useCreateAgencyCommissionMutation } from "../api/AgencyApiEndpoint";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AddAgencyCommission: React.FC<Props> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [showSotoCommission, setShowSotoCommission] = useState(false);

  const [createAirlineCommission, { isLoading, isSuccess, isError, error }] =
    useCreateAgencyCommissionMutation();

  const onFinish = async (values: any) => {
    const body = {
      domestic_commission: Number(values?.domestic_commission),
      airline_code: values?.airline_code,
      from_dac_commission: Number(values?.from_dac_commission),
      to_dac_commission: Number(values?.to_dac_commission),
      capping: values.capping === true ? 1 : 0,
      soto_allowed: values?.soto_allowed === true ? 1 : 0,
      soto_commission:
        values?.soto_allowed === true ? Number(values?.soto_commission) : 0,
    };
    await createAirlineCommission(body);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Airline commission created successfully.");
      form.resetFields();
      setOpen(false);
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isSuccess, isError]);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      title="AddAgency commission"
      destroyOnClose
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Airline Code"
          name="airline_code"
          rules={[
            { required: true, message: "Please input Airline Code!" },
            {
              max: 2,
              message: "Airline Code must be at most 2 characters long",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Domestic Commission"
          name="domestic_commission"
          rules={[
            {
              required: true,
              message: "Please input To Domestic Commission!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Form Dhaka"
          name="from_dac_commission"
          rules={[
            {
              required: true,
              message: "Please input Form Dhaka!",
            },
            // {
            //   pattern: /^(0|[1-9]\d?|99)(\.\d{1,2})?$/,
            //   message: "Form Dhaka must be a number between 0 and 99.99",
            // },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="To Dhaka"
          name="to_dac_commission"
          rules={[
            {
              required: true,
              message: "Please input To Dhaka!",
            },
            // {
            //   pattern: /^(0|[1-9]\d?|99)(\.\d{1,2})?$/,
            //   message: "To Dhaka must be a number between 0 and 99.99",
            // },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <div className="flex justify-between">
          <Form.Item label="Capping" name="capping" valuePropName="checked">
            <Checkbox />
          </Form.Item>

          <Form.Item
            label="Soto Allowed"
            name="soto_allowed"
            valuePropName="checked"
          >
            <Checkbox
              onChange={(e) => setShowSotoCommission(e.target.checked)}
            />
          </Form.Item>
        </div>

        {showSotoCommission && (
          <Form.Item
            label="Soto Commission"
            name="soto_commission"
            rules={[
              {
                required: showSotoCommission,
                message: "Please input Soto Commission!",
              },
              // {
              //   pattern:
              //     /^(?:7(?:\.[0-9]{1,2})?|0(?:\.[0-9]{1,2})?|[1-6](?:\.[0-9]{1,2})?)$/,
              //   message: "Soto Commission must be a number between 0 and 7.99%",
              // },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAgencyCommission;
