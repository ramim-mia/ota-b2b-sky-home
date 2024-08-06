import { Button, Flex } from 'antd';
import React, { useState } from 'react';

import bkashLogo from '../../../assets/images/bkash.png';
import nagadLogo from '../../../assets/images/nagad.png';
import InstanceDepositFields from '../elements/InstanceDepositFields';

const InstantDeposit = () => {
  return (
    <>
      <Flex gap='small' wrap='wrap'>
        <img src={bkashLogo} alt='' />
      </Flex>
      <InstanceDepositFields />
    </>
  );
};

export default InstantDeposit;
