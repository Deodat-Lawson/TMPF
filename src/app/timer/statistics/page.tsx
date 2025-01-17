"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Select, MenuItem, Box } from "@mui/material";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { ChartOptions } from "chart.js";
import { ChartData } from "chart.js";

import styles from "../../../styles/Timer/Statistics.module.css";
import { DateRange, getRangeDates, formatDate, addDays, addWeeks, addMonths } from "./StatsDateUtils";
import StatsPieChart from "./StatsPieChart";
import StatsLineChart from "./StatsLineChart";

/** Initialize Chart.js modules */
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

// Default color overrides
ChartJS.defaults.color = "rgba(255, 255, 255, 0.9)";
ChartJS.defaults.borderColor = "rgba(255, 255, 255, 0.2)";

interface CategoryTime {
  category: string;
  color: string;
  timeSpent: number; // minutes
}

const StatisticsPage: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  const [range, setRange] = useState<DateRange>("DAY");
  const [rangeIndex, setRangeIndex] = useState<number>(0);

  const [categoryData, setCategoryData] = useState<CategoryTime[]>([]);
  const [totalTime, setTotalTime] = useState(0);

  const [lineChartLabels, setLineChartLabels] = useState<string[]>([]);
  const [lineChartData, setLineChartData] = useState<number[]>([]);
  const [rangeString, setRangeString] = useState("");

  // -------------------------------------------
  //   Simulated data fetching
  // -------------------------------------------
  useEffect(() => {
    // compute the date range
    const [startDate, endDate] = getRangeDates(range, rangeIndex);
    const sStr = formatDate(startDate);
    const eStr = formatDate(endDate);
    setRangeString(sStr + (sStr !== eStr ? " - " + eStr : ""));


    // generate random category data
    const sampleCategories = [
      { category: "Work", color: "#4E9AF1" },
      { category: "Hobby", color: "#7DD3FC" },
      { category: "Exercise", color: "#A5B4FC" },
      { category: "Other", color: "#BFDBFE" },
    ];

    const generated = sampleCategories.map((cat) => ({
      ...cat,
      timeSpent: Math.floor(Math.random() * 240),
    }));
    setCategoryData(generated);

    const total = generated.reduce((acc, c) => acc + c.timeSpent, 0);
    setTotalTime(total);

    // line chart intervals
    const intervals = [-2, -1, 0, 1, 2].map((offset) => {
      if (range === "DAY") {
        const d = addDays(startDate, offset);
        return formatDate(d);
      } else if (range === "WEEK") {
        const monday = addWeeks(startDate, offset);
        const sunday = addDays(monday, 6);
        return formatDate(monday) + " - " + formatDate(sunday);
      } else {
        // MONTH
        const first = addMonths(startDate, offset);
        const end = new Date(first.getFullYear(), first.getMonth() + 1, 0);
        return (
          first.toLocaleString("en-US", { month: "short" }) +
          " " +
          first.getFullYear() +
          (first.getMonth() === end.getMonth()
            ? ""
            : ` - ${end.toLocaleString("en-US", { month: "short" })} ${end.getFullYear()}`)
        );
      }
    });
    setLineChartLabels(intervals);

    // random data for line chart
    const lineData = intervals.map(() => Math.floor(Math.random() * 500));
    setLineChartData(lineData);
  }, [range, rangeIndex]);





























  // -------------------------------------------
  //   Chart configs
  // -------------------------------------------
  const pieChartOptions: ChartOptions<'pie'> = {
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
  };

  const lineChartOptions: ChartOptions<"line"> = {
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
  };

  const pieChartData: ChartData<'pie'> = {
    labels: categoryData.map((c) => c.category),
    datasets: [
      {
        label: "Time Spent (min)",
        data: categoryData.map((c) => c.timeSpent),
        backgroundColor: categoryData.map((c) => c.color),
        borderColor: "#ffffff",
        borderWidth: 1.5,
      },
    ],
  };

  const lineChartDataObj: ChartData<"line"> = {
    labels: lineChartLabels,
    datasets: [
      {
        label: "Time Spent (min)",
        data: lineChartData,
        borderColor: "#ffffff",
        backgroundColor: "rgba(173, 216, 230, 0.15)",
        tension: 0.3,
        pointBorderColor: "#fff",
        pointBackgroundColor: "#ffffff",
        fill: true,
      },
    ],
  };

  // -------------------------------------------
  //   Handlers
  // -------------------------------------------
  const handleRangeChange = (newRange: DateRange) => {
    setRange(newRange);
    setRangeIndex(0);
  };

  const handlePrev = () => setRangeIndex((prev) => prev - 1);
  const handleNext = () => setRangeIndex((prev) => prev + 1);








  // -------------------------------------------
  //   Render
  // -------------------------------------------
  return (
    <div className={styles.pageContainer}>
      {
        [...Array(5).keys()].map((i) => (
          <div
            key={i}
            className={styles.rotatingDiv}
            style={{
              animation: `rotate ${20 + i * 5}s linear infinite`,
              top: `${-20 + i * 10}%`,
              left: `${-10 + i * 5}%`,
            }}
          />
        ))
      }

      <Container className={styles.mainContainer}>
        <div className={styles.glassContainer}>
          <Typography variant="h4" sx={{ marginBottom: "1rem", fontSize: "2rem" }}>
            Statistics
          </Typography>
          <Typography sx={{ marginBottom: "2rem" }}>
            Hello, {user?.username || "Guest"}!
          </Typography>

          <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
              onClick={handlePrev}
              startIcon={<ArrowLeft />}
            >
              Prev
            </Button>

            <Select
              value={range}
              onChange={(e) => handleRangeChange(e.target.value as DateRange)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                borderRadius: "8px",
                minWidth: "120px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff",
                },
              }}
            >
              <MenuItem value="DAY">Day</MenuItem>
              <MenuItem value="WEEK">Week</MenuItem>
              <MenuItem value="MONTH">Month</MenuItem>
            </Select>

            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
              onClick={handleNext}
              endIcon={<ArrowRight />}
            >
              Next
            </Button>
          </Box>

          <Typography sx={{ marginBottom: "0.5rem", fontStyle: "italic" }}>
            {rangeString}
          </Typography>
          <Typography sx={{ marginBottom: "2rem", fontSize: "1.2rem" }}>
            Total time spent: <strong>{totalTime} min</strong>
          </Typography>

          <div className={styles.chartsContainer}>
            {/* PIE CHART */}
            <div style={{ maxWidth: "400px", width: "100%" }}>
              <Typography sx={{ marginBottom: "1rem", fontWeight: "bold" }}>
                Time Spent by Category
              </Typography>
              <StatsPieChart data={pieChartData} options={pieChartOptions} />

              <div className={styles.categoryList}>
                {categoryData.map((cat) => (
                  <div key={cat.category}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        backgroundColor: cat.color,
                        marginRight: "8px",
                        borderRadius: "2px",
                      }}
                    />
                    <strong>{cat.category}:</strong> {cat.timeSpent} min
                  </div>
                ))}
              </div>
            </div>

            {/* LINE CHART */}
            <div style={{ maxWidth: "500px", width: "100%" }}>
              <Typography sx={{ marginBottom: "1rem", fontWeight: "bold" }}>
                Total Time (Nearby Intervals)
              </Typography>
              <StatsLineChart data={lineChartDataObj} options={lineChartOptions} />
            </div>
          </div>

          <Button
            variant="outlined"
            sx={{ marginTop: "2rem", color: "white", borderColor: "white" }}
            onClick={() => router.push("/timer")}
          >
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default StatisticsPage;
