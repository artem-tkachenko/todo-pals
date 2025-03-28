
import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";
import { cn } from "@/lib/utils";
import { Archive, CheckCircle2, Clock, ClipboardList } from "lucide-react";
import { useState } from "react";

interface TodoListProps {
  todos: Todo[];
  type?: "assignedToMe" | "assignedByMe" | "archived";
  className?: string;
  emptyMessage?: string;
}

export function TodoList({ todos, type = "assignedToMe", className, emptyMessage = "No tasks found" }: TodoListProps) {
  const [refresh, setRefresh] = useState(0);
  
  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);
  
  // Sort by due date (most urgent first)
  const sortedPendingTodos = [...pendingTodos].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  
  const handleTodoAction = () => {
    setRefresh(prev => prev + 1); // Force a refresh when a todo action occurs
  };
  
  if (todos.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
        <div className="rounded-full bg-secondary p-3 mb-4">
          {type === "archived" ? (
            <Archive className="h-6 w-6 text-secondary-foreground" />
          ) : (
            <ClipboardList className="h-6 w-6 text-secondary-foreground" />
          )}
        </div>
        <h3 className="text-lg font-medium">
          {emptyMessage}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {type === "assignedToMe" 
            ? "You don't have any tasks assigned to you yet." 
            : type === "assignedByMe"
            ? "You haven't assigned any tasks yet."
            : "You don't have any archived tasks yet."}
        </p>
      </div>
    );
  }
  
  return (
    <div className={cn("space-y-6", className)}>
      {type !== "archived" && sortedPendingTodos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock size={16} />
            <span>Pending ({sortedPendingTodos.length})</span>
          </div>
          <div className="grid gap-3">
            {sortedPendingTodos.map((todo) => (
              <TodoItem 
                key={`${todo.id}-${refresh}`} 
                todo={todo} 
                type={type} 
                onAction={handleTodoAction}
              />
            ))}
          </div>
        </div>
      )}
      
      {(type === "archived" || completedTodos.length > 0) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {type === "archived" ? (
              <>
                <Archive size={16} />
                <span>Archived ({todos.length})</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>Completed ({completedTodos.length})</span>
              </>
            )}
          </div>
          <div className="grid gap-3">
            {(type === "archived" ? todos : completedTodos).map((todo) => (
              <TodoItem 
                key={`${todo.id}-${refresh}`} 
                todo={todo} 
                type={type}
                onAction={handleTodoAction}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
