"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Play, Pause, Clock, List as ListIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface TimerProps {
  workDuration?: number;
  breakDuration?: number;
}

interface Task {
  id: number;
  name: string;
}

const TimerAndStopwatchPage: React.FC = () => {
  // -----------------------
  //  USER & GENERAL STATE
  // -----------------------
  const { user } = useUser();

  // Example tasks
  const [tasks] = useState<Task[]>([
    { id: 1, name: "Finish Chapter 1" },
    { id: 2, name: "Review PR #23" },
    { id: 3, name: "Design Landing Page" },
  ]);

  // Manage Drawer (Side Navigation)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Currently selected task
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // -----------------------
  //   TIMER/STOPWATCH STATE
  // -----------------------
  const [isTimerMode, setIsTimerMode] = useState(true); // true => Timer, false => Stopwatch
  const [category, setCategory] = useState("Default Category");

  // Timer config
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  // Timer/Stopwatch shared state
  const [time, setTime] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  // -----------------------
  //       USEEFFECTS
  // -----------------------
  // Handle Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isTimerMode && isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (isTimerMode && time === 0) {
      clearInterval(interval);
      setIsWorkSession(!isWorkSession);
      setTime(isWorkSession ? breakDuration * 60 : workDuration * 60);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [
    isActive,
    time,
    isWorkSession,
    isTimerMode,
    workDuration,
    breakDuration,
  ]);

  // Handle Stopwatch logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (!isTimerMode && isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isTimerMode]);

  // Whenever user changes the work/break durations, reset time if we’re in Timer mode
  useEffect(() => {
    if (isTimerMode) {
      setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
    }
  }, [workDuration, breakDuration, isTimerMode, isWorkSession]);

  // -----------------------
  //      HANDLERS
  // -----------------------
  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(false);
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    if (isTimerMode) {
      setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
    } else {
      setTime(0);
    }
  };

  // Format time as mm:ss
  const formatTime = (t: number) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // -----------------------
  //     RENDER
  // -----------------------
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #1a365d, #2563eb)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Animation */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "60vw",
            height: "60vw",
            borderRadius: "43%",
            background: "rgba(255, 255, 255, 0.05)",
            animation: `rotate ${20 + i * 5}s linear infinite`,
            top: `${-20 + i * 10}%`,
            left: `${-10 + i * 5}%`,
            transformOrigin: "center center",
          }}
        />
      ))}

      <style>
        {`
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      {/* SIDE DRAWER FOR TASKS */}
      <Drawer open={isDrawerOpen} onClose={handleToggleDrawer}>
        <List style={{ width: "240px" }}>
          <Typography
            variant="h6"
            style={{ padding: "1rem", textAlign: "center" }}
          >
            Tasks
          </Typography>
          {tasks.map((task) => (
            <ListItem button key={task.id} onClick={() => handleTaskClick(task)}>
              <ListItemText primary={task.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* MAIN CONTAINER */}
      <Container
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          color: "white",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            padding: "3rem",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          {/* Top area: Greeting & Drawer toggle */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              style={{
                color: "white",
                fontSize: "2rem",
                margin: 0,
              }}
            >
              Welcome, {user?.username || "Guest"}
            </Typography>
            <Button
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
              onClick={handleToggleDrawer}
              startIcon={<ListIcon size={20} />}
            >
              Tasks
            </Button>
          </div>

          {/* Currently selected task */}
          {selectedTask ? (
            <Typography
              style={{
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Now viewing: <strong>{selectedTask.name}</strong>
            </Typography>
          ) : (
            <Typography
              style={{
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              No task selected
            </Typography>
          )}

          {/* Timer/Stopwatch Toggle */}
          <div style={{ marginBottom: "2rem" }}>
            <Button
              variant={isTimerMode ? "contained" : "outlined"}
              style={{
                marginRight: "1rem",
                backgroundColor: isTimerMode ? "white" : "transparent",
                color: isTimerMode ? "#2563eb" : "white",
              }}
              onClick={() => {
                setIsActive(false);
                setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
                setIsTimerMode(true);
              }}
            >
              Timer
            </Button>
            <Button
              variant={!isTimerMode ? "contained" : "outlined"}
              style={{
                backgroundColor: !isTimerMode ? "white" : "transparent",
                color: !isTimerMode ? "#2563eb" : "white",
              }}
              onClick={() => {
                setIsActive(false);
                setTime(0);
                setIsTimerMode(false);
              }}
            >
              Stopwatch
            </Button>
          </div>

          {/* Timer/Stopwatch Display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Clock size={32} style={{ marginRight: "1rem" }} />
            <Typography
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                animation: "pulse 2s infinite",
              }}
            >
              {formatTime(time)}
            </Typography>
          </div>

          {/* Work/Break Session Label */}
          {isTimerMode && (
            <Typography
              style={{
                fontSize: "1.5rem",
                marginBottom: "2rem",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {isWorkSession ? "Work Session" : "Break Time"}
            </Typography>
          )}

          {/* Category label (applicable for Timer or just as a tag) */}
          <Typography
            style={{
              fontSize: "1.1rem",
              marginBottom: "1rem",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Category: {category}
          </Typography>

          {/* Start/Pause and Reset Buttons */}
          <div style={{ marginBottom: "2rem" }}>
            <Button
              variant="contained"
              onClick={handleStartPause}
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
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.1)";
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

            <Button
              variant="outlined"
              onClick={handleReset}
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

          {/* User Preferences for Timer (if Timer mode is selected) */}
          {isTimerMode && (
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              <TextField
                label="Work (minutes)"
                type="number"
                variant="outlined"
                value={workDuration}
                onChange={(e) => setWorkDuration(parseInt(e.target.value, 10))}
                inputProps={{ min: 1 }}
                sx={{
                  maxWidth: "120px",
                  "& .MuiInputBase-root": {
                    backgroundColor: "white",
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
                  maxWidth: "120px",
                  "& .MuiInputBase-root": {
                    backgroundColor: "white",
                  },
                }}
              />

              <FormControl
                variant="outlined"
                sx={{ minWidth: 150, backgroundColor: "white" }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as string)}
                  label="Category"
                >
                  <MenuItem value="Default Category">Default Category</MenuItem>
                  <MenuItem value="Coding">Coding</MenuItem>
                  <MenuItem value="Reading">Reading</MenuItem>
                  <MenuItem value="Exercise">Exercise</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TimerAndStopwatchPage;
