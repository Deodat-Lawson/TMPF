"use client";

import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "../../styles/Timer/TimerHome.module.css";

interface TimerStopwatchSettingsProps {
  isTimerMode: boolean;
  workDuration: number;
  breakDuration: number;
  category: string;
  setWorkDuration: (val: number) => void;
  setBreakDuration: (val: number) => void;
  setCategory: (val: string) => void;
}

const TimerStopwatchSettings: React.FC<TimerStopwatchSettingsProps> = ({
  isTimerMode,
  workDuration,
  breakDuration,
  category,
  setWorkDuration,
  setBreakDuration,
  setCategory,
}) => {
  return (
    <div className={styles.settingsPanel}>
      {isTimerMode && (
        <>
          <TextField
            label="Work (minutes)"
            type="number"
            variant="outlined"
            value={workDuration}
            onChange={(e) => setWorkDuration(parseInt(e.target.value, 10))}
            inputProps={{ min: 1 }}
            sx={{
              maxWidth: "130px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ffffff",
              },
              input: {
                color: "white",
              },
            }}
          />

          <TextField
            label="Break (minutes)"
            type="number"
            variant="outlined"
            value={breakDuration}
            onChange={(e) => setBreakDuration(parseInt(e.target.value, 10))}
            inputProps={{ min: 1 }}
            sx={{
              maxWidth: "130px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ffffff",
              },
              input: {
                color: "white",
              },
            }}
          />
        </>
      )}

      {/* Category (visible for both Timer and Stopwatch) */}
      <FormControl
        variant="outlined"
        sx={{
          minWidth: 150,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            color: "white",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.4)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.7)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#ffffff",
          },
        }}
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
          style={{ backgroundColor: "transparent" }}
        >
          <MenuItem value="Default Category">Default Category</MenuItem>
          <MenuItem value="Coding">Coding</MenuItem>
          <MenuItem value="Reading">Reading</MenuItem>
          <MenuItem value="Exercise">Exercise</MenuItem>
          <MenuItem value="Hobby">Hobby</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TimerStopwatchSettings;
