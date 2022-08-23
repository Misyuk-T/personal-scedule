import { useTypedSelector } from "redux/store";
import { Backdrop, CircularProgress } from "@mui/material";

const PageLoader = () => {
  const { isAuthObserve } = useTypedSelector((state) => state.user);

  return isAuthObserve ? (
    <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={isAuthObserve}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <></>
  );
};

export default PageLoader;
