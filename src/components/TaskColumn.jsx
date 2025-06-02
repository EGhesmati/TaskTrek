import React from 'react';
import './TaskColumn.css';
import TaskCard from './TaskCard.jsx';

const TaskColumn = ({
                        title,
                        tasks,
                        status,
                        handleDelete,
                        updateTaskStatus,
                        updateTask,
                    }) => {
    return (
        <section className="task_column">
            <h2 className="task_column_heading">{title}</h2>
            {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        handleDelete={() => handleDelete(task.id)}
                        updateTaskStatus={updateTaskStatus}
                        updateTask={updateTask}
                    />
                ))}
        </section>
    );
};

export default TaskColumn;
