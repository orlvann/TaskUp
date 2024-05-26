import React from 'react';

const Reminders = ({ tasks }) => {
  const today = new Date().toDateString();

  return (
    <div>
      <h2 className='text-xl font-bold mb-3'>Reminders</h2>
      <ul>
        {tasks
          .filter(
            (task) =>
              new Date(task.deadline).toDateString() === today &&
              task.priority === 'High'
          )
          .map((task) => (
            <li
              key={task.id}
              className={`mb-2 p-2 border rounded ${getPriorityClass(
                task.priority
              )}`}
            >
              <strong>{task.title}</strong> - {task.priority} - Due:{' '}
              {new Date(task.deadline).toDateString()}
            </li>
          ))}
      </ul>
    </div>
  );
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100';
    case 'Medium':
      return 'bg-orange-100';
    case 'Low':
      return 'bg-green-100';
    default:
      return '';
  }
};

export default Reminders;
