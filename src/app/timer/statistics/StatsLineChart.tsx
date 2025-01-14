"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";

interface StatsLineChartProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
}

const StatsLineChart: React.FC<StatsLineChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default StatsLineChart;
