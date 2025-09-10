var tasks = [];
var taskList = document.getElementById('taskList');
var taskForm = document.getElementById('taskForm');
var renderTasks = function () {
    return (taskList.innerHTML = tasks
        .map(function (t) { return "\n      <div class='task'>\n        <label>\n          <strong>".concat(t.title, "</strong> [").concat(t.priority, "]\n          <span class=\"time\">").concat(t.createdAt.toLocaleString(), "</span>\n        </label>\n        <button type=\"button\" class=\"delete\" data-id=\"").concat(t.id, "\">Delete</button>\n      </div>\n    "); })
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
// Delete task
taskList.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target.classList.contains('delete')) {
        var id_1 = Number(target.dataset.id);
        tasks = tasks.filter(function (t) { return t.id !== id_1; });
        renderTasks();
    }
});
document.addEventListener('DOMContentLoaded', renderTasks);
