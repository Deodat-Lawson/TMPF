"use client";

import React, { useState, useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import styles from "../../styles/Timer/TimerHome.module.css";
import TasksDrawer, { Task } from "./TasksDrawer";
import TimerStopwatchHeader from "./Header";
import TimerStopwatchDisplay from "./TimerStopwatchDisplay";
import TimerStopwatchActions from "./TimerStopwatchActions";
import TimerStopwatchSettings from "./TimerStopwatchSettings";

const TimerAndStopwatchPage: React.FC = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  const router = useRouter();

  // ----------------------------------
  //  TASKS + DRAWER STATE
  // ----------------------------------
  const [tasks, setTasks] = useState<Task[]>([]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleTaskClick = async (task: Task) => {
    setSelectedTask(task);

    // If the task has custom durations/category, override the user's custom settings
    if (task.timeRemaining) {
      setWorkDuration(task.timeRemaining);
      setTime(task.timeRemaining * 60); // reset time to the new workDuration
    }
    if (task.category) {
      setCategory(task.category);
    }
    if (task.mode === "Stopwatch") {
      setIsTimerMode(false);
      await handleSwitchToStopwatch().then(r => console.log("Switched to stopwatch"));
    }
    if(task.mode === "Timer") {
      setIsTimerMode(true);
      await handleSwitchToTimer().then(r => console.log("Switched to timer"));
    }

    setIsDrawerOpen(false);
  };

  // ----------------------------------
  //  GET USER TASKS
  // ----------------------------------
  useEffect(() => {
    if(!userId) return;
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/timer/fetchUserTasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks().catch(console.error);
  }, [userId]);

  // ----------------------------------
  //  TIMER/STOPWATCH STATE
  // ----------------------------------
  // If no task selected, default settings are allowed to be changed by user
  const [isTimerMode, setIsTimerMode] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  const [workDuration, setWorkDuration] = useState(25); // minutes
  const [breakDuration, setBreakDuration] = useState(5); // minutes
  const [time, setTime] = useState(workDuration * 60);

  const [category, setCategory] = useState("Default Category");

  // ----------------------------------
  //  SESSION TIMESTAMPS
  // ----------------------------------
  const [sessionStart, setSessionStart] = useState<Date | null>(null);

  // ----------------------------------
  //  USE EFFECT: TIMER MODE
  // ----------------------------------
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    const runEffect = async () => {
      if (isTimerMode && isActive) {
        interval = setInterval(() => setTime((prev) => prev - 1), 1000);
      }
      if (isTimerMode && time === 0) {
        clearInterval(interval);
        await handleSessionFinish();
        setIsWorkSession((prev) => !prev);
        setTime(isWorkSession ? breakDuration * 60 : workDuration * 60);
        setIsActive(false);
      }
    };
    runEffect().catch(console.error);

    return () => clearInterval(interval);
  }, [isTimerMode, isActive, time, isWorkSession, workDuration, breakDuration]);

  // ----------------------------------
  //  USE EFFECT: STOPWATCH MODE
  // ----------------------------------
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!isTimerMode && isActive) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isTimerMode]);

  // ----------------------------------
  //  Update time if user changes work/break durations
  //  but only if no task is selected (since tasks override).
  // ----------------------------------
  useEffect(() => {
    // Only update if we have no selected task,
    // so user-driven changes can take effect
    if (!selectedTask && isTimerMode) {
      setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
    }
  }, [workDuration, breakDuration, isTimerMode, isWorkSession, selectedTask]);

  // ----------------------------------
  //  Prevent page unload when active
  // ----------------------------------
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isActive) {
        e.preventDefault();
        e.returnValue =
          "You have an active session. Leaving now will lose your current progress.";
        return "You have an active session. Leaving now will lose your current progress.";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isActive]);

  // ----------------------------------
  //  SESSION FINISH LOGIC
  // ----------------------------------
  const handleSessionFinish = async () => {
    if (sessionStart) {
      const endTime = new Date();
      console.log("Session finished!", {
        userId: user?.id ?? "anonymous",
        taskId: selectedTask?.id ?? null,
        category,
        startTime: sessionStart.toISOString(),
        endTime: endTime.toISOString(),
        durationSeconds: Math.round(
          (endTime.getTime() - sessionStart.getTime()) / 1000
        ),
      });
      setSessionStart(null);
    }
  };


  const onQuickTimerClick = async () => {
    if (isActive) {
      await handleSessionFinish();
      setIsActive(false);
    }
    setSelectedTask(null);
    setCategory("Default Category")
    setIsTimerMode(true);
    setTime(25 * 60);
    setWorkDuration(25);
    setBreakDuration(5);
    setIsDrawerOpen(false);
  }



  // ----------------------------------
  //  HANDLERS
  // ----------------------------------
  const handleStartPause = () => {
    if (!isActive && !sessionStart) {
      setSessionStart(new Date());
    }
    setIsActive(!isActive);
  };

  const handleReset = async () => {
    if (isActive) {
      await handleSessionFinish();
    }
    setIsActive(false);
    // Reset time to appropriate value
    if (isTimerMode) {
      setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
    } else {
      setTime(0);
    }
  };

  const handleSwitchToTimer = async () => {
    if (isActive) {
      await handleSessionFinish();
      setIsActive(false);
    }
    setIsTimerMode(true);
    // If a task is selected, stay with its durations
    // Otherwise, go with user custom
    setTime(isWorkSession ? workDuration * 60 : breakDuration * 60);
  };

  const handleSwitchToStopwatch = async () => {
    if (isActive) {
      await handleSessionFinish();
      setIsActive(false);
    }
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
    router.push("/timer/manage-tasks");
  };
  const handleShowStatistics = () => {
    router.push("/timer/statistics");
  };

  // ----------------------------------
  //  RENDER
  // ----------------------------------
  return (
    <div className={styles.pageContainer}>
      {/* Animated background shapes */}
      {[...Array(5).keys()].map((i) => (
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
        onQuickTimerClick={onQuickTimerClick}
      />

      <Container className={styles.mainContainer}>
        <div className={styles.glassContainer}>
          {/* HEADER */}
          <TimerStopwatchHeader
            username={user?.username ?? "Guest"}
            selectedTaskName={selectedTask?.name}
            onToggleDrawer={handleToggleDrawer}
            onManageTasks={handleManageTasks}
            onShowStatistics={handleShowStatistics}
          />

          {/* TIMER/STOPWATCH TOGGLE */}
          {!selectedTask && (
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
          )}

          {/* TIMER/STOPWATCH DISPLAY */}
          <TimerStopwatchDisplay
            timeString={formatTime(time)}
            isTimerMode={isTimerMode}
            isWorkSession={isWorkSession}
          />

          {/* CATEGORY (derived from task or user custom) */}
          <Typography
            style={{
              fontSize: "1.1rem",
              marginBottom: "1rem",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {/* If a task is selected, show its category; otherwise, show custom */}
            Category: {selectedTask ? selectedTask.category ?? category : category}
          </Typography>

          {/* START/PAUSE & RESET BUTTONS */}
          <TimerStopwatchActions
            isActive={isActive}
            onStartPause={handleStartPause}
            onReset={handleReset}
          />

          {/*
            Only show the custom settings panel if NO task is selected.
            If a task is selected, we do not allow user changes.
          */}
          {!selectedTask && (
            <TimerStopwatchSettings
              isTimerMode={isTimerMode}
              workDuration={workDuration}
              breakDuration={breakDuration}
              category={category}
              setWorkDuration={setWorkDuration}
              setBreakDuration={setBreakDuration}
              setCategory={setCategory}
            />
          )}

        </div>
      </Container>
    </div>
  );
};

export default TimerAndStopwatchPage;
