import { useState } from "react";
import { useFormik, Form, FormikProvider, FormikValues } from "formik";
import { ColorPicker } from "material-ui-color";
import {
  Button,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Grid,
} from "@mui/material";
import _groupBy from "lodash.groupby";

import { TextField } from "components";
import { addSchedule, editSchedule } from "actions/schedule";
import { useTypedDispatch, useTypedSelector } from "redux/store";

import { Schedule, ColorObject } from "types/schedule";
import { scheduleSchema } from "helpers/validationShemes";
import { DEFAULT_COLOR } from "helpers/constants";

interface ScheduleFormProps {
  onClose: () => void;
  isEditForm?: boolean;
  scheduleId?: string;
}

const ScheduleForm = ({
  onClose,
  isEditForm,
  scheduleId,
}: ScheduleFormProps) => {
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);
  const { schedules } = useTypedSelector((state) => state.schedule);

  const schedulesById = _groupBy(schedules, "id");
  const editedSchedule = scheduleId
    ? schedulesById[scheduleId][0]
    : ({} as Schedule);
  const { name, description, color, type } = editedSchedule;
  const initialValues = {
    name: name || "",
    description: description || "",
    color: color,
    type: type || "range",
  };

  const [backgroundColor, setBackgroundColor] = useState<string>(
    color || DEFAULT_COLOR
  );

  const handleChangeColor = (value: ColorObject) => {
    const background = value.css.backgroundColor;

    setBackgroundColor(background || "#fff");
  };

  const handleSubmit = (values: FormikValues) => {
    if (isEditForm && scheduleId) {
      dispatch(editSchedule(scheduleId, values as Schedule));
    } else {
      dispatch(addSchedule(user.id, values as Schedule));
    }

    onClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: scheduleSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit({ ...values, color: backgroundColor });
    },
  });

  const { isValid, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack direction="column" spacing={2}>
              <TextField
                name="name"
                label="Schedule Name"
                size="small"
                autoFocus
              />
              <TextField
                name="description"
                label="Schedule Description"
                size="small"
                fullWidth
                multiline
              />
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Stack direction="column" alignItems="center">
              <FormLabel>Choose Color:</FormLabel>

              <ColorPicker
                value={backgroundColor}
                onChange={handleChangeColor}
                disableAlpha
                hideTextfield
              />
            </Stack>

            <Stack direction="column" alignItems="center">
              <FormLabel>Type of schedule:</FormLabel>
              <RadioGroup {...getFieldProps("type")} row>
                <FormControlLabel
                  value="boolean"
                  control={<Radio />}
                  label="boolean"
                />
                <FormControlLabel
                  value="range"
                  control={<Radio />}
                  label="range"
                />
              </RadioGroup>
            </Stack>
          </Grid>

          <Grid item xs={4}>
            <Stack direction="row" spacing={2}>
              <Button disabled={!isValid} type="submit" variant="contained">
                Save
              </Button>

              <Button onClick={onClose} color="error" variant="contained">
                Close Form
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

ScheduleForm.defaultProps = {
  isEditForm: false,
  scheduleId: "",
};

export default ScheduleForm;
