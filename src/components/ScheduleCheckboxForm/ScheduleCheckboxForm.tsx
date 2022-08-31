import { ChangeEvent, useState } from "react";
import {
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";

import { Schedule, ScheduleId } from "types/schedule";
import _groupBy from "lodash.groupby";
import _isEmpty from "lodash.isempty";

interface ScheduleCheckboxFormProps {
  schedules: Schedule[];
  onChange: (schedules: Schedule[]) => void;
}

const ScheduleCheckboxForm = ({
  schedules,
  onChange,
}: ScheduleCheckboxFormProps) => {
  const [activeSchedules, setActiveSchedule] = useState<Schedule[]>(schedules);

  const scheduleById = _groupBy(schedules, "id");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const currentSchedule = scheduleById[name][0];
    const withItem = [...activeSchedules, currentSchedule];
    const withoutItem = activeSchedules.filter((item) => item.id !== name);
    const validArray = _isEmpty(withoutItem) ? [currentSchedule] : withoutItem;
    const updatedArray = checked ? withItem : validArray;

    setActiveSchedule(updatedArray);
    onChange(updatedArray);
  };

  const getChecked = (itemId: ScheduleId) =>
    activeSchedules.some((item) => item.id === itemId);

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <Stack direction="row">
          {schedules.map(({ id, name, color }) => {
            const isChecked = getChecked(id);

            return (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleChange}
                    name={id}
                  />
                }
                label={name}
                sx={{ color: color }}
              />
            );
          })}
        </Stack>
      </FormGroup>
    </FormControl>
  );
};

export default ScheduleCheckboxForm;
