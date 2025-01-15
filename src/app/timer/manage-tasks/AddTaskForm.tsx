"use client";

import React, { useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";


interface AddTaskFormProps {
  newName: string;
  setNewName: (val: string) => void;
  newDescription: string;
  setNewDescription: (val: string) => void;
  newCategory: string;
  setNewCategory: (val: string) => void;
  newMode: "Timer" | "Stopwatch";
  setNewMode: (val: "Timer" | "Stopwatch") => void;
  newPriority: "High" | "Medium" | "Low";
  setNewPriority: (val: "High" | "Medium" | "Low") => void;
  newStudyTime: number;
  setNewStudyTime: (val: number) => void;
  handleCreateTask: () => void;
}


// Common styles from your theme
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


const AddTaskForm: React.FC<AddTaskFormProps> = ({
                                                   newName,
                                                   setNewName,
                                                   newDescription,
                                                   setNewDescription,
                                                   newCategory,
                                                   setNewCategory,
                                                   newMode,
                                                   setNewMode,
                                                   newPriority,
                                                   setNewPriority,
                                                   newStudyTime,
                                                   setNewStudyTime,
                                                   handleCreateTask,
                                                 }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
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
          onChange={(e) => setNewMode(e.target.value as "Timer" | "Stopwatch")}
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
  );
};

export default AddTaskForm;
