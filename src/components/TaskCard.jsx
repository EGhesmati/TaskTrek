import React from 'react';
import "./TaskCard.css";
import Tag from "./Tag.jsx";
import deleteIcon from '../assets/delete.png';

const TaskCard = ({ task, handleDelete, updateTaskStatus }) => {
    return (
        <article className="task_card">
            <p className="task_text">{task.text || "Untitled Task"}</p>
            <div className="task_card_bottom_line">
                <div className="task_card_tags">
                    {task.tags?.map((tag, index) => (
                        <Tag key={index} tagName={tag} selected={true} />
                    ))}
                </div>
                <button className="task_delete" onClick={handleDelete}>
                    <img src={deleteIcon} className='delete_icon' alt="Delete" />
                </button>
            </div>

            {/* Dropdown to Change Task Status */}
            <label htmlFor={`status-select-${task.id}`} className="status-label">
                Change Status:
            </label>
            <select
                id={`status-select-${task.id}`}
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                className="status-dropdown"
            >
                <option value="todo">To-Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
            </select>
        </article>
    );
};

export default TaskCard;