import React from 'react';
import { Col, Form, Select } from 'antd';
import { useUseGetAllTravelerListQuery } from '../../travellers/api/TravelersEndpoints';
type Props = {
  name?: (string | number)[] | string;
  label?: string;
  size?: number;
  smSize?: number;
  mdSize?: number;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  xlSize?: number;
  xsSize?: number;
  small?: string;
  onSelect?: any;
  onChange?: React.Dispatch<React.SetStateAction<number>> | any;
  offDropDown?: boolean;
  instantSelect?: React.Dispatch<React.SetStateAction<undefined>>;
  passengerType: 'ADT' | 'INF' | 'C11';
};
const SelectTravelerList = ({
  name,
  label,
  size,
  smSize,
  mdSize,
  disabled,
  required,
  placeholder,
  xlSize,
  xsSize,
  small,

  onChange,
  passengerType,
}: Props) => {
  const { Option } = Select;
  const { data, isLoading } = useUseGetAllTravelerListQuery();
  return (
    <Col xs={24} sm={12} md={8} lg={size} xl={xlSize}>
      <Form.Item
        style={{ margin: 0, padding: 0 }}
        name={name}
        label={label}
        rules={[
          {
            required: required || false,
            message: `${label} is required!`,
          },
        ]}
      >
        <Select
          loading={isLoading}
          placeholder={placeholder ? placeholder : ` ${label}`}
          showSearch
          onChange={onChange}
          disabled={disabled}
          allowClear
          size={small ? 'small' : 'middle'}
          filterOption={(input, option) => {
            return (
              option?.children?.toString()?.toUpperCase() as string
            ).includes(input?.toUpperCase() as string);
          }}
        >
          {data?.data
            ?.filter((item) => item.type === passengerType)
            .map((item) => (
              <Option key={item.id} value={item.id}>
                {item.first_name}
              </Option>
            ))}
        </Select>
      </Form.Item>
    </Col>
  );
};

export default SelectTravelerList;
