// src/components/Tasks/index.tsx
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { fetchTasks, addTask, toggleTaskCompletion, deleteTask, updateTask } from './utils';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editInputValue, setEditInputValue] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      if (tasksData) setTasks(tasksData);
    };
    getTasks();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = async () => {
    if (inputValue.trim()) {
      const newTask: Task = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        text: inputValue,
        completed: false,
      };
      const addedTask = await addTask(newTask);
      if (addedTask) {
        setTasks([...tasks, addedTask]);
        setInputValue('');
        showNotification('Task added successfully!');
      }
    }
  };

  const handleToggleComplete = async (id: number) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      const updatedTask = await toggleTaskCompletion(id, !taskToUpdate.completed);
      if (updatedTask) {
        const newTasks = tasks.map(task => 
          task.id === id ? updatedTask : task
        );
        setTasks(newTasks);
      }
    }
  };

  const handleDeleteTask = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      await deleteTask(id);
      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
      showNotification('Task deleted successfully!');
    }
  };

  const handleEditTask = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditInputValue(text);
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    }
  };

  const handleSaveEdit = async (id: number) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, text: editInputValue };
      const response = await updateTask(id, updatedTask);
      if (response) {
        const newTasks = tasks.map(task => 
          task.id === id ? response : task
        );
        setTasks(newTasks);
        setEditingTaskId(null);
        showNotification('Task updated successfully!');
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notification will disappear after 3 seconds
  };

  return (
    <div>
      {notification && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {notification}
        </div>
      )}
      <div className="flex mb-4">
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown}
          placeholder="Add a new task" 
          className="flex-grow border-2 border-gray-300 p-2 rounded"
        />
        <button 
          onClick={handleAddTask}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="list-none p-0">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            <div className="flex-grow flex items-center">
              <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                className="mr-2"
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onKeyDown={(e) => handleEditInputKeyDown(e, task.id)}
                  className="flex-grow border-2 border-gray-300 p-2 rounded"
                />
              ) : (
                <span className={task.completed ? 'line-through' : ''}>
                  {task.text}
                </span>
              )}
            </div>
            {editingTaskId === task.id ? (
              <button 
                onClick={() => handleSaveEdit(task.id)}
                className="bg-green-500 text-white p-1 rounded"
              >
                Save
              </button>
            ) : (
              <button 
                onClick={() => handleEditTask(task.id, task.text)}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                Edit
              </button>
            )}
            <button 
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
