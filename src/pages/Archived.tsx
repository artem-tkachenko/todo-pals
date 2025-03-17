
import { MobileApp } from "@/components/layout/MobileApp";
import { TodoList } from "@/components/todo/TodoList";
import { useIsMobile } from "@/hooks/use-mobile";
import { getArchivedTodos } from "@/lib/sample-data";

export default function Archived() {
  const isMobile = useIsMobile();
  const archivedTodos = getArchivedTodos();

  if (isMobile) {
    return (
      <MobileApp title="Archived Tasks">
        <TodoList 
          todos={archivedTodos} 
          emptyMessage="No archived tasks found" 
        />
      </MobileApp>
    );
  }

  // Desktop fallback
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Archived Tasks</h1>
      <TodoList todos={archivedTodos} emptyMessage="No archived tasks found" />
    </div>
  );
}
