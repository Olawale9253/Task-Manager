"use strict";

// Simulating backend API with localStorage
var taskForm = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Save to "backend"

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
} // Render tasks


function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    var li = document.createElement("li"); // Show input if editing

    if (task.editing) {
      var input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      li.appendChild(input);
      var saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";

      saveBtn.onclick = function () {
        tasks[index].text = input.value;
        tasks[index].editing = false;
        saveTasks();
        renderTasks();
      };

      li.appendChild(saveBtn);
    } else {
      li.textContent = task.text;
    } // Actions


    var actions = document.createElement("div");
    actions.className = "actions";
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function () {
      tasks[index].editing = true;
      renderTasks();
    };

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    deleteBtn.onclick = function () {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    };

    if (!task.editing) {
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
    }

    li.appendChild(actions);
    taskList.appendChild(li);
  });
} // Handle new task


taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var newTask = taskInput.value.trim();

  if (newTask) {
    tasks.push({
      text: newTask,
      editing: false
    });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}); // Initial render

renderTasks();
//# sourceMappingURL=app.dev.js.map
