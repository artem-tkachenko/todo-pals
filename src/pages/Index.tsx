
import { AppLayout } from "@/components/layout/AppLayout";
import { TodoList } from "@/components/todo/TodoList";
import { getTodosAssignedToMe } from "@/lib/sample-data";

const Index = () => {
  const todos = getTodosAssignedToMe();
  
  return (
    <AppLayout>
      <TodoList 
        todos={todos} 
        type="assignedToMe" 
        className="animate-slide-up"
      />
    </AppLayout>
  );
};

export default Index;
