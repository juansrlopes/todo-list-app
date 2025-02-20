// src/components/Tasks/utils.ts

export interface Task {
    id: number;
    text: string;
    completed: boolean;
  }
  
  // Fetch all tasks
  export const fetchTasks = async (): Promise<Task[]> => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };
  
  // Add a new task
  export const addTask = async (task: Task): Promise<Task | undefined> => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  // Toggle task completion status
  export const toggleTaskCompletion = async (id: number, completed: boolean): Promise<Task | undefined> => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };
  
  // Delete a task
  export const deleteTask = async (id: number): Promise<void> => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  // Update a task
  export const updateTask = async (id: number, updatedTask: Task): Promise<Task | undefined> => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  