
import { Todo, User } from "../types/todo";
import { toast } from "sonner";

export const users: User[] = [
  {
    id: "1",
    name: "You",
    email: "you@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=You&background=6366f1&color=fff"
  },
  {
    id: "2",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Alex+Johnson&background=a855f7&color=fff"
  },
  {
    id: "3",
    name: "Morgan Smith",
    email: "morgan@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Morgan+Smith&background=ec4899&color=fff"
  },
  {
    id: "4",
    name: "Jamie Wilson",
    email: "jamie@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Jamie+Wilson&background=14b8a6&color=fff"
  },
  {
    id: "5",
    name: "Casey Brown",
    email: "casey@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Casey+Brown&background=f97316&color=fff"
  }
];

// Function to create a date with an offset from today
const dateOffset = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export let todos: Todo[] = [
  {
    id: "1",
    description: "Finalize project proposal for client meeting",
    dueDate: dateOffset(1),
    completed: false,
    assignedBy: users[2], // Morgan
    assignedTo: users[0], // You
    priority: "high",
    createdAt: dateOffset(-2),
    archived: false
  },
  {
    id: "2",
    description: "Review quarterly performance metrics",
    dueDate: dateOffset(3),
    completed: false,
    assignedBy: users[1], // Alex
    assignedTo: users[0], // You
    priority: "medium",
    createdAt: dateOffset(-1),
    archived: false
  },
  {
    id: "3",
    description: "Prepare presentation slides for team update",
    dueDate: dateOffset(0), // Today
    completed: false,
    assignedBy: users[4], // Casey
    assignedTo: users[0], // You
    priority: "high",
    createdAt: dateOffset(-3),
    archived: false
  },
  {
    id: "4",
    description: "Schedule interviews for new design position",
    dueDate: dateOffset(5),
    completed: true,
    assignedBy: users[2], // Morgan
    assignedTo: users[0], // You
    priority: "medium",
    createdAt: dateOffset(-4),
    archived: false
  },
  {
    id: "5",
    description: "Update documentation for API changes",
    dueDate: dateOffset(2),
    completed: false,
    assignedBy: users[3], // Jamie
    assignedTo: users[0], // You
    priority: "low",
    createdAt: dateOffset(-1),
    archived: false
  },
  {
    id: "6",
    description: "Review competitor analysis report",
    dueDate: dateOffset(4),
    completed: false,
    assignedTo: users[2], // Morgan
    assignedBy: users[0], // You
    priority: "medium",
    createdAt: dateOffset(-5),
    archived: false
  },
  {
    id: "7",
    description: "Fix navigation bug in mobile app",
    dueDate: dateOffset(1),
    completed: true,
    assignedTo: users[1], // Alex
    assignedBy: users[0], // You
    priority: "high",
    createdAt: dateOffset(-2),
    archived: false
  },
  {
    id: "8",
    description: "Plan team building event",
    dueDate: dateOffset(7),
    completed: false,
    assignedTo: users[4], // Casey
    assignedBy: users[0], // You
    priority: "low",
    createdAt: dateOffset(-3),
    archived: false
  }
];

// Get todos assigned to "You"
export const getTodosAssignedToMe = (): Todo[] => {
  return todos.filter(todo => todo.assignedTo.id === "1" && !todo.archived);
};

// Get todos assigned by "You"
export const getTodosAssignedByMe = (): Todo[] => {
  return todos.filter(todo => todo.assignedBy.id === "1" && !todo.archived);
};

// Get archived todos
export const getArchivedTodos = (): Todo[] => {
  return todos.filter(todo => 
    (todo.assignedTo.id === "1" || todo.assignedBy.id === "1") && 
    todo.archived
  );
};

// Get all users except "You"
export const getOtherUsers = (): User[] => {
  return users.filter(user => user.id !== "1");
};

// Get a user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Toggle todo completion status
export const toggleTodoCompletion = (id: string): void => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index].completed = !todos[index].completed;
    
    if (todos[index].completed) {
      toast.success("Task marked as completed");
    } else {
      toast.info("Task marked as incomplete");
    }
  }
};

// Archive a todo
export const archiveTodo = (id: string): void => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index].archived = true;
    toast.info("Task archived");
  }
};

// Delete a todo
export const deleteTodo = (id: string): void => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos = todos.filter(todo => todo.id !== id);
    toast.error("Task deleted");
  }
};
