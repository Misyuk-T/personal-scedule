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
  const updatedSchedules = [...schedules].map((scheduleItem) => {
    return scheduleItem.data?.map((item) => {
      return {
        title: `${scheduleItem.name}: ${toEventTitle(item.value)}`,
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
      instances: [...schedules].map(({ id, description, color }) => {
        return {
          id: id,
          text: description,
          color: color,
        };
      }),
    },
  ];
};

export const toChartsData = (scheduleData: ScheduleData[]) => {
  const formattedData = scheduleData.map(({ startDate, value }) => {
    const isBooleanValue = typeof value === "boolean";
    const formattedBooleanValue = value ? 10 : undefined;
    const formattedRangeValue = +value * 10;
    const timestamp = startDate / 1000;

    return {
      time: timestamp as Time,
      value: isBooleanValue ? formattedBooleanValue : formattedRangeValue,
    };
  });

  return formattedData.sort((a, b) => {
    return compareAsc(+a.time, +b.time);
  });
};

const getPieChartValue = (
  data: ScheduleData[],
  isBooleanType: boolean,
  sortType: string
) => {
  const isSortByMaxValue = sortType === "max";

  const filterCondition = (value: number | boolean) => {
    const rangeValue = isSortByMaxValue ? value > 4 : value <= 4;

    return isBooleanType ? value : rangeValue;
  };

  const filteredArray = data.filter((item) => filterCondition(item.value));

  return filteredArray.length;
};

export const toPieChartData = (schedules: Schedule[], sortType: string) => {
  const typeRangeCondition = sortType === "max" ? "good" : "bad";
  const typeBoolCondition = sortType === "max" ? "used" : "not used";

  return schedules.map(({ name, data, type, color }) => {
    const isBooleanType = type === "boolean";
    const value = getPieChartValue(data, isBooleanType, sortType);
    const rangeScheduleTitle = `${name} was ${typeRangeCondition} - ${value} days`;
    const boolScheduleTitle = `${name} was ${typeBoolCondition} - ${value} days`;

    return {
      title: isBooleanType ? boolScheduleTitle : rangeScheduleTitle,
      value,
      color: color,
    };
  });
};
