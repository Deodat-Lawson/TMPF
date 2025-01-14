"use client";

import React from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import styles from "../../styles/Timer/TimerHome.module.css";

export interface Task {
  id: number;
  name: string;
}

interface TasksDrawerProps {
  open: boolean;
  tasks: Task[];
  selectedTaskId?: number;
  onClose: () => void;
  onTaskClick: (task: Task) => void;
}

const TasksDrawer: React.FC<TasksDrawerProps> = ({
  open,
  tasks,
  selectedTaskId,
  onClose,
  onTaskClick,
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
        {tasks.map((task) => {
          const isSelected = task.id === selectedTaskId
          return (
            <ListItem
              button
              key={task.id}
              className={`${styles.taskListItem} ${
                isSelected ? styles.taskListItemSelected : ""
              }`}
              onClick={() => onTaskClick(task)}
            >
              <ListItemText primary={task.name} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default TasksDrawer;
