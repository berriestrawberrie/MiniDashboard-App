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

const renderTasks = () =>
  (taskList.innerHTML = tasks
    .map(
      (t) => `
      <div class='task'>
        <label>
          <strong>${t.title}</strong> [${t.priority}]
          <span class="time">${t.createdAt.toLocaleString()}</span>
        </label>
        <button type="button" class="delete" data-id="${t.id}">Delete</button>
      </div>
    `
    )
    .join(''));

taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  const formData = new FormData(taskForm);

  const title = (formData.get('title') as string).trim();

  const priority = formData.get('priority') as 'low' | 'medium' | 'high';

  if (!title) return alert('Task title cannot be empty!');

  tasks.push({
    id: Date.now(),
    title,
    completed: false,
    priority,
    createdAt: new Date(),
  });

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
