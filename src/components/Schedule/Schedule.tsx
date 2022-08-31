import React, { useEffect, useRef } from "react";
import { Box, Card } from "@mui/material";
import { createChart } from "lightweight-charts";

import { Schedule as ScheduleType } from "types/schedule";
import { toChartsData } from "helpers/parsers";
import { SCHEDULE_DEFAULT_STYLE } from "helpers/scheduleSettings";

interface ScheduleProps {
  schedules: ScheduleType[];
}

const Schedule = ({ schedules }: ScheduleProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartContainerRef.current;

    if (!container) {
      return;
    }

    const chart = createChart(container, {
      ...SCHEDULE_DEFAULT_STYLE,
      height: 300,
      width: container.clientWidth,
    });

    chart.timeScale().fitContent();

    schedules.map((item) => {
      const isBoolType = item.type === "boolean";
      const itemFormattedData = toChartsData(item.data);
      const series = isBoolType
        ? chart.addHistogramSeries({
            color: item.color,
          })
        : chart.addLineSeries({
            color: item.color,
            lineWidth: 2,
          });

      return series.setData(itemFormattedData);
    });

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [schedules]);

  return <Card component={Box} width="100%" ref={chartContainerRef} />;
};

export default Schedule;
