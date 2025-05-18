import { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';

const TaskForm = ({ setTasks }) => {
    const [taskText, setTaskText] = useState('');
    const [status, setStatus] = useState('todo');
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleAddTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskText.trim()) return;

        const newTask = {
            id: Date.now(),
            text: taskText.trim(),
            status,
            tags,
        };

        setTasks(prev => [...prev, newTask]);
        setTaskText('');
        setTags([]);
        setStatus('todo');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const selectStatus = (newStatus) => {
        setStatus(newStatus);
        setDropdownOpen(false);
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <input
                    type="text"
                    className="task-input"
                    placeholder="Enter task..."
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <input
                    type="text"
                    className="tag-input"
                    placeholder="Add a tag..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                />
                <button
                    type="button"
                    className="add-tag-btn"
                    onClick={handleAddTag}
                >
                    +
                </button>
                <div className="dropdown">
                    <button
                        type="button"
                        className="dropdown-toggle"
                        onClick={toggleDropdown}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={() => selectStatus('todo')}>To-Do</li>
                            <li onClick={() => selectStatus('doing')}>Doing</li>
                            <li onClick={() => selectStatus('done')}>Done</li>
                        </ul>
                    )}
                </div>
                <button type="submit" className="submit-btn">
                    Add Task
                </button>
            </div>
            <div className="tags-container">
                {tags.map(tag => (
                    <span key={tag} className="tag">
                        {tag}
                        <button
                            type="button"
                            className="remove-tag-btn"
                            onClick={() => handleRemoveTag(tag)}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </form>
    );
};

TaskForm.propTypes = {
    setTasks: PropTypes.func.isRequired,
};

export default TaskForm;