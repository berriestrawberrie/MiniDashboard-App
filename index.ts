
/*KUNNIKAR CODE HERE------------------------*/
type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
};

let tasks: Task[] = [];

const taskList = document.getElementById('taskList')!;
const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const updateForm = document.getElementById("editDiv") as HTMLFormElement;

const renderTasks = () =>
  {taskList.innerHTML = tasks
    .map(
      (t: Task, index:number) => `
      <div class='task flex justify-between items-center m-3 border rounded-md p-3'>
        <div>
        <button id="${t.id}" onclick="markComplete(${t.id})">${t.completed?    
          `<i class="fa-regular fa-square-check text-2xl"></i>`: 
          `<i class="fa-regular fa-square text-2xl"></i>`}</button>
        </div>
        <label>
          <strong>${t.title}</strong> 
          <span
            class="${t.priority === "low"? "bg-sky-300 p-1 rounded-md": 
              t.priority === "medium"? "bg-yellow-400 p-1 rounded-md": "bg-rose-400 p-1 rounded-md"
            }">
          ${t.priority}
          </span>
          <span class="time">${t.createdAt.toLocaleString()}</span>
        </label>
        <div class="flex">
          <button type="button" class="delete bg-red-400 p-1 rounded-md" data-id="${t.id}">Delete</button>
          <button type="button" onclick="updateTask(${t.id})" class="ms-2 bg-indigo-400 p-1 rounded-md" data-id="${t.id}">Edit</button>
        </div>
      </div>
    `
    )
    .join('');
  console.log(tasks)};

taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  const formData = new FormData(taskForm);

  const title = (formData.get('title') as string).trim();

  const priority = formData.get('priority') as 'low' | 'medium' | 'high';
  const dateString = formData.get('date');

  if (!title) return alert('Task title cannot be empty!');

  if (typeof dateString === 'string') {
    const date = new Date(dateString);
    // Use `date` here
      tasks.push({
    id: Date.now(),
    title,
    completed: false,
    priority,
    createdAt: new Date(dateString),
    });
  } else {
    // Handle the case where 'date' is null or not a string
    throw new Error("Invalid or missing date value in formData.");
  }

  taskForm.reset(); // <-- Reset the form 
  renderTasks();
});

// Delete task
taskList.addEventListener('click', e => {
  const target = e.target as HTMLElement | null;
  if (target && target.classList.contains('delete')) {
    const id = Number(target.dataset.id);
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
  }
});

document.addEventListener('DOMContentLoaded', renderTasks);
/*END OF KUNNIKAR CODE HERE------------------------*/

function markComplete (id:number):void {
    //FIND INDEX OF CONTACT TO MARK COMPLETE
    const index:number = tasks.findIndex(task => task.id === id);

    //IF CONTACT FOUND
    if(index !== -1){
        //CHECK IF TASK IS COMPLETED OR NOT
        if(tasks[index]!.completed){
            //IF COMPLETE MARK REMOVE COMPLETE
            tasks[index]!.completed = false;
            document.getElementById(`${id}`)!.innerHTML = `<i class="fa-regular fa-square text-2xl"></i>`;
            console.log('TASK UPDATE: Complete task marked incomplete');
        }else{
            tasks[index]!.completed = true;
            document.getElementById(`${id}`)!.innerHTML = `<i class="fa-regular fa-square-check text-2xl"></i>`;
            console.log('TASK UPDATE: Incomplete task marked complete');
        }

    }else{
        //ERROR NO MATCH IS FOUND
        console.log('**Error:Completion Failed Task ID does not exist**');
    }
}


const updateTask = (id:number) =>{
    //FIND INDEX OF CONTACT TO EDIT
    const index:number = tasks.findIndex(task => task.id === id);
    //IF CONTACT FOUND
        if(index !== -1){
          //MAKE FORM VISIBLE
          updateForm.classList.remove("hidden");
          updateForm.innerHTML = `
            <form id="editFormData" >
            <input type="number" name="editID" class="hidden" value="${id}">
            <label for="editTitle" id="editTitle">Title: </label><input type="text" name="editTitle" >
            <button type="submit" class="bg-indigo-400 p-2 rounded-md">Update</button>
            </form>`
            const editFormData  = document.getElementById("editFormData")as HTMLFormElement;
            //PROCESS THE UPDATE
            editFormData.addEventListener('submit', (e)=>{
              e.preventDefault(); // Prevent page reload
              const updateData = new FormData(editFormData);
              const title = (updateData.get('editTitle') as string).trim();
              const id = Number(updateData.get('editID'));
              const index = tasks.findIndex(task => task.id === id);
              tasks[index]!.title = title;
              //RE-RENDER THE LIST
              renderTasks();
              //CLOSE THE EDIT FORM
              closeEdit();


});

        }else{
          //ERROR NO MATCH IS FOUND
          console.log('**Error:Edit Failed Task ID does not exist**');
        }


}

const closeEdit = ()=>{
  document.getElementById("editDiv")?.classList.add("hidden")
}
