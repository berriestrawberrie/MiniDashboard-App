
//DEFINE THE TASK INTERFACE
interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    createdAt: Date;
    category: string;
}

//DECLARE AN EMPTY ARRAY OF TASK OBJECTS
const tasks: Task[] = []; 