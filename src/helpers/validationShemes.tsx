import * as Yup from "yup";
import { REG_EXP_URL } from "./constants";

export const accountProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  website: Yup.string().matches(REG_EXP_URL, "URL is not valid"),
  statement: Yup.string().max(150, "Too Long!"),
});
