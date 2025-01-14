"use client";

import React, { useState, useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import styles from "../../styles/Timer/TimerHome.module.css";
import TasksDrawer, { Task } from "./TasksDrawer";
import TimerStopwatchHeader from "./Header";
import TimerStopwatchDisplay from "./TimerStopwatchDisplay";
import TimerStopwatchActions from "./TimerStopwatchActions";
import TimerStopwatchSettings from "./TimerStopwatchSettings";

const TimerAndStopwatchPage: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  // ----------------------------------
  //  TASKS + DRAWER STATE
  // ----------------------------------
  const [tasks] = useState<Task[]>([
    { id: 1, name: "Finish Chapter 1" },
    { id: 2, name: "Review PR #23" },
    { id: 3, name: "Design Landing Page" },
  ]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(false);
  };

  // ----------------------------------
  //  TIMER/STOPWATCH STATE
  // ----------------------------------
  const [isTimerMode, setIsTimerMode] = useState(true); // true => Timer, false => Stopwatch
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [time, setTime] = useState(workDuration * 60);

  const [category, setCategory] = useState("Default Category");

  // ----------------------------------
  //  USE EFFECT: TIMER
  // ----------------------------------
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerMode && isActive) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    }
    if (isTimerMode && time === 0) {
      clearInterval(interval);
      setIsWorkSession(!isWorkSession);
      setTime(isWorkSession ? breakDuration * 60 : workDuration * 60);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerMode, isActive, time, isWorkSession, workDuration, breakDuration]);

  // ----------------------------------
  //  USE EFFECT: STOPWATCH
  // ----------------------------------
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!isTimerMode && isActive) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isTimerMode]);

  // ----------------------------------
  //  Update time on input changes
  // ----------------------------------
  useEffect(() => {
    if (isTimerMode) {
      setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
    }
  }, [workDuration, breakDuration, isTimerMode, isWorkSession]);

  // ----------------------------------
  //  HANDLERS
  // ----------------------------------
  const handleStartPause = () => setIsActive(!isActive);

  const handleReset = () => {
    setIsActive(false);
    if (isTimerMode) {
      setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
    } else {
      setTime(0);
    }
  };

  const handleSwitchToTimer = () => {
    setIsActive(false);
    setIsTimerMode(true);
    setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
  };

  const handleSwitchToStopwatch = () => {
    setIsActive(false);
    setIsTimerMode(false);
    setTime(0);
  };

  const formatTime = (t: number) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // ----------------------------------
  //  SETTINGS MENU NAV
  // ----------------------------------
  const handleManageTasks = () => {
    router.push("/timer/manage-tasks"); // or your actual path
  };
  const handleShowStatistics = () => {
    router.push("/timer/statistics"); // or your actual path
  };

  // ----------------------------------
  //  RENDER
  // ----------------------------------
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

      {/* Drawer for Tasks */}
      <TasksDrawer
        open={isDrawerOpen}
        tasks={tasks}
        selectedTaskId={selectedTask?.id}
        onClose={handleToggleDrawer}
        onTaskClick={handleTaskClick}
      />

      <Container className={styles.mainContainer}>
        <div className={styles.glassContainer}>
          {/* HEADER */}
          <TimerStopwatchHeader
            username={user?.username || "Guest"}
            selectedTaskName={selectedTask?.name}
            onToggleDrawer={handleToggleDrawer}
            onManageTasks={handleManageTasks}
            onShowStatistics={handleShowStatistics}
          />

          {/* TIMER/STOPWATCH TOGGLE */}
          <div style={{ marginBottom: "2rem" }}>
            <Button
              variant={isTimerMode ? "contained" : "outlined"}
              style={{
                marginRight: "1rem",
                backgroundColor: isTimerMode ? "white" : "transparent",
                color: isTimerMode ? "#2563eb" : "white",
              }}
              onClick={handleSwitchToTimer}
            >
              Timer
            </Button>
            <Button
              variant={!isTimerMode ? "contained" : "outlined"}
              style={{
                backgroundColor: !isTimerMode ? "white" : "transparent",
                color: !isTimerMode ? "#2563eb" : "white",
              }}
              onClick={handleSwitchToStopwatch}
            >
              Stopwatch
            </Button>
          </div>

          {/* TIMER/STOPWATCH DISPLAY */}
          <TimerStopwatchDisplay
            timeString={formatTime(time)}
            isTimerMode={isTimerMode}
            isWorkSession={isWorkSession}
          />

          {/* CATEGORY (just a label) */}
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
          <TimerStopwatchActions
            isActive={isActive}
            onStartPause={handleStartPause}
            onReset={handleReset}
          />

          {/* SETTINGS PANEL (Work/Break + Category) */}
          <TimerStopwatchSettings
            isTimerMode={isTimerMode}
            workDuration={workDuration}
            breakDuration={breakDuration}
            category={category}
            setWorkDuration={(val) => setWorkDuration(val)}
            setBreakDuration={(val) => setBreakDuration(val)}
            setCategory={(val) => setCategory(val)}
          />
        </div>
      </Container>
    </div>
  );
};

export default TimerAndStopwatchPage;
