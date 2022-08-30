import { useFormikContext } from "formik";
import { TextField as MuiTextField } from "@mui/material";
import { FieldErrors } from "../../types/formik";

interface AccountProfileDetailsProps {
  id?: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  size?: "medium" | "small";
}

const TextField = ({
  id,
  type,
  name,
  placeholder,
  required,
  label,
  disabled,
  autoFocus,
  size,
  fullWidth,
  multiline,
}: AccountProfileDetailsProps) => {
  const { errors, getFieldProps } = useFormikContext();
  const fieldErrors: FieldErrors = errors;
  const fieldErrorText = fieldErrors[name];

  return (
    <>
      <MuiTextField
        id={id}
        type={type}
        required={required}
        label={label}
        error={!!fieldErrorText}
        helperText={fieldErrorText}
        placeholder={placeholder}
        {...getFieldProps(name)}
        variant="outlined"
        disabled={disabled}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        size={size}
        multiline={multiline}
      />
    </>
  );
};

TextField.defaultProps = {
  id: "",
  className: "",
  type: "text",
  placeholder: "Enter your information",
  label: "",
  size: "medium",
  required: false,
  multiline: false,
  disabled: false,
  autoFocus: false,
  fullWidth: false,
};

export default TextField;
