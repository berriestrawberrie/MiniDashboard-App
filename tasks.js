const tasks = [
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
const taskList = document.getElementById("task-list");

for( let i=0; i< tasks.length;i++){

    let li = document.createElement("li");

    li.innerHTML = `
    <div><h2>${tasks[i].title}(${tasks[i].priority})</h2>
    <p>${tasks[i].description}</p>
    </div>`
    taskList.appendChild(li);

}