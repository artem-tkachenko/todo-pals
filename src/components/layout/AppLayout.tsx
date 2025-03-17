
import { ClipboardCheck, ListChecks, Plus } from "lucide-react";
import { ReactNode, useState } from "react";
import { AnimatedTabs } from "../ui/animated-tabs";
import { Button } from "@/components/ui/button";
import { CreateTodoModal } from "../todo/CreateTodoModal";
import { Todo, User } from "@/types/todo";
import { getUserById } from "@/lib/sample-data";
import { toast } from "sonner";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
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
      };
      
      console.log("Created new todo:", newTodo);
      toast.success("Task created successfully!");
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">TaskFlow</h1>
        </div>
        
        <div className="mb-6">
          <AnimatedTabs
            tabs={[
              {
                label: "Assigned to me",
                value: "assignedToMe",
                path: "/",
                icon: <ClipboardCheck className="h-4 w-4" />,
              },
              {
                label: "Assigned by me",
                value: "assignedByMe",
                path: "/assigned-by-me",
                icon: <ListChecks className="h-4 w-4" />,
              },
            ]}
            className="w-full max-w-md bg-secondary rounded-full"
          />
        </div>
        
        <main>{children}</main>
        
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Create new task</span>
        </Button>
        
        <CreateTodoModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateTodo={handleCreateTodo}
        />
      </div>
    </div>
  );
}
