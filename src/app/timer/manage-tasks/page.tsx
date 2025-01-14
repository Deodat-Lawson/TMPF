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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  PaperProps,
} from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import styles from "../../../styles/Timer/TaskManagement.module.css";

/**
 * Each Task has:
 * - id
 * - name (required)
 * - description (optional)
 * - category (string)
 * - mode ("Timer" | "Stopwatch")
 * - priority ("High" | "Medium" | "Low")
 * - studyTime (number, only relevant if mode === 'Timer')
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

/** Common style overrides for MUI TextFields to match glassy theme. */
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

/** Common style overrides for MUI FormControl+Select. */
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

/** Style for the Dialog's 'paper' to create a glassy backdrop. */
const dialogPaperStyle: PaperProps = {
  sx: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    color: "white",
  },
};

const ManageTasksPage: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  // -------------------------------------
  //   TASKS STATE
  // -------------------------------------
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Review Project Requirements",
      description: "Check if all acceptance criteria are met.",
      category: "Work",
      mode: "Timer",
      priority: "High",
      studyTime: 60,
    },
    {
      id: 2,
      name: "Practice Guitar",
      category: "Hobby",
      mode: "Stopwatch",
      priority: "Medium",
    },
  ]);

  // -------------------------------------
  //   CREATE NEW TASK
  // -------------------------------------
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [newMode, setNewMode] = useState<"Timer" | "Stopwatch">("Timer");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">(
    "Medium"
  );
  const [newStudyTime, setNewStudyTime] = useState<number>(30);

  const handleCreateTask = () => {
    if (!newName.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      name: newName,
      description: newDescription.trim() || undefined,
      category: newCategory,
      mode: newMode,
      priority: newPriority,
      ...(newMode === "Timer" && { studyTime: newStudyTime }),
    };
    setTasks((prev) => [...prev, newTask]);

    // Reset the form
    setNewName("");
    setNewDescription("");
    setNewCategory("General");
    setNewMode("Timer");
    setNewPriority("Medium");
    setNewStudyTime(30);
  };

  // -------------------------------------
  //   EDIT TASK (MODAL)
  // -------------------------------------
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("General");
  const [editMode, setEditMode] = useState<"Timer" | "Stopwatch">("Timer");
  const [editPriority, setEditPriority] = useState<"High" | "Medium" | "Low">(
    "Medium"
  );
  const [editStudyTime, setEditStudyTime] = useState<number>(30);

  const openEditModal = (task: Task) => {
    setEditTaskId(task.id);
    setEditName(task.name);
    setEditDescription(task.description || "");
    setEditCategory(task.category);
    setEditMode(task.mode);
    setEditPriority(task.priority);
    setEditStudyTime(task.studyTime || 30);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    // Reset edit fields
    setEditTaskId(null);
    setEditName("");
    setEditDescription("");
    setEditCategory("General");
    setEditMode("Timer");
    setEditPriority("Medium");
    setEditStudyTime(30);
  };

  const handleSaveEdit = () => {
    if (!editName.trim() || editTaskId === null) return;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== editTaskId) return t;
        return {
          ...t,
          name: editName,
          description: editDescription.trim() || undefined,
          category: editCategory,
          mode: editMode,
          priority: editPriority,
          studyTime: editMode === "Timer" ? editStudyTime : undefined,
        };
      })
    );
    closeEditModal();
  };

  // -------------------------------------
  //   DELETE TASK (CONFIRMATION)
  // -------------------------------------
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const openDeleteDialog = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    }
    closeDeleteDialog();
  };

  // -------------------------------------
  //   RENDER
  // -------------------------------------
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
            <TextField
              label="Name"
              variant="outlined"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={textFieldStyle}
            />
            <TextField
              label="Description (Optional)"
              variant="outlined"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              sx={textFieldStyle}
            />
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
                "&:hover": { backgroundColor: "#f2f2f2" },
              }}
              onClick={handleCreateTask}
            >
              Add Task
            </Button>
          </div>

          {/* TASK LIST */}
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskItem}>
              <div style={{ textAlign: "left", marginRight: "1rem" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white" }}>
                  {task.name}
                </Typography>
                {task.description && (
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {task.description}
                  </Typography>
                )}
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
                  onClick={() => openEditModal(task)}
                  sx={{ color: "white" }}
                  title="Edit"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => openDeleteDialog(task)}
                  sx={{ color: "white" }}
                  title="Delete"
                >
                  <Trash2 />
                </IconButton>
              </div>
            </div>
          ))}

          {/* Back to Home button */}
          <Button
            variant="outlined"
            sx={{ marginTop: "1rem", color: "white", borderColor: "white" }}
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </Container>

      {/* EDIT TASK MODAL - Glass-themed */}
      <Dialog
        open={isEditModalOpen}
        onClose={closeEditModal}
        maxWidth="sm"
        fullWidth
        PaperProps={dialogPaperStyle}
      >
        <DialogTitle
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
          }}
        >
          Edit Task
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ ...textFieldStyle, marginBottom: "1rem" }}
          />
          <TextField
            label="Description (Optional)"
            variant="outlined"
            fullWidth
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            sx={{ ...textFieldStyle, marginBottom: "1rem" }}
          />
          <FormControl
            variant="outlined"
            sx={{ ...formControlStyle, marginBottom: "1rem" }}
            fullWidth
          >
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
          <FormControl
            variant="outlined"
            sx={{ ...formControlStyle, marginBottom: "1rem" }}
            fullWidth
          >
            <InputLabel>Mode</InputLabel>
            <Select
              value={editMode}
              onChange={(e) => setEditMode(e.target.value as "Timer" | "Stopwatch")}
              label="Mode"
              style={{ backgroundColor: "transparent" }}
            >
              <MenuItem value="Timer">Timer</MenuItem>
              <MenuItem value="Stopwatch">Stopwatch</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            sx={{ ...formControlStyle, marginBottom: "1rem" }}
            fullWidth
          >
            <InputLabel>Priority</InputLabel>
            <Select
              value={editPriority}
              onChange={(e) =>
                setEditPriority(e.target.value as "High" | "Medium" | "Low")
              }
              label="Priority"
              style={{ backgroundColor: "transparent" }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          {editMode === "Timer" && (
            <TextField
              label="Study Time (minutes)"
              type="number"
              variant="outlined"
              fullWidth
              value={editStudyTime}
              onChange={(e) => setEditStudyTime(parseInt(e.target.value, 10))}
              inputProps={{ min: 1 }}
              sx={textFieldStyle}
            />
          )}
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Button onClick={closeEditModal} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            sx={{ backgroundColor: "white", color: "#2563eb" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={dialogPaperStyle}
      >
        <DialogTitle
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          <DialogContentText sx={{ color: "white" }}>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Button onClick={closeDeleteDialog} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageTasksPage;
