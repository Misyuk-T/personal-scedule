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
}

const TextField = ({
  id,
  type,
  name,
  placeholder,
  required,
  label,
  disabled,
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
  required: false,
  disabled: false,
};

export default TextField;
