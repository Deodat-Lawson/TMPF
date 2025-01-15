"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DialogContentText,
  PaperProps,
} from "@mui/material";

//
// -----------------------------
// Shared "glassy" PaperProps for both dialogs
// -----------------------------
const dialogPaperStyle: PaperProps = {
  sx: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    color: "white",
  },
};

//
// -----------------------------
// Common style overrides (TextFields, FormControl, etc.)
// -----------------------------
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

//
// -----------------------------
// EditTaskDialog
// -----------------------------
interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;

  editName: string;
  setEditName: (val: string) => void;

  editDescription: string;
  setEditDescription: (val: string) => void;

  editCategory: string;
  setEditCategory: (val: string) => void;

  editMode: "Timer" | "Stopwatch";
  setEditMode: (val: "Timer" | "Stopwatch") => void;

  editPriority: "High" | "Medium" | "Low";
  setEditPriority: (val: "High" | "Medium" | "Low") => void;

  editStudyTime: number;
  setEditStudyTime: (val: number) => void;
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  onClose,
  onSave,
  editName,
  setEditName,
  editDescription,
  setEditDescription,
  editCategory,
  setEditCategory,
  editMode,
  setEditMode,
  editPriority,
  setEditPriority,
  editStudyTime,
  setEditStudyTime,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <Button onClick={onClose} sx={{ color: "white" }}>
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          sx={{ backgroundColor: "white", color: "#2563eb" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

//
// -----------------------------
// DeleteConfirmationDialog
// -----------------------------
interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export const DeleteConfirmationDialog: React.FC<
  DeleteConfirmationDialogProps
> = ({ open, onClose, onConfirmDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <Button onClick={onClose} sx={{ color: "white" }}>
          Cancel
        </Button>
        <Button onClick={onConfirmDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
