import React, { useState } from 'react';
import { Task } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Textarea } from './ui/TextArea';


interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && date) {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        date,
        status: 'pending',
      });
      // const bodyData = {
      //   title: title.trim(),
      //   description: description.trim(),
      //   date,
      //   status: 'pending',
      // }
      // try {
      //   const response = await apiConnector<Task[]>(
      //     'POST',
      //     '/createTask',
      //     bodyData,
      //   );
      //   console.log(response.data); // Typed as MyApiResponse
      // } catch (error) {
      //   console.error('API Error:', error);
      // }
      setTitle('');
      setDescription('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <div>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">Add Task</Button>
    </form>
  );
}

export default TaskForm;
