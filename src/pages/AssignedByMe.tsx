
import { AppLayout } from "@/components/layout/AppLayout";
import { TodoList } from "@/components/todo/TodoList";
import { getTodosAssignedByMe } from "@/lib/sample-data";

const AssignedByMe = () => {
  const todos = getTodosAssignedByMe();
  
  return (
    <AppLayout>
      <TodoList 
        todos={todos} 
        type="assignedByMe" 
        className="animate-slide-up"
      />
    </AppLayout>
  );
};

export default AssignedByMe;
