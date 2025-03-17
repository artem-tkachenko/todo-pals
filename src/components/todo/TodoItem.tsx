
import { format } from "date-fns";
import { Archive, CheckCircle2, Clock, Circle, Trash2 } from "lucide-react";
import { AvatarWithStatus } from "../ui/avatar-with-status";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/todo";
import { Button } from "../ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toggleTodoCompletion, archiveTodo, deleteTodo } from "@/lib/sample-data";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  type: "assignedToMe" | "assignedByMe" | "archived";
  onAction?: () => void;
}

export function TodoItem({ todo, type, onAction }: TodoItemProps) {
  const person = type === "assignedToMe" ? todo.assignedBy : todo.assignedTo;
  const isOverdue = new Date(todo.dueDate) < new Date() && !todo.completed;
  const isToday = new Date(todo.dueDate).toDateString() === new Date().toDateString();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleToggleCompletion = () => {
    toggleTodoCompletion(todo.id);
    if (onAction) onAction();
  };
  
  const handleArchive = () => {
    archiveTodo(todo.id);
    if (onAction) onAction();
  };
  
  const handleDelete = () => {
    deleteTodo(todo.id);
    setIsDeleteDialogOpen(false);
    if (onAction) onAction();
  };
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 animate-in hover:shadow-md",
        todo.completed && "opacity-75"
      )}
    >
      <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent to-primary/5 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-start gap-4">
        <button 
          className="mt-1 flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
          onClick={handleToggleCompletion}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed ? (
            <CheckCircle2 size={18} className="text-primary" />
          ) : (
            <Circle size={18} />
          )}
        </button>
        
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <AvatarWithStatus
              src={person.avatarUrl}
              alt={person.name}
              fallback={getInitials(person.name)}
              size="sm"
            />
            
            <div className="flex flex-col">
              <span className="font-medium text-card-foreground">{person.name}</span>
              <span className="text-xs text-muted-foreground">{person.email}</span>
            </div>
          </div>
          
          <p className={cn(
            "text-sm font-medium",
            todo.completed ? "text-muted-foreground line-through" : "text-card-foreground"
          )}>
            {todo.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-wrap gap-2 text-xs">
              <div className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium",
                isOverdue && !todo.completed ? "bg-destructive/10 text-destructive" : 
                isToday && !todo.completed ? "bg-primary/10 text-primary" : 
                "bg-secondary text-secondary-foreground"
              )}>
                <Clock size={12} />
                <span>
                  {isToday ? "Today" : format(new Date(todo.dueDate), "MMM d, yyyy")}
                </span>
              </div>
              
              <div className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium",
                todo.priority === "high" ? "bg-red-100 text-red-600" : 
                todo.priority === "medium" ? "bg-amber-100 text-amber-600" : 
                "bg-green-100 text-green-600"
              )}>
                {todo.priority}
              </div>
            </div>
            
            {type !== "archived" && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleArchive}
                  aria-label="Archive task"
                >
                  <Archive size={14} />
                </Button>
                
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive/90"
                      aria-label="Delete task"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Task</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this task? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
