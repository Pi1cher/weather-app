import { createTheme, ThemeProvider } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { FC, PropsWithChildren } from "react";

import { IWeather } from "../../interfaces";
import css from "./WeatherChart.module.css";

interface IProps extends PropsWithChildren {
  weatherData: IWeather;
}

const WeatherChart: FC<IProps> = ({ weatherData }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
      fontSize: 14,
      fontWeightRegular: 650,
    },
  });

  return (
    <div className={css.WeatherChart}>
      <ThemeProvider theme={theme}>
        <BarChart
          skipAnimation={true}
          borderRadius={5}
          series={[{ data: weatherData.hourly.temperature_2m.slice(0, 24) }]}
          xAxis={[
            {
              scaleType: "band",
              data: weatherData.hourly.time
                .slice(0, 24)
                .map((time) => time.slice(-5)),
            },
          ]}
          yAxis={[
            {
              colorMap: {
                type: "continuous",
                min: Math.min(
                  ...weatherData.hourly.temperature_2m.slice(0, 24),
                ),
                max: Math.max(
                  ...weatherData.hourly.temperature_2m.slice(0, 24),
                ),
                color: ["#79C5E1", "#78F365"],
              },
            },
          ]}
        />
      </ThemeProvider>
    </div>
  );
};

export { WeatherChart };
