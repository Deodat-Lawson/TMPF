"use client";

import React from "react";
import { Typography } from "@mui/material";
import { Clock } from "lucide-react";
import styles from "../../styles/Timer/TimerHome.module.css";

interface TimerStopwatchDisplayProps {
  timeString: string;
  isTimerMode: boolean;
  isWorkSession: boolean;
}

const TimerStopwatchDisplay: React.FC<TimerStopwatchDisplayProps> = ({
  timeString,
  isTimerMode,
  isWorkSession,
}) => {
  return (
    <>
      {/* Timer/Stopwatch */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Clock size={40} style={{ marginRight: "1rem", marginBottom: "1.5rem"}} />
        <Typography style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          animation: "pulse 2s infinite",
          marginBottom: "2rem",
        }}> {timeString}</Typography>
      </div>

      {/* Work/Break label (only if Timer mode) */}
      {isTimerMode && (
        <Typography
          style={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          {"Timer Mode"}
        </Typography>
      )}
      {!isTimerMode && (
        <Typography
          style={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          {"Stopwatch Mode"}
        </Typography>
      )}
    </>
  );
};

export default TimerStopwatchDisplay;
