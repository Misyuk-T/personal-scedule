import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useTypedSelector } from "redux/store";

const PrivateRoute = () => {
  const { isAuthorized } = useTypedSelector((state) => state.user);
  const location = useLocation();

  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
