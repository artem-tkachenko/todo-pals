
import { AppLayout } from "@/components/layout/AppLayout";
import { TodoList } from "@/components/todo/TodoList";
import { getArchivedTodos } from "@/lib/sample-data";

const Archived = () => {
  const todos = getArchivedTodos();
  
  return (
    <AppLayout>
      <TodoList 
        todos={todos} 
        type="archived" 
        className="animate-slide-up"
      />
    </AppLayout>
  );
};

export default Archived;
