import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm.jsx';
import TaskColumn from './components/TaskColumn.jsx';
import Footer from './components/Footer.jsx';

import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleDelete = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <div className="app">
            <TaskForm setTasks={setTasks} />
            <main className="app_main">
                <TaskColumn title="To Do"  tasks={tasks} status="todo" handleDelete={handleDelete} updateTaskStatus={updateTaskStatus} />
                <TaskColumn title="Doing"  tasks={tasks} status="doing" handleDelete={handleDelete} updateTaskStatus={updateTaskStatus} />
                <TaskColumn title="Done"  tasks={tasks} status="done" handleDelete={handleDelete} updateTaskStatus={updateTaskStatus} />
            </main>
            <Footer /> 
        </div>
    );
};

export default App;
