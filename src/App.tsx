import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './route/Routes';
import lib from './utils/lib';
import Login from './modules/login/pages/Login';
import { useAppSelector } from './utils/ReduxHook';

const App = () => {
  const btoc_commission = useAppSelector(
    (state) => state?.user?.btoc_commission
  );
  return (
    <div>
      <RouterProvider router={browserRouter(btoc_commission)} />
    </div>
  );
};

export default App;
