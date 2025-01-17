"use client";

import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
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

interface ResponseData {
  // Match the shape of the JSON you expect
  categoryTotals: { category: string; totalTime: number }[],
  totalTimeAll: number,
}

interface totalTime{
  totalTimeAll: number
}

const StatisticsPage: React.FC = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  const router = useRouter();

  const [range, setRange] = useState<DateRange>("DAY");
  const [rangeIndex, setRangeIndex] = useState<number>(0);

  const [categoryData, setCategoryData] = useState<CategoryTime[]>([]);
  const [totalTime, setTotalTime] = useState<string>('0');

  const [lineChartLabels, setLineChartLabels] = useState<string[]>([]);
  const [lineChartData, setLineChartData] = useState<number[]>([]);
  const [rangeString, setRangeString] = useState("");


  const colorMap: Record<string, string> = {
    "Default Category": "#64748B", // Slate-ish
    Coding: "#8B5CF6",            // Violet
    Reading: "#FCA5A5",           // Light Red
    Exercise: "#A5B4FC",          // Periwinkle
    Hobby: "#7DD3FC",             // Light Blue
    Work: "#4E9AF1",              // Blue
    Other: "#BFDBFE",             // Very Light Blue
  };

  function getColorForCategory(cat: string) {
    // default color if category not found
    return colorMap[cat] ?? "#cccccc";
  }


  // -------------------------------------------
  //   Simulated data fetching
  // -------------------------------------------
  useEffect(() => {
    // compute the date range
    const [startDate, endDate] = getRangeDates(range, rangeIndex);
    const sStr = formatDate(startDate);
    const eStr = formatDate(endDate);
    setRangeString(sStr + (sStr !== eStr ? " - " + eStr : ""));

    async function fetchCategoryData() {
      try {
        const response = await fetch("/api/timer/fetchTimeStamp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            startDate: sStr,
            endDate: eStr,
          }),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: ResponseData = await response.json();

        if (!data) {
          throw new Error("returned data error", data);
        }

        // data is expected to be { categoryTotals: [ { category, totalTime }, ... ], totalTimeAll: number }
        const { categoryTotals, totalTimeAll } = data;

        // Convert that data into your UI shape
        const newCategoryData = categoryTotals.map((c) => ({
          category: c.category,
          color: getColorForCategory(c.category),
          timeSpent: parseFloat((c.totalTime / 60).toFixed(2)),
        }));

        setCategoryData(newCategoryData);
        setTotalTime((totalTimeAll/60).toFixed(2));
      } catch (err) {
        console.error("Failed to fetch category data:", err);
        // Optionally handle error UI here
        setCategoryData([]);
        setTotalTime('0');
      }
    }

    fetchCategoryData().catch((err) => {console.error(err)});
    fetchLineChartData(startDate).catch((err) => {console.error(err)});
  }, [range, rangeIndex]);





  const fetchLineChartData = async (startDate : Date) => {

    // line chart intervals
    const offsets = [-2, -1, 0, 1, 2];
    const intervals = offsets.map((offset) => {
      if (range === "DAY") {
        const d = addDays(startDate, offset);
        return formatDate(d);
      } else if (range === "WEEK") {
        const monday = addWeeks(startDate, offset);
        const sunday = addDays(monday, 6);
        return formatDate(monday) + " - " + formatDate(sunday);
      } else {
        // range === "MONTH"
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

    const lineDataPromises = offsets.map(async (offset) => {
      let start: Date;
      let end: Date;

      if (range === "DAY") {
        // For a single day, both start and end can be the same day
        start = addDays(startDate, offset);
        end = addDays(startDate, offset);
      } else if (range === "WEEK") {
        start = addWeeks(startDate, offset);      // Monday
        end = addDays(start, 6);                 // Sunday
      } else {
        // MONTH
        start = addMonths(startDate, offset);
        end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      }

      const sStr = formatDate(start);
      const eStr = formatDate(end);

      const body = {
        userId,
        startDate: sStr,
        endDate: eStr,
      };

      try {
        const response = await fetch("/api/timer/fetchTotalTimeStamp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data : totalTime = await response.json();
        // console.log(data)

        if (!data) {
          throw new Error("returned data error", data);
        }

        const { totalTimeAll } = data;

        return (totalTimeAll/60).toFixed(2);

      } catch (err) {
        console.error("Failed to line chart data:", err);
        // Optionally handle error UI here
        return 0;
      }
  });

    const lineData = await Promise.all(lineDataPromises);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setLineChartData(lineData);
  };



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
            Hello, {user?.username ?? "Guest"}!
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
