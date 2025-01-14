"use client";


import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Trash2, Save, XCircle } from "lucide-react";
import styles from "../../../styles/Timer/TaskManagement.module.css";
/**
 * Each Task has:
 * - id
 * - name (required)
 * - description (optional)
 * - category
 * - mode (Timer or Stopwatch)
 * - priority (High, Medium, Low)
 * - studyTime (only relevant if mode === 'Timer')
 */
interface Task {
  id: number;
  name: string;
  description?: string;
  category: string;
  mode: "Timer" | "Stopwatch";
  priority: "High" | "Medium" | "Low";
  studyTime?: number;
}

const ManageTasksPage: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  // Sample tasks in local state
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Review Project Requirements",
      description: "Check if all acceptance criteria are met.",
      category: "Work",
      mode: "Timer",
      priority: "High",
      studyTime: 60, // minutes
    },
    {
      id: 2,
      name: "Practice Guitar",
      category: "Hobby",
      mode: "Stopwatch",
      priority: "Medium",
    },
  ]);

  // For creating a new task
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [newMode, setNewMode] = useState<"Timer" | "Stopwatch">("Timer");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">(
    "Medium"
  );
  const [newStudyTime, setNewStudyTime] = useState<number>(30);

  // For editing an existing task
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("General");
  const [editMode, setEditMode] = useState<"Timer" | "Stopwatch">("Timer");
  const [editPriority, setEditPriority] = useState<"High" | "Medium" | "Low">(
    "Medium"
  );
  const [editStudyTime, setEditStudyTime] = useState<number>(30);

  // ---------------------------
  //   CREATE
  // ---------------------------
  const handleCreateTask = () => {
    if (!newName.trim()) return;

    const newTask: Task = {
      id: Date.now(), // simplistic ID
      name: newName,
      description: newDescription.trim() ? newDescription : undefined,
      category: newCategory,
      mode: newMode,
      priority: newPriority,
      // Only set studyTime if mode === 'Timer'
      ...(newMode === "Timer" && { studyTime: newStudyTime }),
    };
    setTasks((prev) => [...prev, newTask]);

    // Reset form
    setNewName("");
    setNewDescription("");
    setNewCategory("General");
    setNewMode("Timer");
    setNewPriority("Medium");
    setNewStudyTime(30);
  };

  // ---------------------------
  //   START EDIT
  // ---------------------------
  const handleStartEdit = (task: Task) => {
    setEditTaskId(task.id);
    setEditName(task.name);
    setEditDescription(task.description || "");
    setEditCategory(task.category);
    setEditMode(task.mode);
    setEditPriority(task.priority);
    setEditStudyTime(task.studyTime || 30);
  };

  // ---------------------------
  //   SAVE EDIT
  // ---------------------------
  const handleSaveEdit = () => {
    if (!editName.trim() || editTaskId === null) return;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== editTaskId) return t;
        return {
          ...t,
          name: editName,
          description: editDescription.trim() ? editDescription : undefined,
          category: editCategory,
          mode: editMode,
          priority: editPriority,
          studyTime: editMode === "Timer" ? editStudyTime : undefined,
        };
      })
    );
    cancelEdit();
  };

  // ---------------------------
  //   CANCEL EDIT
  // ---------------------------
  const cancelEdit = () => {
    setEditTaskId(null);
    setEditName("");
    setEditDescription("");
    setEditCategory("General");
    setEditMode("Timer");
    setEditPriority("Medium");
    setEditStudyTime(30);
  };

  // ---------------------------
  //   DELETE
  // ---------------------------
  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={styles.pageContainer}>
      {/* Animated background */}
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
        <Typography className={styles.pageTitle}>Manage Tasks</Typography>
        <Typography variant="body1" sx={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          Hello, {user?.username || "Guest"}! Create or update your tasks below:
        </Typography>

        <div className={styles.glassContainer}>
          {/* CREATE NEW TASK FORM */}
          <div className={styles.taskForm}>
            {/* Name */}
            <TextField
              label="Name"
              variant="outlined"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={textFieldStyle}
            />

            {/* Description (optional) */}
            <TextField
              label="Description (Optional)"
              variant="outlined"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              sx={textFieldStyle}
            />

            {/* Category */}
            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as string)}
                label="Category"
                style={{ backgroundColor: "transparent" }}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Hobby">Hobby</MenuItem>
                <MenuItem value="Exercise">Exercise</MenuItem>
              </Select>
            </FormControl>

            {/* Mode */}
            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>Mode</InputLabel>
              <Select
                value={newMode}
                onChange={(e) =>
                  setNewMode(e.target.value as "Timer" | "Stopwatch")
                }
                label="Mode"
                style={{ backgroundColor: "transparent" }}
              >
                <MenuItem value="Timer">Timer</MenuItem>
                <MenuItem value="Stopwatch">Stopwatch</MenuItem>
              </Select>
            </FormControl>

            {/* Priority */}
            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newPriority}
                onChange={(e) =>
                  setNewPriority(e.target.value as "High" | "Medium" | "Low")
                }
                label="Priority"
                style={{ backgroundColor: "transparent" }}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>

            {/* Study Time (only if mode === 'Timer') */}
            {newMode === "Timer" && (
              <TextField
                label="Study Time (minutes)"
                type="number"
                variant="outlined"
                value={newStudyTime}
                onChange={(e) => setNewStudyTime(parseInt(e.target.value, 10))}
                inputProps={{ min: 1 }}
                sx={textFieldStyle}
              />
            )}

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
          {tasks.map((task) => {
            const isEditing = editTaskId === task.id;
            return (
              <div key={task.id} className={styles.taskItem}>
                {isEditing ? (
                  /* -------------------- */
                  /*    EDITING  MODE    */
                  /* -------------------- */
                  <div className={styles.inlineForm}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      sx={{ ...textFieldStyle, marginBottom: "0.5rem" }}
                    />
                    <TextField
                      label="Description (Optional)"
                      variant="outlined"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      sx={{ ...textFieldStyle, marginBottom: "0.5rem" }}
                    />
                    {/* Category */}
                    <FormControl variant="outlined" sx={{ ...formControlStyle, marginBottom: "0.5rem" }}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as string)}
                        label="Category"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <MenuItem value="General">General</MenuItem>
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Hobby">Hobby</MenuItem>
                        <MenuItem value="Exercise">Exercise</MenuItem>
                      </Select>
                    </FormControl>
                    {/* Mode */}
                    <FormControl variant="outlined" sx={{ ...formControlStyle, marginBottom: "0.5rem" }}>
                      <InputLabel>Mode</InputLabel>
                      <Select
                        value={editMode}
                        onChange={(e) =>
                          setEditMode(e.target.value as "Timer" | "Stopwatch")
                        }
                        label="Mode"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <MenuItem value="Timer">Timer</MenuItem>
                        <MenuItem value="Stopwatch">Stopwatch</MenuItem>
                      </Select>
                    </FormControl>
                    {/* Priority */}
                    <FormControl variant="outlined" sx={{ ...formControlStyle, marginBottom: "0.5rem" }}>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={editPriority}
                        onChange={(e) =>
                          setEditPriority(
                            e.target.value as "High" | "Medium" | "Low"
                          )
                        }
                        label="Priority"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>
                    {/* Study Time if Timer */}
                    {editMode === "Timer" && (
                      <TextField
                        label="Study Time (minutes)"
                        type="number"
                        variant="outlined"
                        value={editStudyTime}
                        onChange={(e) => setEditStudyTime(parseInt(e.target.value, 10))}
                        inputProps={{ min: 1 }}
                        sx={{ ...textFieldStyle, marginBottom: "0.5rem" }}
                      />
                    )}
                    <div className={styles.buttonRow}>
                      <IconButton onClick={handleSaveEdit} sx={{ color: "white" }} title="Save">
                        <Save />
                      </IconButton>
                      <IconButton onClick={cancelEdit} sx={{ color: "white" }} title="Cancel">
                        <XCircle />
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  /* -------------------- */
                  /*     VIEW  MODE      */
                  /* -------------------- */
                  <>
                    <div style={{ textAlign: "left", marginRight: "1rem" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                        {task.name}
                      </Typography>
                      {/* Optional description */}
                      {task.description && (
                        <Typography variant="body2" sx={{ color: "white" }}>
                          {task.description}
                        </Typography>
                      )}
                      {/* Category, Mode, Priority, StudyTime */}
                      <Typography variant="body2" sx={{ color: "white" }}>
                        Category: {task.category}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        Mode: {task.mode}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        Priority: {task.priority}
                      </Typography>
                      {task.mode === "Timer" && task.studyTime && (
                        <Typography variant="body2" sx={{ color: "white" }}>
                          Study Time: {task.studyTime} minutes
                        </Typography>
                      )}
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
            );
          })}

          {/* Back to Home Button */}
          <Button
            variant="outlined"
            sx={{ marginTop: "1rem", color: "white", borderColor: "white" }}
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
};

/** Common style overrides for MUI TextField to match the glass theme. */
const textFieldStyle = {
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
};

/** Common style overrides for MUI FormControl + Select. */
const formControlStyle = {
  minWidth: 150,
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
};

export default ManageTasksPage;