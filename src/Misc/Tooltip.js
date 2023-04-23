import React, { useState, useRef } from 'react';
import './Tooltip.css';

const Tooltip = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const childRef = useRef(null);

    return (
        <span
            className="tooltip-container"
            ref={childRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
      {children}
            {isHovered && (
                <div className="tooltip-text">{childRef.current.textContent}</div>
            )}
    </span>
    );
};

export default Tooltip;