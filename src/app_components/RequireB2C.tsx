import { Navigate } from 'react-router-dom';
import { webRoutes } from '../route/RouteLinks';
import { useAppSelector } from '../utils/ReduxHook';

const RequireB2C = ({ children }: { children: JSX.Element }) => {
  const btoc_commission = useAppSelector(
    (state) => state?.user?.btoc_commission
  );
  if (btoc_commission) {
    return children;
  }
  return '';
};

export default RequireB2C;
