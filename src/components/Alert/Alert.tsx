import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { SAVE_DATA } from "helpers/constants";

interface AccountProfileDetailsProps {
  showAlert: boolean;
  onToggle: () => void;
  message?: string;
  type?: "success" | "info" | "warning" | "error";
}

const Alert = ({
  showAlert,
  onToggle,
  message,
  type,
}: AccountProfileDetailsProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={showAlert}
      autoHideDuration={3000}
      onClose={onToggle}
    >
      <MuiAlert severity={type} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

Alert.defaultProps = {
  message: SAVE_DATA,
  type: "success",
};

export default Alert;
