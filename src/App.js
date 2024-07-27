// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';  // Import the CSS file

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
    };

    const addTask = async () => {
        await axios.post('http://localhost:5000/api/tasks', { name: newTask });
        fetchTasks();
        setNewTask('');
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter new task"
                />
                <button type="submit">Add Task</button>
            </form>
            <div className="task-list">
                {tasks.map((task) => (
                    <div className="task" key={task._id}>
                        <p>{task.name}</p>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
