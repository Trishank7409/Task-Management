import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import { apiConnector } from './services/apiConnector';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedIds] = useState<number>(0)
  const fetchData = async () => {
    try {
      const response = await apiConnector<Task[]>(
        'GET',
        '/getAllTasks',
        undefined,
      );
      setTasks(response.data)
      // console.log(response.data); // Typed as MyApiResponse
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[tasks.length])
  

  const addTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const response = await apiConnector<Task>('POST', '/createTask', newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);// Use the task returned by the backend
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const updateTask = async(updatedTask: Task) => {
   try {
    const id= updatedTask.id;
   await apiConnector('PUT','/updateTask',updatedTask, undefined,{id})
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
   } catch (error) {
    console.error(error);
   }
    
  };

  const confirmDeleteTask = (id: number) => {
    setSelectedIds(id)
    console.log(id)
    setIsDialogOpen(true); // Open the confirmation dialog
  };

  const deleteTask = async(id: number) => {
    try{
      await apiConnector('DELETE', `/deleteTask`, undefined, undefined, {id});
      setTasks(tasks.filter((task) => task.id !== id));
    }
    catch(error){
    console.error('API Error:', error);
    }
    finally {
      setIsDialogOpen(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-6">Task Manager</h1>
            <TaskForm onAddTask={addTask} />
            <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={confirmDeleteTask} />
           {/* Confirmation Dialog */}
           {isDialogOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                  <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this task?</h2>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setIsDialogOpen(false);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={()=>(deleteTask(selectedId))}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
