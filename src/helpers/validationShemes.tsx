import * as Yup from "yup";
import { REG_EXP_URL, REG_EXP_HEX } from "./constants";

export const accountProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  website: Yup.string().matches(REG_EXP_URL, "URL is not valid"),
  statement: Yup.string().max(150, "Too Long!"),
});

export const scheduleSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().max(100, "Too Long!"),
  color: Yup.string().matches(REG_EXP_HEX, "HEX is not valid"),
});
