import { Outlet, Navigate } from "react-router-dom";

import { useTypedSelector } from "redux/store";

const PrivateRoute = () => {
  const { isAuthorized } = useTypedSelector((state) => state.user);

  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
