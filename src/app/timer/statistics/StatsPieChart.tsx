"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";

interface StatsPieChartProps {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
}

const StatsPieChart: React.FC<StatsPieChartProps> = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

export default StatsPieChart;
