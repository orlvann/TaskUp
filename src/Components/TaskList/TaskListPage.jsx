import React, { useState, useEffect } from 'react';
import Nav from '../Share/Nav';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../App/App.css';
const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [editingTask, setEditingTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState('In Progress');
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [comment, setComment] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const formattedTasks = savedTasks.map((task) => ({
      ...task,
      deadline: task.deadline ? new Date(task.deadline) : new Date(),
    }));
    setTasks(formattedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        priority: taskPriority,
        deadline: taskDeadline.toISOString().split('T')[0],
        status: taskStatus,
        subtasks: [],
        comments: [],
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskPriority('Medium');
      setTaskDeadline(new Date());
      setTaskStatus('In Progress');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskPriority(task.priority);
    setTaskDeadline(new Date(task.deadline));
    setTaskStatus(task.status);
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id
        ? {
            ...task,
            title: taskTitle,
            priority: taskPriority,
            deadline: taskDeadline.toISOString().split('T')[0],
            status: taskStatus,
          }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setTaskTitle('');
    setTaskPriority('Medium');
    setTaskDeadline(new Date());
    setTaskStatus('In Progress');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleCopyTask = (task) => {
    const copiedTask = { ...task, id: Date.now() };
    setTasks([...tasks, copiedTask]);
  };

  const handleAddSubtask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            subtasks: [
              ...task.subtasks,
              { id: Date.now(), title: subtaskTitle, status: 'In Progress' },
            ],
          }
        : task
    );
    setTasks(updatedTasks);
    setSubtaskTitle('');
  };

  const handleEditSubtask = (taskId, subtaskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, title: newTitle }
                : subtask
            ),
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteSubtask = (taskId, subtaskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.filter(
              (subtask) => subtask.id !== subtaskId
            ),
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleSubtaskStatus = (taskId, subtaskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? {
                    ...subtask,
                    status:
                      subtask.status === 'Completed'
                        ? 'In Progress'
                        : 'Completed',
                  }
                : subtask
            ),
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleAddComment = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            comments: [...task.comments, { id: Date.now(), text: comment }],
          }
        : task
    );
    setTasks(updatedTasks);
    setComment('');
  };

  const handleDeleteComment = (taskId, commentId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            comments: task.comments.filter(
              (comment) => comment.id !== commentId
            ),
          }
        : task
    );
    setTasks(updatedTasks);
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const highlightDates = tasks.map((task) => new Date(task.deadline));

  return (
    <div className='App bg-gradient-to-r from-cyan-900 to-indigo-900 w-full min-h-screen'>
      <Nav />
      <div className='container mx-auto p-5 flex'>
        <div className='w-1/4 mr-5'>
          <div className='bg-white rounded-lg shadow-lg p-5 mb-5'>
            <h1 className='text-2xl font-bold mb-5'>Create Task</h1>
            <form
              onSubmit={editingTask ? handleSaveEdit : handleAddTask}
              className='mb-5'
            >
              <div className='mb-4'>
                <input
                  type='text'
                  placeholder='Task Title'
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className='w-full p-2 border rounded mb-2'
                  required
                />
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className='w-full p-2 border rounded mb-2'
                >
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </select>
                <DatePicker
                  selected={taskDeadline}
                  onChange={(date) => setTaskDeadline(date)}
                  className='w-full p-2 border rounded mb-2'
                />
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  className='w-full p-2 border rounded mb-2'
                >
                  <option value='In Progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                  <option value='Waiting'>Waiting</option>
                </select>
                <button
                  type='submit'
                  className='w-full p-2 bg-blue-500 text-white rounded'
                >
                  {editingTask ? 'Save Task' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
          <div className='welcome-container__calendar'>
            <div className='calendar-container'>
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
                className='calendar__calendar'
              />
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-lg p-5 w-3/4 max-h-[100vh] overflow-y-auto'>
          <h1 className='text-2xl font-bold mb-5'>Task List</h1>
          <div>
            <h2 className='text-xl font-bold mb-3'>Today</h2>
            <ul>
              {tasks
                .filter(
                  (task) =>
                    task.deadline === new Date().toISOString().split('T')[0] &&
                    task.status !== 'Completed'
                )
                .map((task) => (
                  <li
                    key={task.id}
                    className={`flex flex-col mb-2 p-2 border rounded ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    <div className='flex justify-between items-center'>
                      <div>
                        <strong>{task.title}</strong> - {task.priority} - Due:{' '}
                        {new Date(task.deadline).toLocaleDateString()}
                      </div>
                      <div>
                        <button
                          onClick={() => handleEditTask(task)}
                          className='text-blue-500 mx-1'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className='text-red-500 mx-1'
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleCopyTask(task)}
                          className='text-green-500 mx-1'
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <ul className='ml-5'>
                        {task.subtasks.map((subtask) => (
                          <li
                            key={subtask.id}
                            className='flex justify-between items-center'
                          >
                            <div
                              className={`flex items-center ${
                                subtask.status === 'Completed'
                                  ? 'line-through'
                                  : ''
                              }`}
                            >
                              <input
                                type='checkbox'
                                checked={subtask.status === 'Completed'}
                                onChange={() =>
                                  handleToggleSubtaskStatus(task.id, subtask.id)
                                }
                                className='mr-2'
                              />
                              {subtask.title}
                            </div>
                            <div>
                              <button
                                onClick={() =>
                                  handleEditSubtask(
                                    task.id,
                                    subtask.id,
                                    prompt('New subtask title', subtask.title)
                                  )
                                }
                                className='text-blue-500 mx-1'
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteSubtask(task.id, subtask.id)
                                }
                                className='text-red-500 mx-1'
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddSubtask(task.id);
                        }}
                        className='flex mt-2'
                      >
                        <input
                          type='text'
                          placeholder='Subtask Title'
                          value={subtaskTitle}
                          onChange={(e) => setSubtaskTitle(e.target.value)}
                          className='w-full p-2 border rounded'
                        />
                        <button
                          type='submit'
                          className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg'
                        >
                          Add Subtask
                        </button>
                      </form>
                    </div>
                    <div className='mt-2'>
                      <h3 className='font-semibold'>Comments</h3>
                      <ul className='ml-5'>
                        {task.comments.map((comment) => (
                          <li
                            key={comment.id}
                            className='flex justify-between items-center'
                          >
                            <div>{comment.text}</div>
                            <button
                              onClick={() =>
                                handleDeleteComment(task.id, comment.id)
                              }
                              className='text-red-500 mx-1'
                            >
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddComment(task.id);
                        }}
                        className='flex mt-2'
                      >
                        <input
                          type='text'
                          placeholder='Add a comment'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className='w-full p-2 border rounded'
                        />
                        <button
                          type='submit'
                          className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg'
                        >
                          Add Comment
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className='text-xl font-bold mb-3'>Upcoming</h2>
            <ul>
              {tasks
                .filter(
                  (task) =>
                    task.deadline !== new Date().toISOString().split('T')[0] &&
                    task.status !== 'Completed'
                )
                .map((task) => (
                  <li
                    key={task.id}
                    className={`flex flex-col mb-2 p-2 border rounded ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    <div className='flex justify-between items-center'>
                      <div>
                        <strong>{task.title}</strong> - {task.priority} - Due:{' '}
                        {new Date(task.deadline).toLocaleDateString()}
                      </div>
                      <div>
                        <button
                          onClick={() => handleEditTask(task)}
                          className='text-blue-500 mx-1'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className='text-red-500 mx-1'
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleCopyTask(task)}
                          className='text-green-500 mx-1'
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <ul className='ml-5'>
                        {task.subtasks.map((subtask) => (
                          <li
                            key={subtask.id}
                            className='flex justify-between items-center'
                          >
                            <div
                              className={`flex items-center ${
                                subtask.status === 'Completed'
                                  ? 'line-through'
                                  : ''
                              }`}
                            >
                              <input
                                type='checkbox'
                                checked={subtask.status === 'Completed'}
                                onChange={() =>
                                  handleToggleSubtaskStatus(task.id, subtask.id)
                                }
                                className='mr-2'
                              />
                              {subtask.title}
                            </div>
                            <div>
                              <button
                                onClick={() =>
                                  handleEditSubtask(
                                    task.id,
                                    subtask.id,
                                    prompt('New subtask title', subtask.title)
                                  )
                                }
                                className='text-blue-500 mx-1'
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteSubtask(task.id, subtask.id)
                                }
                                className='text-red-500 mx-1'
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddSubtask(task.id);
                        }}
                        className='flex mt-2'
                      >
                        <input
                          type='text'
                          placeholder='Subtask Title'
                          value={subtaskTitle}
                          onChange={(e) => setSubtaskTitle(e.target.value)}
                          className='w-full p-2 border rounded'
                        />
                        <button
                          type='submit'
                          className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg'
                        >
                          Add Subtask
                        </button>
                      </form>
                    </div>
                    <div className='mt-2'>
                      <h3 className='font-semibold'>Comments</h3>
                      <ul className='ml-5'>
                        {task.comments.map((comment) => (
                          <li
                            key={comment.id}
                            className='flex justify-between items-center'
                          >
                            <div>{comment.text}</div>
                            <button
                              onClick={() =>
                                handleDeleteComment(task.id, comment.id)
                              }
                              className='text-red-500 mx-1'
                            >
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddComment(task.id);
                        }}
                        className='flex mt-2'
                      >
                        <input
                          type='text'
                          placeholder='Add a comment'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className='w-full p-2 border rounded'
                        />
                        <button
                          type='submit'
                          className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg'
                        >
                          Add Comment
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
