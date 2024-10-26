import React from "react";
import "./TaskCard.css";

 //TODO: add trash can icon
function TaskCard({task, index, onDelete}) {
    return (
        <div className='task-card' >
            {task}
            
            <button 
            className='task-card-delete-btn' 
            onClick={() => onDelete(index)}
            >
                Delete
            </button>
        
        </div>    
    );
};

export default TaskCard;