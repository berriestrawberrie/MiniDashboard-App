


//DECLARE AN EMPTY ARRAY OF TASK OBJECTS
var tasks = [
    {
        id: 0,
        title: "Eat Dinner",
        description: "Have dinner at 6pm.",
        completed: false,
        priority: "high",
        createdAt: new Date(),
        category: "Daily",
    },
    {
        id: 1,
        title: "Take a Break",
        description: "Get up move or stretch",
        completed: true,
        priority: "medium",
        createdAt: new Date(),
        category: "Hourly",
    }
];
function markComplete(id) {
    //FIND INDEX OF CONTACT TO MARK COMPLETE
    var index = tasks.findIndex(function (task) { return task.id === id; });
    //IF CONTACT FOUND
    if (index !== -1) {
        //CHECK IF TASK IS COMPLETED OR NOT
        if (tasks[index].completed) {
            //IF COMPLETE MARK REMOVE COMPLETE
            tasks[index].completed = false;
            console.log('TASK UPDATE: Complete task marked incomplete'+`mark${index}`);
            document.getElementById(`mark${index}`).innerHTML = `<i class="fa-regular fa-square text-2xl"></i>`
        }
        else {
            tasks[index].completed = true;
            console.log('TASK UPDATE: Incomplete task marked complete'+`mark${index}`);
            document.getElementById(`mark${index}`).innerHTML = `<i class="fa-regular fa-square-check text-2xl"></i>`
        }
    }
    else {
        //ERROR NO MATCH IS FOUND
        console.log('**Error: Task ID does not exist**');
    }
}

