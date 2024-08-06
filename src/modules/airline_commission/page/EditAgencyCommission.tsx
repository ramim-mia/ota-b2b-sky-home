import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import errorHandler from "../../common/errorHandler";
import { useEditAgencyCommissionMutation } from "../api/AgencyApiEndpoint";
import { IGetAgencyCommission } from "../type/AgencyCommissionType";

interface EditAirCommProps {
  airCommData: IGetAgencyCommission | null;
  onClose: () => void;
}

const EditAgencyCommission = ({ airCommData, onClose }: EditAirCommProps) => {
  const [form] = Form.useForm();
  const [showSotoCommission, setShowSotoCommission] = useState(false);
  const [editAirlineCommission, { isLoading, isSuccess, isError, error }] =
    useEditAgencyCommissionMutation();

  useEffect(() => {
    if (airCommData) {
      form.setFieldsValue({
        domestic_commission: airCommData?.domestic_commission,
        airline_code: airCommData?.airline_code,
        from_dac_commission: airCommData?.from_dac_commission,
        to_dac_commission: airCommData?.to_dac_commission,

        capping: airCommData?.capping,
        soto_allowed: airCommData?.soto_allowed,
        soto_commission: airCommData?.soto_commission,
      });
      setShowSotoCommission(airCommData?.soto_allowed === 1);
    }
  }, [airCommData]);

  const onFinish = async (values: any) => {
    const body = {
      domestic_commission: Number(values?.domestic_commission),
      from_dac_commission: Number(values?.from_dac_commission),
      to_dac_commission: Number(values?.to_dac_commission),
      capping: values.capping ? 1 : 0,
      soto_allowed: values?.soto_allowed ? 1 : 0,
      soto_commission: values?.soto_allowed
        ? Number(values?.soto_commission)
        : 0,
    };

    await editAirlineCommission({ body, code: values?.airline_code });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Airline Commission has been updated");
      form.resetFields();
      onClose();
    } else if (isError) {
      if (error) {
        errorHandler(error);
      }
    }
  }, [isSuccess, isError]);

  return (
    <Modal
      open={airCommData !== null}
      onCancel={onClose}
      footer={null}
      centered
      title="Edit Agency commission"
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
          <Input disabled />
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
                required: true,
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

export default EditAgencyCommission;
