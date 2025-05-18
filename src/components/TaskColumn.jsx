import React from 'react';
import './TaskColumn.css';
import TaskCard from './TaskCard.jsx';

const TaskColumn = ({ title, icon, tasks, status, handleDelete, updateTaskStatus }) => {
    return (
        <section className="task_column">
            <h2 className="task_column_heading">
                <img className="task_column_icon" src={icon} alt="" />
                {title}
            </h2>
            {tasks
                .filter(task => task.status === status)
                .map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        handleDelete={() => handleDelete(task.id)}
                        updateTaskStatus={updateTaskStatus}
                    />
                ))}
        </section>
    );
};

export default TaskColumn;
