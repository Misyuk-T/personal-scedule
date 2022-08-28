import { useState } from "react";
import { useFormik, Form, FormikProvider, FormikValues } from "formik";
import { ColorPicker } from "material-ui-color";
import { Button, Stack, Typography } from "@mui/material";
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
  const { name, description, color } = editedSchedule;

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
    initialValues: {
      name: name || "",
      description: description || "",
      color: color,
    },
    validateOnChange: false,
    validationSchema: scheduleSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit({ ...values, color: backgroundColor });
    },
  });

  const { isValid, dirty } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack>
          <Stack direction="column" width="100%" spacing={2} mr={10}>
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
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <Typography>
              Color:{" "}
              <Typography color={backgroundColor}>{backgroundColor}</Typography>
            </Typography>
            <ColorPicker
              value={backgroundColor}
              onChange={handleChangeColor}
              disableAlpha
              hideTextfield
            />
          </Stack>

          <Button
            disabled={!isValid && !dirty}
            type="submit"
            variant="contained"
          >
            Save Changes
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

ScheduleForm.defaultProps = {
  isEditForm: false,
  scheduleId: "",
};

export default ScheduleForm;
