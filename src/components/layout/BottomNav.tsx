
import { Home, Archive, ListChecks, Plus, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CreateTodoModal } from "../todo/CreateTodoModal";
import { getUserById } from "@/lib/sample-data";
import { Todo, User as UserType } from "@/types/todo";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { AvatarWithStatus } from "../ui/avatar-with-status";

export function BottomNav() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentUser = getUserById("1");
  
  const handleCreateTodo = (description: string, assignedTo: UserType, dueDate: Date, priority: string) => {
    // In a real app, this would call an API to create the todo
    if (currentUser) {
      // Simulate saving a new todo
      const newTodo: Partial<Todo> = {
        description,
        dueDate,
        completed: false,
        assignedBy: currentUser,
        assignedTo,
        priority: priority as "low" | "medium" | "high",
        createdAt: new Date(),
        archived: false
      };
      
      console.log("Created new todo:", newTodo);
      toast.success("Task created successfully!");
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const navItems = [
    {
      icon: Home,
      label: "My Tasks",
      path: "/",
      isActive: location.pathname === "/"
    },
    {
      icon: ListChecks,
      label: "Assigned",
      path: "/assigned-by-me",
      isActive: location.pathname === "/assigned-by-me"
    },
    {
      icon: Plus,
      label: "Create",
      action: () => setIsCreateModalOpen(true),
      isSpecial: true
    },
    {
      icon: Archive,
      label: "Archived",
      path: "/archived",
      isActive: location.pathname === "/archived"
    }
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-t z-50">
        <div className="grid grid-cols-5 h-full">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.action ? item.action() : navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1",
                item.isActive && "text-primary",
                !item.isActive && !item.isSpecial && "text-muted-foreground"
              )}
            >
              {item.isSpecial ? (
                <div className="relative -top-6">
                  <div className="rounded-full bg-primary w-12 h-12 flex items-center justify-center text-primary-foreground shadow-lg">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
              ) : (
                <>
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </button>
          ))}
          
          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center justify-center space-y-1 text-muted-foreground">
                <User className="h-5 w-5" />
                <span className="text-xs font-medium">Profile</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center p-2">
                <AvatarWithStatus
                  src={currentUser?.avatarUrl || ""}
                  alt={currentUser?.name || ""}
                  fallback={getInitials(currentUser?.name || "")}
                  size="sm"
                />
                <div className="ml-2">
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                </div>
              </div>
              
              <DropdownMenuSeparator />
              
              <div className="p-2">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Tasks</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </div>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTodo={handleCreateTodo}
      />
    </>
  );
}
