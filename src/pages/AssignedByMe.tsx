
import { useState } from "react";
import { Check, Clock, ListChecks } from "lucide-react";
import { MobileApp } from "@/components/layout/MobileApp";
import { TabView } from "@/components/layout/TabView";
import { TodoList } from "@/components/todo/TodoList";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAssignedByUser } from "@/lib/sample-data";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

export default function AssignedByMe() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  
  const assignedTodos = getAssignedByUser("1");
  const pendingTodos = assignedTodos.filter(todo => !todo.completed && !todo.archived);
  const completedTodos = assignedTodos.filter(todo => todo.completed && !todo.archived);
  
  const tabs = [
    {
      value: "all",
      label: "All",
      icon: <ListChecks className="h-4 w-4" />,
      content: <TodoList todos={assignedTodos.filter(t => !t.archived)} emptyMessage="No assigned tasks found" />
    },
    {
      value: "pending",
      label: "Pending",
      icon: <Clock className="h-4 w-4" />,
      content: <TodoList todos={pendingTodos} emptyMessage="No pending assigned tasks" />
    },
    {
      value: "completed",
      label: "Completed",
      icon: <Check className="h-4 w-4" />,
      content: <TodoList todos={completedTodos} emptyMessage="No completed assigned tasks" />
    }
  ];

  if (isMobile) {
    return (
      <MobileApp title="Assigned By Me">
        <TabView 
          tabs={tabs} 
          defaultTab={filter} 
          onTabChange={(value) => setFilter(value as any)} 
        />
      </MobileApp>
    );
  }

  // Desktop fallback
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tasks I've Assigned</h1>
      
      <div className="mb-6">
        <AnimatedTabs 
          tabs={[
            { label: "All", value: "all", path: "#all", icon: <ListChecks className="h-4 w-4" /> },
            { label: "Pending", value: "pending", path: "#pending", icon: <Clock className="h-4 w-4" /> },
            { label: "Completed", value: "completed", path: "#completed", icon: <Check className="h-4 w-4" /> }
          ]}
          className="w-full max-w-md mx-auto"
        />
      </div>
      
      {filter === "all" && (
        <TodoList 
          todos={assignedTodos.filter(t => !t.archived)} 
          emptyMessage="No assigned tasks found" 
        />
      )}
      
      {filter === "pending" && (
        <TodoList 
          todos={pendingTodos} 
          emptyMessage="No pending assigned tasks" 
        />
      )}
      
      {filter === "completed" && (
        <TodoList 
          todos={completedTodos} 
          emptyMessage="No completed assigned tasks" 
        />
      )}
    </div>
  );
}
