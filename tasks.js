
const taskList = document.getElementById("task-list");

for( let i=0; i< tasks.length;i++){

    //DISPLAY CHECKMARK BASED ON COMPLETED OR NOT
    let complete = tasks[i].completed? 
    `<i class="fa-regular fa-square-check text-2xl"></i>`: 
    `<i class="fa-regular fa-square text-2xl"></i>`
    let li = document.createElement("li");

    //FORMAT THE TASK LIST
    li.innerHTML = `
    <div class="flex justify-center w-fit mx-auto items-center">
        <div>
        <button id="mark${tasks[i].id}" onclick="markComplete(${tasks[i].id})">${complete}</button>
        </div>
        
        <div class="border w-md m-2 p-2">
        <h2 class="font-bold"> ${tasks[i].title}(${tasks[i].priority})</h2>
        <p>${tasks[i].description}</p>
        </div>
    </div>`
    taskList.appendChild(li);

}