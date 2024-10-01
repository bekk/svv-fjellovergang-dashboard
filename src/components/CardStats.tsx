import React, { useEffect, useState } from "react";
import { Typography, Stack, Box } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";

function CardStats() {
  return (
    <Stack direction={"row"} spacing={3}>
      <Box>
        <Gauge
          width={100}
          height={100}
          value={0.923}
          startAngle={-90}
          endAngle={90}
          valueMin={0.0}
          valueMax={1}
          sx={(theme) => ({
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#52b202",
            },
          })}
        />
        <Typography>Precision</Typography>
      </Box>
      <Box>
        <Gauge
          width={100}
          height={100}
          value={0.3}
          startAngle={-90}
          endAngle={90}
          valueMin={0.0}
          valueMax={1}
        />
        <Typography>Recall</Typography>
      </Box>
    </Stack>
  );
}

export default CardStats;
