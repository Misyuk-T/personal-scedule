import { Form, FormikProvider, FormikValues, useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Slider,
  Modal,
  Stack,
  Checkbox,
  Typography,
} from "@mui/material";

import { useTypedSelector } from "redux/store";
import { addScheduleData } from "actions/schedule";
import { Schedule, ScheduleFields } from "types/schedule";

import { modalCenterStyle } from "helpers/cssConstants";
import { toScheduleData } from "helpers/parsers";

interface ModalAddFormProps {
  open: boolean;
  onClose: () => void;
  date: Date | string;
  schedules: Schedule[];
}

const ModalAddForm = ({
  open,
  onClose,
  date,
  schedules,
}: ModalAddFormProps) => {
  const { user } = useTypedSelector((state) => state.user);
  const scheduleValues = {} as ScheduleFields;

  const handleSubmit = (values: FormikValues) => {
    const parsedDate = toScheduleData(values, schedules, date);

    addScheduleData(user.schedules, parsedDate).then(() => {
      onClose();
    });
  };

  schedules.forEach((item) => {
    if (item.type === "boolean") {
      scheduleValues[item.id] = false;
    } else {
      scheduleValues[item.id] = 5;
    }
  });

  const formik = useFormik({
    initialValues: scheduleValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { getFieldProps } = formik;

  return (
    <Modal open={open} onClose={onClose}>
      <FormikProvider value={formik}>
        <Form>
          <Card sx={{ ...modalCenterStyle }}>
            <CardHeader
              subheader="Enter your information. Graphs will be built based on the given data"
              title="Daily information form"
            />

            <Divider />

            <CardContent>
              <Stack direction="column">
                {schedules.map((item) => {
                  const isBooleanType = item.type === "boolean";

                  return (
                    <Stack key={item.id}>
                      <Typography variant="h6" component="h6">
                        {item.name}
                      </Typography>

                      {isBooleanType ? (
                        <Stack direction="row" alignItems="center">
                          Select checkbox:{" "}
                          <Checkbox {...getFieldProps(item.id)} />
                        </Stack>
                      ) : (
                        <Stack>
                          Select amount of range:{" "}
                          <Slider
                            step={1}
                            marks
                            min={1}
                            max={10}
                            {...getFieldProps(item.id)}
                          />
                        </Stack>
                      )}
                    </Stack>
                  );
                })}
              </Stack>
            </CardContent>

            <Divider />

            <Stack justifyContent="flex-end">
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </Stack>
          </Card>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalAddForm;
