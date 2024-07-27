import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
