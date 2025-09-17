

/*KUNNIKAR CODE ADD & DELETE FUNCTIONS HERE------------------------*/
type Task = {
  id: number;
  title: string;
  description?: string,
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  category: 'work' | 'personal' | 'school';
};

let tasks: Task[] = [];

const taskList = document.getElementById('taskList')as HTMLFormElement;
const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const updateForm = document.getElementById("editDiv") as HTMLFormElement;

const renderTasks = () =>
  {taskList.innerHTML = tasks
    .map(
      (t: Task, index:number) => `
      <div class='task m-3 border bg-white rounded-md p-3'>
        <div class="flex justify-between items-center">
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
              <span>
              ${t.category}
              </span>
              <span class="time">${t.createdAt.toLocaleString()}</span>
            </label>
            <div class="flex">
              <button type="button" class="delete bg-red-400 p-1 rounded-md" data-id="${t.id}">Delete</button>
              <button type="button" onclick="updateTask(${t.id},'${t.title}','${t.description}');" class="ms-2 bg-indigo-400 p-1 rounded-md" data-id="${t.id}">Edit</button>
            </div>
        </div>
        <div class="border border-gray-300 rounded-md m-2 p-2">
            <p>${t.description}</p>
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
  const desc = (formData.get('desc') as string).trim();

  const priority = formData.get('priority') as 'low' | 'medium' | 'high';
  const category = formData.get('category') as 'work' | 'personal' | 'school';
  const dateString = formData.get('date');

  if (!title) return alert('Task title cannot be empty!');

  if (typeof dateString === 'string') {
    const date = new Date(dateString);
  

    tasks.push({
    id: Date.now(),
    title: title,
    description: desc? desc : "",
    completed: false,
    priority: priority,
    createdAt: new Date(dateString),
    category: category,
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
/*END OF KUNNIKAR CODE ADD & DELETE FUNCTIONS HERE------------------------*/

/*START OF BROOKE CODE ADD & DELETE FUNCTIONS HERE------------------------*/
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


const updateTask = (id:number,title:string, desc: string):void =>{
    //FIND INDEX OF CONTACT TO EDIT
    const index:number = tasks.findIndex(task => task.id === id);
    //IF CONTACT FOUND
        if(index !== -1){
          //GENERATE THE UPDATE FORM 
          updateForm.classList.remove("hidden");
          updateForm.innerHTML = `
          <button onclick="closeEdit()"><i class="fa-solid fa-circle-xmark text-left text-2xl text-red-500"></i></button>
            <form id="editFormData" >
            <h2 class="font-bold text-lg">Edit Task: ${title}</h2>
            <input type="number" name="editID" class="hidden" value="${id}">
            <fieldset>
            <label for="editTitle" id="editTitle">Title: </label><input type="text" name="editTitle" >
            <select name="editPriority">
              <option value="" disabled selected>Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select name="editCategory">
            <option value="" disabled selected>Category</option>
            <option>work</option>
            <option>personal</option>
            <option>school</option>
            </select>
            <input type="date"name="editDate">
            </fieldset>
            <fieldset class="my-2">
              <textarea name="descEdit" class="w-full rounded-sm border border-gray-300 p-1" placeholder="${desc}"></textarea>
            </fieldset>
            <fieldset class="flex justify-end">
            <button type="submit" class="bg-indigo-400 p-2 rounded-md">Update</button>
            </fieldset>
            </form>`
            const editFormData  = document.getElementById("editFormData")as HTMLFormElement;
            //PROCESS THE UPDATE
            editFormData.addEventListener('submit', (e)=>{
              e.preventDefault(); // Prevent page reload
              const updateData = new FormData(editFormData);
              const title = (updateData.get('editTitle') as string).trim();
              const description= (updateData.get('descEdit') as string).trim();
              const priority = updateData.get('editPriority') as 'low' | 'medium' | 'high';
              const category = updateData.get('editCategory') as 'work' | 'personal' | 'school';
              const id = Number(updateData.get('editID'));
              const dateString = updateData.get('editDate');
              //FIND THE INDEX OF THE TASK TO UPDATE
              const index = tasks.findIndex(task => task.id === id);
              //APPLY UPDATES ONLY TO CHANGED VALUES
              if(title){tasks[index]!.title = title;}
              if(description){tasks[index]!.description = description;}
              if(priority){tasks[index]!.priority = priority;}
              if(category){tasks[index]!.category = category;}
              
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
/*END OF BROOKE CODE ADD & DELETE FUNCTIONS HERE------------------------*/

const quoteReturn = document.getElementById("quote-return")!;
//TYPE THE RESPONSE & QUOTE FUNCTION
type AdviceResponse = {
    slip:{
        id:number;
        advice:string;
    }
}
type QuoteFunction = ()=>void;

//Quote API Start
const fetchQuoteBy = ():void => {
    fetch('https://api.adviceslip.com/advice')
    .then((response: Response) => response.json() as Promise<AdviceResponse>)
    .then((data: AdviceResponse)=>{
       quoteReturn.innerText = data.slip.advice;
        console.log(data);
    })
    .catch((error:unknown)=>{
        console.error('Error fetching advice: , error');
    });
}

const delayAPI = (callback: QuoteFunction) =>{
    //DISPLAY WAIT MESSAGE
    quoteReturn.innerText = "loading..."
    //WAIT 2SEC THEN DO API CALL
    setTimeout(()=>{
       callback(); 
    },2000);
}


document.getElementById("quote")?.addEventListener("click",()=>{
  delayAPI(fetchQuoteBy);
});
//fetchQuoteBy();

// --- Weather API ---
async function fetchWeather(city: string = 'Stockholm'): Promise<string> {
  try {
    const res = await fetch(`https://wttr.in/${city}?format=3`);
    return await res.text();
  } catch {
    return '⚠️ Weather unavailable';
  }
}

// --- Initialize ---
async function init() {
  const cityInput = document.getElementById('cityInput') as HTMLInputElement;
  const weatherText = document.getElementById('weather')!;
  const getWeatherBtn = document.getElementById('getWeather')!;

  const defaultCity = cityInput.value.trim() || 'Stockholm';
  weatherText.textContent = '📍 ' + (await fetchWeather(defaultCity));

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return alert('Please enter a city!');
    weatherText.textContent = '📍 ' + (await fetchWeather(city));
  });
}

// --- DOM Events ---
document.addEventListener('DOMContentLoaded', () => {
  init();
});


