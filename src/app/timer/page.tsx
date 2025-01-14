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
  Menu,
  IconButton,
} from "@mui/material";
import { Play, Pause, Clock, List as ListIcon, Settings } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


// Import the CSS module
import styles from "../../styles/Timer/TimerHome.module.css";
interface Task {
  id: number;
  name: string;
}

const TimerAndStopwatchPage: React.FC = () => {
  // -----------------------
  //  USER & GENERAL STATE
  // -----------------------
  const { user } = useUser();
  const router = useRouter();

  // Example tasks
  const [tasks] = useState<Task[]>([
    { id: 1, name: "Finish Chapter 1" },
    { id: 2, name: "Review PR #23" },
    { id: 3, name: "Design Landing Page" },
  ]);

  // Manage Drawer (Side Navigation)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // For controlling the Settings menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Currently selected task
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // -----------------------
  //   TIMER/STOPWATCH STATE
  // -----------------------
  const [isTimerMode, setIsTimerMode] = useState(true); // true => Timer, false => Stopwatch
  const [category, setCategory] = useState("Default Category");

  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

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
  }, [isTimerMode, isActive, time, isWorkSession, breakDuration, workDuration]);

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

  // Update time whenever user changes durations (Timer mode)
  useEffect(() => {
    if (isTimerMode) {
      setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
    }
  }, [workDuration, breakDuration, isTimerMode, isWorkSession]);

  // -----------------------
  //      HANDLERS
  // -----------------------
  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(false);
  };

  // Start/Pause
  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  // Reset
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

  // Settings menu
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Navigate to other pages
  const goToManageTasks = () => {
    handleCloseMenu();
    router.push("/manage-tasks");
  };
  const goToStatistics = () => {
    handleCloseMenu();
    router.push("/statistics");
  };

  const isTaskSelected = (task: Task) => task.id === selectedTask?.id;

  // -----------------------
  //     RENDER
  // -----------------------
  return (
    <div className={styles.pageContainer}>
      {/* Animated background shapes */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={styles.rotatingDiv}
          style={{
            animation: `rotate ${20 + i * 5}s linear infinite`,
            top: `${-20 + i * 10}%`,
            left: `${-10 + i * 5}%`,
          }}
        />
      ))}

      {/* SIDE DRAWER FOR TASKS */}
      <Drawer
        open={isDrawerOpen}
        onClose={handleToggleDrawer}
        classes={{ paper: styles.drawerPaper }}
      >
        <Typography
          variant="h6"
          sx={{ padding: "1rem", textAlign: "center", color: "white" }}
        >
          Tasks
        </Typography>
        <List>
          {tasks.map((task) => (
            <ListItem
              button
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={`
                ${styles.taskListItem} 
                ${isTaskSelected(task) ? styles.taskListItemSelected : ""}
              `}
            >
              <ListItemText primary={task.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* MAIN CONTAINER */}
      <Container className={styles.mainContainer}>
        <div className={styles.glassContainer}>
          {/* Top area: Greeting & Buttons */}
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

            <div style={{ display: "flex", gap: "1rem" }}>
              {/* Tasks Button */}
              <Button
                variant="outlined"
                style={{ color: "white", borderColor: "white" }}
                onClick={handleToggleDrawer}
                startIcon={<ListIcon size={20} />}
              >
                Tasks
              </Button>

              {/* Settings Icon Button -> triggers a Menu */}
              <IconButton
                onClick={handleOpenMenu}
                style={{ color: "white" }}
              >
                <Settings />
              </IconButton>

              {/* The Menu itself */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={goToManageTasks}>Manage Tasks</MenuItem>
                <MenuItem onClick={goToStatistics}>Show Statistics</MenuItem>
              </Menu>
            </div>
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
                setTime(
                  isWorkSession ? workDuration * 60 : breakDuration * 60
                );
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
            }}
          >
            <Clock size={32} style={{ marginRight: "1rem" }} />
            <Typography className={styles.pulse}>{formatTime(time)}</Typography>
          </div>

          {/* Work/Break Label (only if Timer mode) */}
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

          {/* Category */}
          <Typography
            style={{
              fontSize: "1.1rem",
              marginBottom: "1rem",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Category: {category}
          </Typography>

          {/* START/PAUSE & RESET BUTTONS */}
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

          {/* Settings Panel: Work/Break + Category */}
          <div className={styles.settingsPanel}>
            {isTimerMode && (
              <>
                <TextField
                  label="Work (minutes)"
                  type="number"
                  variant="outlined"
                  value={workDuration}
                  onChange={(e) =>
                    setWorkDuration(parseInt(e.target.value, 10))
                  }
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
                  onChange={(e) =>
                    setBreakDuration(parseInt(e.target.value, 10))
                  }
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
                onChange={(e) => setCategory(e.target.value as string)}
                label="Category"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <MenuItem value="Default Category">Default Category</MenuItem>
                <MenuItem value="Coding">Coding</MenuItem>
                <MenuItem value="Reading">Reading</MenuItem>
                <MenuItem value="Exercise">Exercise</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TimerAndStopwatchPage;