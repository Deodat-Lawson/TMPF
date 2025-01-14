"use client";

import React from "react";
import { Button } from "@mui/material";
import { Play, Pause } from "lucide-react";

interface TimerStopwatchActionsProps {
  isActive: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const TimerStopwatchActions: React.FC<TimerStopwatchActionsProps> = ({
  isActive,
  onStartPause,
  onReset,
}) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      {/* Start/Pause */}
      <Button
        variant="contained"
        onClick={onStartPause}
        style={{
          backgroundColor: "white",
          color: "#2563eb",
          padding: "12px 32px",
          fontSize: "1.2rem",
          borderRadius: "12px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginRight: "1rem",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
      >
        {isActive ? (
          <>
            <Pause size={24} /> Pause
          </>
        ) : (
          <>
            <Play size={24} /> Start
          </>
        )}
      </Button>

      {/* Reset */}
      <Button
        variant="outlined"
        onClick={onReset}
        style={{
          color: "white",
          borderColor: "white",
          padding: "12px 32px",
          fontSize: "1.2rem",
          borderRadius: "12px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default TimerStopwatchActions;
