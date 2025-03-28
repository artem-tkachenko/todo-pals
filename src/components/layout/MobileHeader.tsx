
import { Bell, BellDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTodosByUser } from "@/lib/sample-data";
import { Badge } from "@/components/ui/badge";

interface MobileHeaderProps {
  title: string;
  showMenu?: boolean;
}

export function MobileHeader({ title, showMenu = false }: MobileHeaderProps) {
  // Check if there are unread notifications
  const currentUserTodos = getTodosByUser("1");
  const uncompletedTasks = currentUserTodos.filter(todo => !todo.completed && !todo.archived);
  const hasNotifications = uncompletedTasks.length > 0;
  
  return (
    <div className="h-16 px-4 border-b flex items-center justify-between bg-background/80 backdrop-blur-lg">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center">
        <div className="relative">
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
        </div>
      </div>
    </div>
  );
}
