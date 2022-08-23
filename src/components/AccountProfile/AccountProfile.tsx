import { useState } from "react";
import { useFormik, Form, FormikProvider, FormikValues } from "formik";
import {
  Stack,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";

import { TextField } from "../TextField";
import { Alert } from "../Alert";

import { useTypedDispatch } from "redux/store";
import { updateUser } from "actions/user";
import { UPDATE_DATA } from "helpers/constants";
import { accountProfileSchema } from "helpers/validationShemes";
import { User } from "types/user";

interface AccountProfileDetailsProps {
  userInformation: User;
}

export const AccountProfileDetails = ({
  userInformation,
}: AccountProfileDetailsProps) => {
  const dispatch = useTypedDispatch();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const toggleAlert = () => {
    setShowAlert((prevState) => !prevState);
  };

  const handleSubmit = (values: FormikValues) => {
    dispatch(updateUser(userInformation.id, values));
    toggleAlert();
  };

  const formik = useFormik({
    initialValues: {
      name: userInformation.name,
      email: userInformation.email,
      website: userInformation.website,
      statement: userInformation.statement,
    },
    enableReinitialize: true,
    validationSchema: accountProfileSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { isValid, dirty } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />

          <Divider />

          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField name="name" label="Name" required />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField name="statement" label="Your Statement" />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField name="website" label="Personal website" />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField name="email" label="Email Address" disabled />
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          <Stack justifyContent="flex-end">
            <Button
              disabled={!isValid || !dirty}
              color="primary"
              variant="contained"
              type="submit"
            >
              Save details
            </Button>
          </Stack>
        </Card>
      </Form>

      <Alert
        onToggle={toggleAlert}
        showAlert={showAlert}
        message={UPDATE_DATA}
      />
    </FormikProvider>
  );
};

export default AccountProfileDetails;
