var tasks = [];
var taskList = document.getElementById('taskList');
var taskForm = document.getElementById('taskForm');
var renderTasks = function () {
    return (taskList.innerHTML = tasks
        .map(function (t) { return "\n      <div class='task'>\n        <label>\n          <strong>".concat(t.title, "</strong> [").concat(t.priority, "]\n          <span class=\"time\">").concat(t.createdAt.toLocaleString(), "</span>\n        </label>\n      </div>\n    "); })
        .join(''));
};
taskForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload
    var formData = new FormData(taskForm);
    var title = formData.get('title').trim();
    var priority = formData.get('priority');
    if (!title)
        return alert('Task title cannot be empty!');
    tasks.push({
        id: Date.now(),
        title: title,
        completed: false,
        priority: priority,
        createdAt: new Date(),
    });
    taskForm.reset(); // <-- Reset the form 
    renderTasks();
});
document.addEventListener('DOMContentLoaded', renderTasks);
