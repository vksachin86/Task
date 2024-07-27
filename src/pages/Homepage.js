import React, { useState, useEffect, useRef } from 'react';
import TaskList from '../components/TaskList.js';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import './Homepage.css'; // Ensure to create this CSS file for styling

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const taskListRef = useRef(null); // Reference to the task list container

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the task list when tasks are updated
    if (taskListRef.current) {
      taskListRef.current.scrollTop = taskListRef.current.scrollHeight;
    }
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const handleCreate = async () => {
    try {
      await createTask(newTask);
      setSuccess('Task added successfully!');
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedTask = tasks.find((task) => task._id === id);
      await updateTask(id, updatedTask);
      setSuccess('Task updated successfully!');
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setSuccess('Task deleted successfully!');
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="homepage-container">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <div className="form-container">
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button onClick={handleCreate}>Add Task</button>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div ref={taskListRef} className="task-list-container">
          <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  );
};

export default Homepage;
