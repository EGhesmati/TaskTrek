import React from 'react';
import './Tag.css';

const Tag = ({ tagName, selectTag, selected }) => {
    const tagStyle = {
        HTML: { background: "linear-gradient(135deg, #6a11cb, #2575fc)", color: "#fff" },
        CSS: { background: "linear-gradient(135deg, #00c6ff, #0072ff)", color: "#fff" },
        JavaScript: { background: "linear-gradient(135deg, #ff9a44, #ff3d71)", color: "#fff" },
        React: { background: "linear-gradient(135deg, #09c6f9, #045de9)", color: "#fff" },
        default: { background: "linear-gradient(135deg, #e0eafc, #cfdef3)", color: "#333" },
    };

    return (
        <button
            type="button"
            className="tag"
            onClick={() => selectTag(tagName)}
            style={selected ? tagStyle[tagName] || tagStyle.default : tagStyle.default}
        >
            {tagName}
        </button>
    );
};

export default Tag;
