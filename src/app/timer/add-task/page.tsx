"use client";

import React, { useState } from "react";
import {
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle,
  Trash2,
} from "lucide-react";
import styles from "../../../styles/Timer/TaskManagement.module.css";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const TaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    priority: "medium" as const,
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({ title: "", dueDate: "", priority: "medium" });
    setShowForm(false);
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className={styles.container}>
      {/* Tasks Display */}
      <div className={styles.tasksDisplay}>
        <div className={styles.tasksHeader}>
          <h2 className={styles.title}>Your Tasks</h2>
          <button
            onClick={() => setShowForm(true)}
            className={styles.btnAddNewTask}
          >
            <Plus size={20} />
            Add New Task
          </button>
        </div>

        <div className={styles.tasksList}>
          {tasks.map((task) => {
            // Dynamically set border color based on priority
            const borderColor =
              task.priority === "high"
                ? "#ef4444"
                : task.priority === "medium"
                  ? "#f59e0b"
                  : "#22c55e";

            return (
              <div
                key={task.id}
                className={styles.taskItem}
                style={{ borderLeft: `4px solid ${borderColor}` }}
              >
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className={styles.checkBtn}
                >
                  <CheckCircle
                    size={24}
                    color={task.completed ? "#22c55e" : "#94a3b8"}
                    fill={task.completed ? "#22c55e" : "none"}
                  />
                </button>

                <div className={styles.taskContent}>
                  <h3
                    className={
                      task.completed
                        ? styles.taskTitleCompleted
                        : styles.taskTitle
                    }
                  >
                    {task.title}
                  </h3>
                  <div className={styles.taskInfo}>
                    <span className={styles.taskInfoItem}>
                      <Calendar size={16} />
                      {task.dueDate}
                    </span>
                    <span className={styles.taskInfoItem}>
                      <AlertCircle size={16} />
                      {task.priority}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className={styles.deleteBtn}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}

          {tasks.length === 0 && (
            <div className={styles.emptyList}>No tasks yet. Add your first task!</div>
          )}
        </div>
      </div>

      {/* Add Task Form Modal */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Add New Task</h2>

            <form onSubmit={handleAddTask}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  required
                  className={styles.formControl}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  required
                  className={styles.formControl}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      priority: e.target.value as "high" | "medium" | "low",
                    })
                  }
                  className={styles.formControl}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className={styles.btnCancel}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.btnSubmit}>
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
