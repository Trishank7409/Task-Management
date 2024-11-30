
import { Task } from '../types'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (id: number) => void
}

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {


  return (
    <ul className="space-y-4">
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  )
}

