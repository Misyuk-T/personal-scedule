import React, { useState } from "react";
import { Grid, Alert, Stack } from "@mui/material";

import { PieChart, Schedule, ScheduleCheckboxForm } from "components";
import { useTypedSelector } from "redux/store";
import _isEmpty from "lodash.isempty";

import { Schedule as ScheduleType } from "types/schedule";

const Schedules = () => {
  const { schedules } = useTypedSelector((store) => store.schedule);
  const [activeSchedules, setActiveSchedules] =
    useState<ScheduleType[]>(schedules);

  const handleChange = (value: ScheduleType[]) => {
    setActiveSchedules(value);
  };

  return (
    <Grid container spacing={4} mt={1}>
      {_isEmpty(schedules) ? (
        <Alert severity="warning" sx={{ width: "100%", textAlign: "center" }}>
          You need to have one schedule at least to see data analytics. Please
          create schedule on Calendar page
        </Alert>
      ) : (
        <>
          <Grid item xs={9}>
            <Stack>
              <Schedule schedules={activeSchedules} />
              <ScheduleCheckboxForm
                schedules={schedules}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={3}>
            <PieChart schedules={activeSchedules} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Schedules;
