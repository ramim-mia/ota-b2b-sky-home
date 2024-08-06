// RequireAuth.tsx
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingIndicator from "../modules/common/spinner/LoadingIndicator";
import { useLazyGetInitialTokenQuery } from "../redux/api/api";
import { setUser } from "../redux/slice/userSlice";
import lib from "../utils/lib";
import { useAppDispatch } from "../utils/ReduxHook";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [trigger, { data, isLoading, isError, isSuccess }] =
    useLazyGetInitialTokenQuery();
  const [triggered, setTriggered] = useState(false);
  const token = lib.getFromLocalStorage("token");
  const location = useLocation();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const dispatch = useAppDispatch();
  if (!triggered) {
    if (token) {
      trigger().unwrap();
    } else {
      setRedirectToLogin(true);
    }
    setTriggered(true);
  }
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError || redirectToLogin) {
    return <Navigate to={"../login"} state={{ from: location }} />;
  }

  if (isSuccess && data) {
    dispatch(setUser({ data: data.data }));
  }
  return children;
};

export default RequireAuth;
