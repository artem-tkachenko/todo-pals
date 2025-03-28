
import { Bell, BellDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTodosByUser } from "@/lib/sample-data";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface MobileHeaderProps {
  title: string;
  showMenu?: boolean;
}

export function MobileHeader({ title, showMenu = false }: MobileHeaderProps) {
  // Check if there are unread notifications
  const currentUserTodos = getTodosByUser("1");
  const uncompletedTasks = currentUserTodos.filter(todo => !todo.completed && !todo.archived);
  const hasNotifications = uncompletedTasks.length > 0;
  
  // Get overdue tasks
  const now = new Date();
  const overdueTasks = uncompletedTasks.filter(todo => new Date(todo.dueDate) < now);
  
  return (
    <div className="h-16 px-4 border-b flex items-center justify-between bg-background/80 backdrop-blur-lg">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative focus:outline-none">
              {hasNotifications ? (
                <div className="relative">
                  <BellDot className="h-6 w-6" />
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {uncompletedTasks.length}
                  </Badge>
                </div>
              ) : (
                <Bell className="h-6 w-6" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            {uncompletedTasks.length > 0 ? (
              <>
                {overdueTasks.length > 0 && (
                  <DropdownMenuItem className="flex flex-col items-start py-2 text-destructive cursor-default">
                    <span className="font-medium">🚨 Overdue Tasks</span>
                    <span className="text-xs text-muted-foreground">You have {overdueTasks.length} overdue tasks</span>
                  </DropdownMenuItem>
                )}
                
                {uncompletedTasks.map(todo => (
                  <DropdownMenuItem key={todo.id} className="flex flex-col items-start py-2 cursor-default">
                    <span className="font-medium">
                      {todo.assignedBy.id === "1" ? "Task assigned by you" : `New task from ${todo.assignedBy.name}`}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-full">{todo.description}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      Due: {format(new Date(todo.dueDate), "MMM d, yyyy")}
                    </span>
                  </DropdownMenuItem>
                ))}
              </>
            ) : (
              <DropdownMenuItem disabled className="text-center py-4 text-muted-foreground">
                No new notifications
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
