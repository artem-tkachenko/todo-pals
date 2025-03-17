
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/types/todo";
import { getOtherUsers } from "@/lib/sample-data";
import { AvatarWithStatus } from "../ui/avatar-with-status";

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTodo: (description: string, assignedTo: User, dueDate: Date, priority: string) => void;
}

export function CreateTodoModal({ isOpen, onClose, onCreateTodo }: CreateTodoModalProps) {
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState<User | null>(null);
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [priority, setPriority] = useState<string>("medium");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isUserComboboxOpen, setIsUserComboboxOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  
  const users = getOtherUsers();
  
  const resetForm = () => {
    setDescription("");
    setAssignedTo(null);
    setDueDate(new Date());
    setPriority("medium");
  };
  
  const handleSubmit = () => {
    if (description.trim() && assignedTo && dueDate) {
      onCreateTodo(description, assignedTo, dueDate, priority);
      resetForm();
      onClose();
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const priorityOptions = [
    { value: "low", label: "Low", bgColor: "bg-green-100", textColor: "text-green-600" },
    { value: "medium", label: "Medium", bgColor: "bg-amber-100", textColor: "text-amber-600" },
    { value: "high", label: "High", bgColor: "bg-red-100", textColor: "text-red-600" },
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-xl bg-card">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
          <DialogDescription>
            Assign a new task to a team member
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter task description..."
              className="resize-none min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="assignee" className="text-sm font-medium">
              Assign to
            </label>
            <Popover open={isUserComboboxOpen} onOpenChange={setIsUserComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isUserComboboxOpen}
                  className="w-full justify-between"
                >
                  {assignedTo ? (
                    <div className="flex items-center gap-2">
                      <AvatarWithStatus
                        src={assignedTo.avatarUrl}
                        alt={assignedTo.name}
                        fallback={getInitials(assignedTo.name)}
                        size="sm"
                      />
                      <span>{assignedTo.name}</span>
                    </div>
                  ) : (
                    "Select team member"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search team member..." />
                  <CommandEmpty>No team member found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.name}
                        onSelect={() => {
                          setAssignedTo(user);
                          setIsUserComboboxOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <AvatarWithStatus
                            src={user.avatarUrl}
                            alt={user.name}
                            fallback={getInitials(user.name)}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <span>{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            assignedTo?.id === user.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-sm font-medium">
              Due date
            </label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="dueDate"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setDueDate(date);
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Priority
            </label>
            <Popover open={isPriorityOpen} onOpenChange={setIsPriorityOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="priority"
                  variant={"outline"}
                  className="w-full justify-between"
                >
                  <div className="flex items-center">
                    <span className={cn(
                      "inline-block h-2 w-2 rounded-full mr-2",
                      priority === "low" ? "bg-green-500" :
                      priority === "medium" ? "bg-amber-500" :
                      "bg-red-500"
                    )} />
                    <span className="capitalize">{priority}</span>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandGroup>
                    {priorityOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => {
                          setPriority(option.value);
                          setIsPriorityOpen(false);
                        }}
                      >
                        <div className={cn(
                          "flex items-center gap-2 rounded-full px-2 py-1",
                          option.bgColor, option.textColor
                        )}>
                          <span className="capitalize">{option.label}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            priority === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <DialogFooter className="bg-muted/50 p-6 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!description.trim() || !assignedTo || !dueDate}
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
