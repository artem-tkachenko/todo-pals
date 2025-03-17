
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Todo {
  id: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  assignedBy: User;
  assignedTo: User;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}
