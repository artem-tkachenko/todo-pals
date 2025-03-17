
import { Archive, ClipboardCheck, ListChecks, Plus } from "lucide-react";
import { ReactNode, useState } from "react";
import { Todo, User } from "@/types/todo";
import { getUserById } from "@/lib/sample-data";
import { toast } from "sonner";
import { CreateTodoModal } from "../todo/CreateTodoModal";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children?: ReactNode;
  isSheet?: boolean;
}

export function AppLayout({ children, isSheet = false }: AppLayoutProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleCreateTodo = (description: string, assignedTo: User, dueDate: Date, priority: string) => {
    // In a real app, this would call an API to create the todo
    const currentUser = getUserById("1");
    
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

  const menuItems = [
    {
      title: "Assigned to me",
      path: "/",
      icon: ClipboardCheck,
      isActive: location.pathname === "/"
    },
    {
      title: "Assigned by me",
      path: "/assigned-by-me",
      icon: ListChecks,
      isActive: location.pathname === "/assigned-by-me"
    },
    {
      title: "Archived",
      path: "/archived",
      icon: Archive,
      isActive: location.pathname === "/archived"
    },
    {
      title: "Create new task",
      path: "#create-task",
      icon: Plus,
      isActive: false,
      onClick: () => setIsCreateModalOpen(true)
    }
  ];
  
  const sidebarContent = (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold tracking-tight">TaskFlow</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={item.isActive} 
                    onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" className="w-full">
            <span className="truncate">Settings</span>
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
  
  if (isSheet) {
    return (
      <>
        {sidebarContent}
        <CreateTodoModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateTodo={handleCreateTodo}
        />
      </>
    );
  }
  
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar side="left" variant="floating">
          {sidebarContent}
        </Sidebar>
        
        <div className="flex-1">
          <main>{children}</main>
        </div>
        
        <CreateTodoModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateTodo={handleCreateTodo}
        />
      </div>
    </SidebarProvider>
  );
}
