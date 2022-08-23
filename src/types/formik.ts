import { FormikErrors, FormikTouched } from "formik";

export type FieldErrors = FormikErrors<{ [field: string]: string }>;

export type FieldTouched = FormikTouched<{ [field: string]: boolean }>;
