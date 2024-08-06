import { Checkbox, Divider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useEffect, useState } from "react";

const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = [1];
type IProps = {
  options: {
    label: string;
    value: string;
  }[];
  setChecked?: React.Dispatch<
    React.SetStateAction<CheckboxValueType[] | undefined>
  >;
  checked?: CheckboxValueType[];
  paginationCondition?: any;
  width?: string;
};
const CommonCheckbox = ({
  options,
  checked,
  setChecked,
  width,
  paginationCondition,
}: IProps) => {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = options.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < options.length;

  useEffect(() => {
    if (paginationCondition == "search") {
      setChecked && setChecked([""]);
      setCheckedList(defaultCheckedList);
    }
  }, [paginationCondition]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setChecked && setChecked(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(
      e.target.checked ? options.map((item: any) => item.value) : []
    );
    setChecked &&
      setChecked(
        e.target.checked ? options.map((item: any) => item.value) : []
      );
  };

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        All
      </Checkbox>
      <Divider className="my-2" />
      <div style={{ maxWidth: width || "200px" }}>
        <CheckboxGroup
          options={options}
          value={checked ? checked : checkedList}
          onChange={onChange}
          className="flex flex-col gap-y-2"
        />
      </div>
    </div>
  );
};

export default CommonCheckbox;
