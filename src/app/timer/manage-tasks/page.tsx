"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // For navigation, if needed
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Trash2, Save, XCircle } from "lucide-react"; // Icons for edit/delete
import styles from "../../../styles/Timer/TaskManagement.module.css";

interface Task {
  id: number;
  name: string;
  description: string;
}

const ManageTasksPage: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  // Example tasks in local state
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Update Docs", description: "Add usage examples" },
    { id: 2, name: "Fix Login Issue", description: "Check session tokens" },
  ]);

  // For creating a new task
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");

  // For editing an existing task
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // ---------------------------
  //   CREATE
  // ---------------------------
  const handleCreateTask = () => {
    if (!newTaskName.trim()) return;
    const newTask: Task = {
      id: Date.now(), // simplistic approach
      name: newTaskName,
      description: newTaskDesc,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskName("");
    setNewTaskDesc("");
  };

  // ---------------------------
  //   EDIT (start)
  // ---------------------------
  const handleStartEdit = (task: Task) => {
    setEditTaskId(task.id);
    setEditName(task.name);
    setEditDesc(task.description);
  };

  // ---------------------------
  //   EDIT (save)
  // ---------------------------
  const handleSaveEdit = () => {
    if (!editName.trim()) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editTaskId ? { ...t, name: editName, description: editDesc } : t
      )
    );
    cancelEdit(); // reset the edit form
  };

  // ---------------------------
  //   EDIT (cancel)
  // ---------------------------
  const cancelEdit = () => {
    setEditTaskId(null);
    setEditName("");
    setEditDesc("");
  };

  // ---------------------------
  //   DELETE
  // ---------------------------
  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

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

      <Container className={styles.mainContainer}>
        <Typography className={styles.pageTitle}>
          Manage Tasks
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          Hello, {user?.username || "Guest"}! Create or update your tasks below:
        </Typography>

        <div className={styles.glassContainer}>
          {/* CREATE NEW TASK FORM */}
          <div className={styles.taskForm}>
            <TextField
              label="Task Name"
              variant="outlined"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
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
            />
            <TextField
              label="Description"
              variant="outlined"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
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
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#2563eb",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                },
              }}
              onClick={handleCreateTask}
            >
              Add Task
            </Button>
          </div>

          {/* TASK LIST */}
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskItem}>
              {editTaskId === task.id ? (
                /* --- EDIT MODE --- */
                <div className={styles.inlineForm}>
                  <TextField
                    variant="outlined"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    sx={{
                      width: "150px",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
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
                  />
                  <TextField
                    variant="outlined"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    sx={{
                      width: "200px",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
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
                  />
                  <div className={styles.buttonRow}>
                    <IconButton
                      onClick={handleSaveEdit}
                      sx={{ color: "white" }}
                      title="Save"
                    >
                      <Save />
                    </IconButton>
                    <IconButton
                      onClick={cancelEdit}
                      sx={{ color: "white" }}
                      title="Cancel"
                    >
                      <XCircle />
                    </IconButton>
                  </div>
                </div>
              ) : (
                /* --- VIEW MODE --- */
                <>
                  <div style={{ textAlign: "left" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {task.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      {task.description}
                    </Typography>
                  </div>
                  <div>
                    <IconButton
                      onClick={() => handleStartEdit(task)}
                      sx={{ color: "white" }}
                      title="Edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteTask(task.id)}
                      sx={{ color: "white" }}
                      title="Delete"
                    >
                      <Trash2 />
                    </IconButton>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Example: A button to go back home if you want */}
          <Button
            variant="outlined"
            sx={{ marginTop: "1rem", color: "white", borderColor: "white" }}
            onClick={() => router.push("/")} // or your home route
          >
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ManageTasksPage;
