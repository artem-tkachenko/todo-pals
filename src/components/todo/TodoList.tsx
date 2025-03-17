
import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";
import { cn } from "@/lib/utils";
import { CheckCircle, CheckCircle2, Clock, ClipboardList } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  type: "assignedToMe" | "assignedByMe";
  className?: string;
}

export function TodoList({ todos, type, className }: TodoListProps) {
  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);
  
  // Sort by due date (most urgent first)
  const sortedPendingTodos = [...pendingTodos].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  
  if (todos.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
        <div className="rounded-full bg-secondary p-3 mb-4">
          <ClipboardList className="h-6 w-6 text-secondary-foreground" />
        </div>
        <h3 className="text-lg font-medium">No tasks found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {type === "assignedToMe" 
            ? "You don't have any tasks assigned to you yet." 
            : "You haven't assigned any tasks yet."}
        </p>
      </div>
    );
  }
  
  return (
    <div className={cn("space-y-6", className)}>
      {sortedPendingTodos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock size={16} />
            <span>Pending ({sortedPendingTodos.length})</span>
          </div>
          <div className="grid gap-3">
            {sortedPendingTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} type={type} />
            ))}
          </div>
        </div>
      )}
      
      {completedTodos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CheckCircle2 size={16} />
            <span>Completed ({completedTodos.length})</span>
          </div>
          <div className="grid gap-3">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} type={type} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
