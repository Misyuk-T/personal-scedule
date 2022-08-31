import { FormikValues } from "formik";
import { compareAsc } from "date-fns";
import _flattenDeep from "lodash.flattendeep";

import { Time } from "lightweight-charts";
import { Schedule, ScheduleData, ScheduleId } from "types/schedule";

export const toEventTitle = (value: number | boolean): string => {
  if (typeof value === "boolean") {
    return value ? "✓" : "✖";
  } else {
    return value + "0%";
  }
};

export const toScheduleData = (
  formValue: FormikValues,
  schedules: Schedule[],
  date: string | Date
): Record<ScheduleId, ScheduleData> => {
  const formValueArray = Object.entries(formValue);
  const parsedObj = {} as Record<ScheduleId, ScheduleData>;
  const formattedDate = new Date(date).getTime();

  formValueArray.forEach(([key, value]) => {
    parsedObj[key] = {
      scheduleId: key,
      startDate: formattedDate,
      endDate: formattedDate + 1000,
      value: value,
    };
  });

  return parsedObj;
};

export const toCalendarData = (schedules: Schedule[]) => {
  const updatedSchedules = [...schedules].map((schedule) => {
    return schedule.data?.map((item) => {
      return {
        title: `${schedule.name}: ${toEventTitle(item.value)}`,
        ...item,
      };
    });
  });

  return _flattenDeep(updatedSchedules).filter((item) => item !== undefined);
};

export const toResourcesScheduleData = (schedules: Schedule[]) => {
  return [
    {
      title:
        "You can add description or change schedule color in edit schedule form",
      fieldName: "scheduleId",
      instances: [...schedules].map((schedule) => {
        return {
          id: schedule.id,
          text: schedule.description,
          color: schedule.color,
        };
      }),
    },
  ];
};

export const toChartsData = (scheduleData: ScheduleData[]) => {
  const formattedData = scheduleData.map(({ startDate, value }) => {
    const isBooleanValue = typeof value === "boolean";
    const formattedBooleanValue = value ? 1 : 0;
    const timestamp = startDate / 1000;

    return {
      time: timestamp as Time,
      value: isBooleanValue ? formattedBooleanValue : value,
    };
  });

  return formattedData.sort((a, b) => {
    return compareAsc(+a.time, +b.time);
  });
};
