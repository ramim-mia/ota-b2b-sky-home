import { InputNumber } from 'antd';
import React from 'react';

type Props = {
  disabled?: boolean;
};
const NumberInputs = ({ disabled }: Props) => {
  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (
      !(
        e.key === 'Backspace' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Delete'
      ) &&
      isNaN(Number(e.key))
    ) {
      e.preventDefault();
    }
  };

  return (
    <InputNumber
      disabled={disabled}
      onKeyDown={handleKeyDown}
      style={{ width: '100%' }}
    />
  );
};

export default NumberInputs;
