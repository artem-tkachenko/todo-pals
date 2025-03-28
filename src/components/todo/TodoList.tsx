
import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";
import { cn } from "@/lib/utils";
import { Archive, Calendar, ClipboardList } from "lucide-react";
import { useState } from "react";
import { format, startOfWeek, isSameWeek, addWeeks, isAfter, isBefore } from "date-fns";

interface TodoListProps {
  todos: Todo[];
  type?: "assignedToMe" | "assignedByMe" | "archived";
  className?: string;
  emptyMessage?: string;
}

export function TodoList({ todos, type = "assignedToMe", className, emptyMessage = "No tasks found" }: TodoListProps) {
  const [refresh, setRefresh] = useState(0);
  
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
  
  const now = new Date();
  const currentWeekStart = startOfWeek(now, { weekStartsOn: 1 }); // Week starts on Monday
  const nextWeekStart = addWeeks(currentWeekStart, 1);
  
  // Sort by due date (most urgent first)
  const sortedTodos = [...todos].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  
  // Group todos by week
  const thisWeekTodos = sortedTodos.filter(todo => 
    isSameWeek(new Date(todo.dueDate), now, { weekStartsOn: 1 })
  );
  
  const nextWeekTodos = sortedTodos.filter(todo => 
    isSameWeek(new Date(todo.dueDate), nextWeekStart, { weekStartsOn: 1 })
  );
  
  const futureWeeksTodos = sortedTodos.filter(todo => 
    isAfter(new Date(todo.dueDate), addWeeks(currentWeekStart, 1))
  );
  
  const pastTodos = sortedTodos.filter(todo => 
    isBefore(new Date(todo.dueDate), currentWeekStart)
  );

  // Format date ranges for each section
  const thisWeekRange = `${format(currentWeekStart, 'MMM d')} - ${format(addWeeks(currentWeekStart, 1).setDate(addWeeks(currentWeekStart, 1).getDate() - 1), 'MMM d')}`;
  const nextWeekRange = `${format(nextWeekStart, 'MMM d')} - ${format(addWeeks(nextWeekStart, 1).setDate(addWeeks(nextWeekStart, 1).getDate() - 1), 'MMM d')}`;
  const pastRange = `Before ${format(currentWeekStart, 'MMM d')}`;
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* This Week */}
      {thisWeekTodos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar size={16} />
            <span>{thisWeekRange} ({thisWeekTodos.length})</span>
          </div>
          <div className="grid gap-3">
            {thisWeekTodos.map((todo) => (
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
      
      {/* Next Week */}
      {nextWeekTodos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar size={16} />
            <span>{nextWeekRange} ({nextWeekTodos.length})</span>
          </div>
          <div className="grid gap-3">
            {nextWeekTodos.map((todo) => (
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
      
      {/* Future Weeks */}
      {futureWeeksTodos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar size={16} />
            <span>After {format(addWeeks(nextWeekStart, 1).setDate(addWeeks(nextWeekStart, 1).getDate() - 1), 'MMM d')} ({futureWeeksTodos.length})</span>
          </div>
          <div className="grid gap-3">
            {futureWeeksTodos.map((todo) => (
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
      
      {/* Past Due */}
      {pastTodos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar size={16} />
            <span>{pastRange} ({pastTodos.length})</span>
          </div>
          <div className="grid gap-3">
            {pastTodos.map((todo) => (
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
