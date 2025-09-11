var tasks = [];
var taskList = document.getElementById('taskList');
var taskForm = document.getElementById('taskForm');
var updateForm = document.getElementById("editDiv");
var renderTasks = function () {
    taskList.innerHTML = tasks
        .map(function (t, index) { return "\n      <div class='task flex justify-between items-center m-3 border rounded-md p-3'>\n        <div>\n        <button id=\"".concat(t.id, "\" onclick=\"markComplete(").concat(t.id, ")\">").concat(t.completed ?
        "<i class=\"fa-regular fa-square-check text-2xl\"></i>" :
        "<i class=\"fa-regular fa-square text-2xl\"></i>", "</button>\n        </div>\n        <label>\n          <strong>").concat(t.title, "</strong> \n          <span\n            class=\"").concat(t.priority === "low" ? "bg-sky-300 p-1 rounded-md" :
        t.priority === "medium" ? "bg-yellow-400 p-1 rounded-md" : "bg-rose-400 p-1 rounded-md", "\">\n          ").concat(t.priority, "\n          </span>\n          <span class=\"time\">").concat(t.createdAt.toLocaleString(), "</span>\n        </label>\n        <div class=\"flex\">\n          <button type=\"button\" class=\"delete bg-red-400 p-1 rounded-md\" data-id=\"").concat(t.id, "\">Delete</button>\n          <button type=\"button\" onclick=\"updateTask(").concat(t.id, ")\" class=\"ms-2 bg-indigo-400 p-1 rounded-md\" data-id=\"").concat(t.id, "\">Edit</button>\n        </div>\n      </div>\n    "); })
        .join('');
    console.log(tasks);
};
taskForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload
    var formData = new FormData(taskForm);
    var title = formData.get('title').trim();
    var priority = formData.get('priority');
    var dateString = formData.get('date');
    if (!title)
        return alert('Task title cannot be empty!');
    if (typeof dateString === 'string') {
        var date = new Date(dateString);
        // Use `date` here
        tasks.push({
            id: Date.now(),
            title: title,
            completed: false,
            priority: priority,
            createdAt: new Date(dateString),
        });
    }
    else {
        // Handle the case where 'date' is null or not a string
        throw new Error("Invalid or missing date value in formData.");
    }
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
/*END OF KUNNIKAR CODE HERE------------------------*/
function markComplete(id) {
    //FIND INDEX OF CONTACT TO MARK COMPLETE
    var index = tasks.findIndex(function (task) { return task.id === id; });
    //IF CONTACT FOUND
    if (index !== -1) {
        //CHECK IF TASK IS COMPLETED OR NOT
        if (tasks[index].completed) {
            //IF COMPLETE MARK REMOVE COMPLETE
            tasks[index].completed = false;
            document.getElementById("".concat(id)).innerHTML = "<i class=\"fa-regular fa-square text-2xl\"></i>";
            console.log('TASK UPDATE: Complete task marked incomplete');
        }
        else {
            tasks[index].completed = true;
            document.getElementById("".concat(id)).innerHTML = "<i class=\"fa-regular fa-square-check text-2xl\"></i>";
            console.log('TASK UPDATE: Incomplete task marked complete');
        }
    }
    else {
        //ERROR NO MATCH IS FOUND
        console.log('**Error:Completion Failed Task ID does not exist**');
    }
}
var updateTask = function (id) {
    //FIND INDEX OF CONTACT TO EDIT
    var index = tasks.findIndex(function (task) { return task.id === id; });
    //IF CONTACT FOUND
    if (index !== -1) {
        //MAKE FORM VISIBLE
        updateForm.classList.remove("hidden");
        updateForm.innerHTML = "\n            <form id=\"editFormData\" >\n            <input type=\"number\" name=\"editID\" class=\"hidden\" value=\"".concat(id, "\">\n            <label for=\"editTitle\" id=\"editTitle\">Title: </label><input type=\"text\" name=\"editTitle\" >\n            <button type=\"submit\" class=\"bg-indigo-400 p-2 rounded-md\">Update</button>\n            </form>");
        var editFormData_1 = document.getElementById("editFormData");
        //PROCESS THE UPDATE
        editFormData_1.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page reload
            var updateData = new FormData(editFormData_1);
            var title = updateData.get('editTitle').trim();
            var id = Number(updateData.get('editID'));
            var index = tasks.findIndex(function (task) { return task.id === id; });
            tasks[index].title = title;
            //RE-RENDER THE LIST
            renderTasks();
            //CLOSE THE EDIT FORM
            closeEdit();
        });
    }
    else {
        //ERROR NO MATCH IS FOUND
        console.log('**Error:Edit Failed Task ID does not exist**');
    }
};
var closeEdit = function () {
    var _a;
    (_a = document.getElementById("editDiv")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
};
