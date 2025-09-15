var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var tasks = [];
var taskList = document.getElementById('taskList');
var taskForm = document.getElementById('taskForm');
var updateForm = document.getElementById("editDiv");
var renderTasks = function () {
    taskList.innerHTML = tasks
        .map(function (t, index) { return "\n      <div class='task m-3 border bg-white rounded-md p-3'>\n        <div class=\"flex justify-between items-center\">\n            <div>\n            <button id=\"".concat(t.id, "\" onclick=\"markComplete(").concat(t.id, ")\">").concat(t.completed ?
        "<i class=\"fa-regular fa-square-check text-2xl\"></i>" :
        "<i class=\"fa-regular fa-square text-2xl\"></i>", "</button>\n            </div>\n            <label>\n              <strong>").concat(t.title, "</strong> \n              <span\n                class=\"").concat(t.priority === "low" ? "bg-sky-300 p-1 rounded-md" :
        t.priority === "medium" ? "bg-yellow-400 p-1 rounded-md" : "bg-rose-400 p-1 rounded-md", "\">\n              ").concat(t.priority, "\n              </span>\n              <span>\n              ").concat(t.category, "\n              </span>\n              <span class=\"time\">").concat(t.createdAt.toLocaleString(), "</span>\n            </label>\n            <div class=\"flex\">\n              <button type=\"button\" class=\"delete bg-red-400 p-1 rounded-md\" data-id=\"").concat(t.id, "\">Delete</button>\n              <button type=\"button\" onclick=\"updateTask(").concat(t.id, ",'").concat(t.title, "','").concat(t.description, "');\" class=\"ms-2 bg-indigo-400 p-1 rounded-md\" data-id=\"").concat(t.id, "\">Edit</button>\n            </div>\n        </div>\n        <div class=\"border border-gray-300 rounded-md m-2 p-2\">\n            <p>").concat(t.description, "</p>\n        </div>\n      </div>\n    "); })
        .join('');
    console.log(tasks);
};
taskForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload
    var formData = new FormData(taskForm);
    var title = formData.get('title').trim();
    var desc = formData.get('desc').trim();
    var priority = formData.get('priority');
    var category = formData.get('category');
    var dateString = formData.get('date');
    if (!title)
        return alert('Task title cannot be empty!');
    if (typeof dateString === 'string') {
        tasks.push({
            id: Date.now(),
            title: title,
            description: desc ? desc : "",
            completed: false,
            priority: priority,
            createdAt: new Date(),
            category: category,
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
/*END OF KUNNIKAR CODE ADD & DELETE FUNCTIONS HERE------------------------*/
/*START OF BROOKE CODE ADD & DELETE FUNCTIONS HERE------------------------*/
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
var updateTask = function (id, title, desc) {
    //FIND INDEX OF CONTACT TO EDIT
    var index = tasks.findIndex(function (task) { return task.id === id; });
    //IF CONTACT FOUND
    if (index !== -1) {
        //GENERATE THE UPDATE FORM 
        updateForm.classList.remove("hidden");
        updateForm.innerHTML = "\n          <button onclick=\"closeEdit()\"><i class=\"fa-solid fa-circle-xmark text-left text-2xl text-red-500\"></i></button>\n            <form id=\"editFormData\" >\n            <h2 class=\"font-bold text-lg\">Edit Task: ".concat(title, "</h2>\n            <input type=\"number\" name=\"editID\" class=\"hidden\" value=\"").concat(id, "\">\n            <fieldset>\n            <label for=\"editTitle\" id=\"editTitle\">Title: </label><input type=\"text\" name=\"editTitle\" >\n            <select name=\"editPriority\">\n              <option value=\"\" disabled selected>Select Priority</option>\n              <option value=\"low\">Low</option>\n              <option value=\"medium\">Medium</option>\n              <option value=\"high\">High</option>\n            </select>\n            <select name=\"editCategory\">\n            <option value=\"\" disabled selected>Category</option>\n            <option>work</option>\n            <option>personal</option>\n            <option>school</option>\n            </select>\n            <input type=\"date\"name=\"editDate\">\n            </fieldset>\n            <fieldset class=\"my-2\">\n              <textarea name=\"descEdit\" class=\"w-full rounded-sm border border-gray-300 p-1\" placeholder=\"").concat(desc, "\"></textarea>\n            </fieldset>\n            <fieldset class=\"flex justify-end\">\n            <button type=\"submit\" class=\"bg-indigo-400 p-2 rounded-md\">Update</button>\n            </fieldset>\n            </form>");
        var editFormData_1 = document.getElementById("editFormData");
        //PROCESS THE UPDATE
        editFormData_1.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page reload
            var updateData = new FormData(editFormData_1);
            var title = updateData.get('editTitle').trim();
            var description = updateData.get('descEdit').trim();
            var priority = updateData.get('editPriority');
            var category = updateData.get('editCategory');
            var id = Number(updateData.get('editID'));
            var dateString = updateData.get('editDate');
            //FIND THE INDEX OF THE TASK TO UPDATE
            var index = tasks.findIndex(function (task) { return task.id === id; });
            //APPLY UPDATES ONLY TO CHANGED VALUES
            if (title) {
                tasks[index].title = title;
            }
            if (description) {
                tasks[index].description = description;
            }
            if (priority) {
                tasks[index].priority = priority;
            }
            if (category) {
                tasks[index].category = category;
            }
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
/*END OF BROOKE CODE ADD & DELETE FUNCTIONS HERE------------------------*/
var quoteReturn = document.getElementById("quote-return");
//Quote API Start
var fetchQuoteBy = function () {
    fetch('https://api.adviceslip.com/advice')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        quoteReturn.innerText = data.slip.advice;
        console.log(data);
    })
        .catch(function (error) {
        console.error('Error fetching advice: , error');
    });
};
var delayAPI = function (callback) {
    //DISPLAY WAIT MESSAGE
    quoteReturn.innerText = "loading...";
    //WAIT 2SEC THEN DO API CALL
    setTimeout(function () {
        callback();
    }, 2000);
};
(_a = document.getElementById("quote")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    delayAPI(fetchQuoteBy);
});
//fetchQuoteBy();
// --- Weather API ---
function fetchWeather() {
    return __awaiter(this, arguments, void 0, function (city) {
        var res, _a;
        if (city === void 0) { city = 'Stockholm'; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://wttr.in/".concat(city, "?format=3"))];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.text()];
                case 2: return [2 /*return*/, _b.sent()];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, '⚠️ Weather unavailable'];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// --- Initialize ---
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var cityInput, weatherText, getWeatherBtn, defaultCity, _a, _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    cityInput = document.getElementById('cityInput');
                    weatherText = document.getElementById('weather');
                    getWeatherBtn = document.getElementById('getWeather');
                    defaultCity = cityInput.value.trim() || 'Stockholm';
                    _a = weatherText;
                    _b = '📍 ';
                    return [4 /*yield*/, fetchWeather(defaultCity)];
                case 1:
                    _a.textContent = _b + (_c.sent());
                    getWeatherBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        var city, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    city = cityInput.value.trim();
                                    if (!city)
                                        return [2 /*return*/, alert('Please enter a city!')];
                                    _a = weatherText;
                                    _b = '📍 ';
                                    return [4 /*yield*/, fetchWeather(city)];
                                case 1:
                                    _a.textContent = _b + (_c.sent());
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
// --- DOM Events ---
document.addEventListener('DOMContentLoaded', function () {
    init();
});
