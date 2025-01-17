"use client";

import React, { useEffect, useState } from "react";
import { useUser, useAuth, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Trash2 } from "lucide-react";

import styles from "../../../styles/Timer/TimerHome.module.css";
import AddTaskForm from "./AddTaskForm";
import {
  EditTaskDialog,
  DeleteConfirmationDialog,
} from "./EditAndDeleteDialogs";

/**
 * Data model for each Task
 */
interface Task {
  id: number;
  name: string;
  description?: string;
  category: string;
  mode: "Timer" | "Stopwatch";
  priority: "High" | "Medium" | "Low";
  studyTime?: number; // if mode === "Timer"
}

const ManageTasksPage: React.FC = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // -------------------------------------
  //   TASKS STATE
  // -------------------------------------
  const [tasks, setTasks] = useState<Task[]>([]);

  // get tasks from database
  useEffect(() => {
    if(!userId) return;
    const fetchTasks = async () => {
      try{
        const response = await fetch("/api/timer/fetchUserTasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if(!response.ok){
          throw new Error("Failed to fetch tasks");
        }

        const data: Task[] = (await response.json()) as Task[];
        setTasks(data);

      } catch (error){
        console.error("Error fetching tasks", error);
      }

    }

    fetchTasks().catch((error) => console.error(error));

  }, [userId]); //unsure what to put here


  // -------------------------------------
  //   CREATE NEW TASK
  // -------------------------------------
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [newMode, setNewMode] = useState<"Timer" | "Stopwatch">("Timer");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [newStudyTime, setNewStudyTime] = useState(30);

  const handleCreateTask = async () => {
    console.log("Creating task...", newStudyTime);
    try {
      if (!newName.trim()) return;
      const response = await fetch("/api/timer/addUserTasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          userId: userId,
          taskName: newName,
          taskDescription: newDescription,
          taskCategory: newCategory,
          taskMode: newMode,
          taskPriority: newPriority,
          taskTimeRemaining: newStudyTime || -1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }


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

      // Reset form
      setNewName("");
      setNewDescription("");
      setNewCategory("General");
      setNewMode("Timer");
      setNewPriority("Medium");
      setNewStudyTime(30);


    } catch (error) {
      console.error("Error creating task", error);
    }
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
  const [editPriority, setEditPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [editStudyTime, setEditStudyTime] = useState(30);

  const openEditModal = (task: Task) => {
    setEditTaskId(task.id);
    setEditName(task.name);
    setEditDescription(task.description ?? "");
    setEditCategory(task.category);
    setEditMode(task.mode);
    setEditPriority(task.priority);
    setEditStudyTime(task.studyTime ?? 30);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    // reset
    setEditTaskId(null);
    setEditName("");
    setEditDescription("");
    setEditCategory("General");
    setEditMode("Timer");
    setEditPriority("Medium");
    setEditStudyTime(30);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim() || editTaskId === null) return;


    await fetch("/api/timer/updateUserTasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        id: editTaskId,
        userId: userId,
        taskName: editName,
        taskDescription: editDescription.trim() || undefined,
        taskCategory: editCategory,
        taskMode: editMode,
        taskPriority: editPriority,
        taskTimeRemaining: editStudyTime || -1,
      }),
    });


    setTasks((prev) =>
      prev.map((t) =>
        t.id === editTaskId
          ? {
            ...t,
            name: editName,
            description: editDescription.trim() || undefined,
            category: editCategory,
            mode: editMode,
            priority: editPriority,
            studyTime: editMode === "Timer" ? editStudyTime : undefined,
          }
          : t
      )
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
    setTaskToDelete(null);
    setIsDeleteDialogOpen(false);
  };
  const handleConfirmDelete = async() => {

    await fetch("/api/timer/deleteUserTasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        id: taskToDelete?.id,
      }),
    });


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
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>


      {/* Rotating background */}
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

      <Container className={styles.mainContainer}>
        <Typography style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          color: "white"
        }}>Manage Tasks</Typography>
        <Typography variant="body1" sx={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          Hello, {user?.username}! Create or update your tasks below:
        </Typography>

        <div className={styles.glassContainer}>
          {/* AddTaskForm: for creating tasks */}
          <AddTaskForm
            newName={newName}
            setNewName={setNewName}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            newMode={newMode}
            setNewMode={setNewMode}
            newPriority={newPriority}
            setNewPriority={setNewPriority}
            newStudyTime={newStudyTime}
            setNewStudyTime={setNewStudyTime}
            handleCreateTask={handleCreateTask}
          />

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

          {/* Back to Home */}
          <Button
            variant="outlined"
            sx={{ marginTop: "1rem", color: "white", borderColor: "white" }}
            onClick={() => router.push("/timer")}
          >
            Back to Home
          </Button>
        </div>
      </Container>

      {/* EDIT TASK MODAL */}
      <EditTaskDialog
        open={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleSaveEdit}
        editName={editName}
        setEditName={setEditName}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editCategory={editCategory}
        setEditCategory={setEditCategory}
        editMode={editMode}
        setEditMode={setEditMode}
        editPriority={editPriority}
        setEditPriority={setEditPriority}
        editStudyTime={editStudyTime}
        setEditStudyTime={setEditStudyTime}
      />

      {/* DELETE CONFIRMATION DIALOG */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default ManageTasksPage;
