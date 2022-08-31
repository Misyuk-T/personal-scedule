import { ChangeEvent, useState } from "react";
import { PieChart as MinPieChart } from "react-minimal-pie-chart";
import {
  Box,
  Card,
  Radio,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  RadioGroup,
} from "@mui/material";

import { Schedule } from "types/schedule";
import { toPieChartData } from "helpers/parsers";
import { getLightenColor } from "helpers/colors";
import { chartTitlesStyle } from "helpers/cssConstants";

interface PieChartProps {
  schedules: Schedule[];
}

const PieChart = ({ schedules }: PieChartProps) => {
  const [condition, setCondition] = useState<string>("max");

  const pieChartData = toPieChartData(schedules, condition);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCondition(value);
  };

  return (
    <Card component={Box} p={2}>
      <Stack position="relative">
        <MinPieChart
          data={pieChartData}
          animate
          lineWidth={20}
          paddingAngle={5}
        />
        <Box sx={{ ...chartTitlesStyle }}>
          {pieChartData.map((item, index) => {
            return (
              <Typography
                key={item.title + index}
                fontSize={15}
                whiteSpace="nowrap"
                color={getLightenColor(item.color, -50)}
              >
                {item.title}
              </Typography>
            );
          })}
        </Box>
      </Stack>

      <FormControl component="fieldset" variant="standard">
        <Typography mt={2}>Information about last 30 days:</Typography>
        <FormGroup>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={condition}
            defaultValue="max"
            onChange={handleChange}
          >
            <Stack direction="row">
              <FormControlLabel
                value="min"
                control={<Radio />}
                label="Negative"
              />
              <FormControlLabel
                value="max"
                control={<Radio />}
                label="Positive"
              />
            </Stack>
          </RadioGroup>
        </FormGroup>
      </FormControl>
    </Card>
  );
};

export default PieChart;
