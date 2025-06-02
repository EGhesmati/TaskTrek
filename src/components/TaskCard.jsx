import React, { useState } from 'react';
import "./TaskCard.css";
import Tag from "./Tag.jsx";
import deleteIcon from '../assets/delete.png';

const TaskCard = ({ task, handleDelete, updateTaskStatus, updateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [editTags, setEditTags] = useState(task.tags || []);
    const [newTag, setNewTag] = useState('');

    // Add new tag in edit mode
    const handleAddTag = () => {
        const trimmed = newTag.trim();
        if (trimmed && !editTags.includes(trimmed)) {
            setEditTags([...editTags, trimmed]);
            setNewTag('');
        }
    };

    // Remove tag in edit mode
    const handleRemoveTag = (tagToRemove) => {
        setEditTags(editTags.filter(tag => tag !== tagToRemove));
    };

    // Save edits
    const handleSave = () => {
        const updatedTask = {
            ...task,
            text: editText.trim() || "Untitled Task",
            tags: editTags,
        };
        updateTask(task.id, updatedTask);
        setIsEditing(false);
    };

    // Cancel edits
    const handleCancel = () => {
        setEditText(task.text);
        setEditTags(task.tags || []);
        setNewTag('');
        setIsEditing(false);
    };

    return (
        <article className="task_card">
            {isEditing ? (
                <>
                    <textarea
                        className="task_text_edit"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="edit_tags_section">
                        {editTags.map(tag => (
                            <Tag key={tag} tagName={tag} selected={true}>
                                <button
                                    type="button"
                                    className="remove-tag-btn"
                                    onClick={() => handleRemoveTag(tag)}
                                    aria-label={`Remove tag ${tag}`}
                                >
                                    ×
                                </button>
                            </Tag>
                        ))}
                        <input
                            type="text"
                            placeholder="Add tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                            className="tag-input-edit"
                        />
                        <button type="button" className="add-tag-btn" onClick={handleAddTag}>
                            +
                        </button>
                    </div>
                    <div className="edit_buttons">
                        <button type="button" onClick={handleSave} className="save-btn">
                            Save
                        </button>
                        <button type="button" onClick={handleCancel} className="cancel-btn">
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p className="task_text">{task.text || "Untitled Task"}</p>
                    <div className="task_card_bottom_line">
                        <div className="task_card_tags">
                            {task.tags?.map((tag, index) => (
                                <Tag key={index} tagName={tag} selected={true} />
                            ))}
                        </div>
                        <button className="task_delete" onClick={handleDelete} aria-label="Delete task">
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

                    <button
                        type="button"
                        className="edit-btn"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                </>
            )}
        </article>
    );
};

export default TaskCard;
