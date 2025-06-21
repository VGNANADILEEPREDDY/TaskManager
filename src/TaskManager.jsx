import React, { useState } from 'react';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      desc,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDesc('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Dynamic Task Manager</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Task Description"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            onClick={() => toggleComplete(task.id)}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
          >
            <strong>{task.title}</strong>: {task.desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
