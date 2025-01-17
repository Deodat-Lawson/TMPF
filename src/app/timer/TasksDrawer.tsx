"use client";

import React from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import styles from "../../styles/Timer/TimerHome.module.css";

export interface Task {
  id: number;
  name: string;
  description?: string;
  category: string;
  mode: "Timer" | "Stopwatch";
  priority: "High" | "Medium" | "Low";
  timeRemaining?: number; // if mode === "Timer"
}

interface TasksDrawerProps {
  open: boolean;
  tasks: Task[];
  selectedTaskId?: number;
  onClose: () => void;
  onTaskClick: (task: Task) => void;
  // Optionally add a callback to handle "Quick Timer" if needed
  onQuickTimerClick?: () => void;
}

const TasksDrawer: React.FC<TasksDrawerProps> = ({
                                                   open,
                                                   tasks,
                                                   selectedTaskId,
                                                   onClose,
                                                   onTaskClick,
                                                   onQuickTimerClick,
                                                 }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      classes={{ paper: styles.drawerPaper }} // Apply glass styling
    >
      <Typography
        variant="h6"
        sx={{ padding: "1rem", textAlign: "center", color: "white" }}
      >
        Tasks
      </Typography>

      <List>

        {/* 1) "Quick Timer" item at the beginning */}
        <ListItem disablePadding>
          <ListItemButton
            className={styles.taskListItem}
            onClick={() => {
              if (onQuickTimerClick) {
                onQuickTimerClick();
              }
              // Or any inline logic you want for quick timer
            }}
          >
            <ListItemText primary="Quick Timer" />
          </ListItemButton>
        </ListItem>

        {/* 2) Task list items */}
        {tasks.map((task) => {
          const isSelected = task.id === selectedTaskId;
          return (
            <ListItem disablePadding key={task.id}>
              <ListItemButton
                className={`${styles.taskListItem} ${
                  isSelected ? styles.taskListItemSelected : ""
                }`}
                onClick={() => onTaskClick(task)}
              >
                <ListItemText primary={task.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default TasksDrawer;
