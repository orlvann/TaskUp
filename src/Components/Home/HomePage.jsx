import React, { useState, useEffect } from 'react';
import Nav from '../Share/Nav';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../App/App.css';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const formattedTasks = savedTasks.map((task) => ({
      ...task,
      deadline: task.deadline ? new Date(task.deadline) : new Date(),
    }));
    setTasks(formattedTasks);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const highlightDates = tasks.map((task) => new Date(task.deadline));

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

  return (
    <div className='App bg-gradient-to-r from-cyan-900 to-indigo-900 w-full min-h-screen'>
      <Nav />
      <div className='text-center text-white text-3xl mb-5 font-bold'>
        Welcome to TaskUp!
      </div>
      <div className='container mx-auto p-5'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-white rounded-lg shadow-lg p-5'>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={({ date, view }) =>
                view === 'month' &&
                highlightDates.some(
                  (d) => d.toDateString() === date.toDateString()
                )
                  ? 'highlight'
                  : ''
              }
            />
          </div>
          <div className='bg-white rounded-lg shadow-lg p-5'>
            <h2 className='text-xl font-bold mb-3'>Reminders</h2>
            <ul>
              {tasks
                .filter(
                  (task) =>
                    new Date(task.deadline).toDateString() ===
                      new Date().toDateString() && task.priority === 'High'
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
          <div className='bg-white rounded-lg shadow-lg p-5'>
            <h2 className='text-xl font-bold mb-3'>Task List</h2>
            <ul>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`mb-2 p-2 border rounded ${getPriorityClass(
                    task.priority
                  )}`}
                >
                  <strong>{task.title}</strong> - {task.priority} - Due:{' '}
                  {new Date(task.deadline).toDateString()}
                  <ul className='ml-5 mt-2'>
                    {task.subtasks &&
                      task.subtasks.map((subtask) => (
                        <li key={subtask.id} className='mt-1'>
                          Subtask: {subtask.title} - {subtask.status}
                        </li>
                      ))}
                    {task.comments &&
                      task.comments.map((comment) => (
                        <li key={comment.id} className='mt-1'>
                          Comment: {comment.text}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
