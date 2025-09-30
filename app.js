// Simulating backend API with localStorage
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to "backend"
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Show input if editing
    if (task.editing) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      li.appendChild(input);

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.onclick = () => {
        tasks[index].text = input.value;
        tasks[index].editing = false;
        saveTasks();
        renderTasks();
      };
      li.appendChild(saveBtn);
    } else {
      li.textContent = task.text;
    }

    // Actions
    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      tasks[index].editing = true;
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => {
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
}

// Handle new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask) {
    tasks.push({ text: newTask, editing: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Initial render
renderTasks();
