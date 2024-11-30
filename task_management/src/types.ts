export interface Task {
    id: number
    title: string
    description: string
    date: string
    status: 'pending' | 'complete'
  }