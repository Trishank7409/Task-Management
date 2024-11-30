import React, { useState } from 'react';

import { Button } from './ui/Button';
import { Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog';
import { Input } from './ui/Input';
import { Textarea } from './ui/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleStatusChange = (value: string) => {
    const updatedTask = { ...task, status: value as 'pending' | 'complete' };
    onUpdateTask(updatedTask);
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <li className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-lg font-semibold ${task.status === 'complete' ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  placeholder="Task title"
                />
                <Textarea
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  placeholder="Task description"
                />
                <Input
                  type="date"
                  value={editedTask.date}
                  onChange={(e) => setEditedTask({ ...editedTask, date: e.target.value })}
                />
                <Select
                  value={editedTask.status}
                  onValueChange={(value) => setEditedTask({ ...editedTask, status: value as 'pending' | 'complete' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="icon" onClick={() => onDeleteTask(task.id)} className="text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Due: {task.date}</span>
        <Select value={task.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </li>
  );
}

export default TaskItem;
