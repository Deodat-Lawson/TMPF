"use client";

import React from "react";
import { Button, Typography } from "@mui/material";
import { List as ListIcon } from "lucide-react";
import SettingsMenu from "./Settings";

interface TimerStopwatchHeaderProps {
  username: string;
  selectedTaskName?: string;
  onToggleDrawer: () => void;
  onManageTasks: () => void;
  onShowStatistics: () => void;
}

const TimerStopwatchHeader: React.FC<TimerStopwatchHeaderProps> = ({
  username,
  selectedTaskName,
  onToggleDrawer,
  onManageTasks,
  onShowStatistics,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem",
        alignItems: "center",
      }}
    >
      {/* Greeting */}
      <div>
        <Typography
          variant="h4"
          style={{ color: "white", fontSize: "2rem", margin: 0 }}
        >
          Welcome, {username}
        </Typography>
        {/* If a task is selected, show its name */}
        {selectedTaskName ? (
          <Typography
            style={{
              fontSize: "1.2rem",
              marginTop: "0.5rem",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            Now viewing: <strong>{selectedTaskName}</strong>
          </Typography>
        ) : (
          <Typography
            style={{
              fontSize: "1.2rem",
              marginTop: "0.5rem",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            No task selected
          </Typography>
        )}
      </div>

      {/* Buttons: Tasks + Settings Menu */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button
          variant="outlined"
          style={{ color: "white", borderColor: "white" }}
          onClick={onToggleDrawer}
          startIcon={<ListIcon size={20} />}
        >
          Tasks
        </Button>

        <SettingsMenu
          onManageTasks={onManageTasks}
          onShowStatistics={onShowStatistics}
        />
      </div>
    </div>
  );
};

export default TimerStopwatchHeader;
