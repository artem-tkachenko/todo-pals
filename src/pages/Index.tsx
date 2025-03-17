
import { useState } from "react";
import { Check, Clock, ListChecks } from "lucide-react";
import { MobileApp } from "@/components/layout/MobileApp";
import { TabView } from "@/components/layout/TabView";
import { TodoList } from "@/components/todo/TodoList";
import { useIsMobile } from "@/hooks/use-mobile";
import { getTodosByUser } from "@/lib/sample-data";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

export default function Index() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  
  const currentUserTodos = getTodosByUser("1");
  const pendingTodos = currentUserTodos.filter(todo => !todo.completed && !todo.archived);
  const completedTodos = currentUserTodos.filter(todo => todo.completed && !todo.archived);
  
  const tabs = [
    {
      value: "all",
      label: "All",
      icon: <ListChecks className="h-4 w-4" />,
      content: <TodoList todos={currentUserTodos.filter(t => !t.archived)} emptyMessage="No tasks found" />
    },
    {
      value: "pending",
      label: "Pending",
      icon: <Clock className="h-4 w-4" />,
      content: <TodoList todos={pendingTodos} emptyMessage="No pending tasks" />
    },
    {
      value: "completed",
      label: "Completed",
      icon: <Check className="h-4 w-4" />,
      content: <TodoList todos={completedTodos} emptyMessage="No completed tasks" />
    }
  ];

  if (isMobile) {
    return (
      <MobileApp title="My Tasks">
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
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
      
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
          todos={currentUserTodos.filter(t => !t.archived)} 
          emptyMessage="No tasks found" 
        />
      )}
      
      {filter === "pending" && (
        <TodoList 
          todos={pendingTodos} 
          emptyMessage="No pending tasks" 
        />
      )}
      
      {filter === "completed" && (
        <TodoList 
          todos={completedTodos} 
          emptyMessage="No completed tasks" 
        />
      )}
    </div>
  );
}
