
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
const tasks: Task[] = [
    {
    id: 1,
    title: "Eat Dinner",
    description: "Have dinner at 6pm.",
    completed: false,
    priority:  "high",
    createdAt: new Date(),
    category: "Daily",
},
{
    id: 2,
    title: "Take a Break",
    description: "Get up move or stretch",
    completed: true,
    priority:  "medium",
    createdAt: new Date(),
    category: "Hourly",
}
]; 

function markComplete (id:number) {
    //FIND INDEX OF CONTACT TO MARK COMPLETE
    const index:number = tasks.findIndex(task => task.id === id);

    //IF CONTACT FOUND
    if(index !== -1){
        //CHECK IF TASK IS COMPLETED OR NOT
        if(tasks[index]!.completed){
            //IF COMPLETE MARK REMOVE COMPLETE
            tasks[index]!.completed = false;
            console.log('TASK UPDATE: Complete task marked incomplete');
        }else{
            tasks[index]!.completed = true;
            console.log('TASK UPDATE: Incomplete task marked complete');
        }

    }else{
        //ERROR NO MATCH IS FOUND
        console.log('**Error: Task ID does not exist**');
    }
}
console.log(tasks);
markComplete(2);
console.log(tasks);