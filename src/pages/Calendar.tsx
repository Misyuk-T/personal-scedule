import React, { useState } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip,
  Resources,
  Toolbar,
  DateNavigator,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Backdrop, CircularProgress, Paper } from "@mui/material";

import _isEmpty from "lodash.isempty";
import { useTypedSelector } from "redux/store";
import { toCalendarData, toResourcesScheduleData } from "helpers/parsers";

import { ModalAddForm, ScheduleList } from "components";
import { TimeTableCellProps } from "../types/calendar";

const Calendar = () => {
  const { schedules, isLoading } = useTypedSelector((state) => state.schedule);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [date, setDate] = useState<Date>();

  const formattedData = toCalendarData(schedules);
  const formattedResourceData = toResourcesScheduleData(schedules);
  const calendarData = _isEmpty(formattedData) ? [] : formattedData;

  const handleToggleModal = () => {
    setIsOpenModal((prevState) => !prevState);
  };

  const handleCellClick = (day: Date) => () => {
    setDate(day);
    handleToggleModal();
  };

  const TimeTableCell = (props: TimeTableCellProps) => {
    return (
      <MonthView.TimeTableCell
        {...props}
        onClick={handleCellClick(props.startDate)}
      />
    );
  };

  return (
    <>
      <ScheduleList schedules={schedules} />

      <Paper>
        <Scheduler data={calendarData}>
          <ViewState />
          <MonthView timeTableCellComponent={TimeTableCell} />
          <Appointments />
          <Resources data={formattedResourceData} />

          <AllDayPanel />
          <AppointmentTooltip showCloseButton />
          <Toolbar />
          <DateNavigator />
        </Scheduler>
      </Paper>

      <ModalAddForm
        schedules={schedules}
        open={isOpenModal}
        onClose={handleToggleModal}
        date={date || ""}
      />

      <Backdrop open={isLoading} sx={{ zIndex: 100 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Calendar;
