let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {

    const task = document.getElementById("taskInput").value;
    const subject = document.getElementById("subjectInput").value;
    const date = document.getElementById("dateInput").value;
    const priority = document.getElementById("priorityInput").value;

    if (task === "" || subject === "") {
        alert("Please enter the task and subject.");
        return;
    }

    const newTask = {
        task: task,
        subject: subject,
        date: date,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("dateInput").value = "";
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const statusFilter = document.getElementById("statusFilter").value;

    taskList.innerHTML = "";

    tasks.forEach((item, index) => {

        const matchesSearch =
            item.task.toLowerCase().includes(searchText) ||
            item.subject.toLowerCase().includes(searchText);

        const matchesStatus =
            statusFilter === "All" ||
            (statusFilter === "Pending" && !item.completed) ||
            (statusFilter === "Completed" && item.completed);

        if (!matchesSearch || !matchesStatus) {
            return;
        }

        const taskDiv = document.createElement("div");
        let deadlineMessage = "";

if (item.date) {

    const today = new Date();
    const deadline = new Date(item.date);

    const difference = deadline - today;
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (daysLeft < 0 && !item.completed) {
        deadlineMessage = `<p class="overdue">⚠️ Overdue</p>`;
    }
    else if (daysLeft <= 2 && !item.completed) {
        deadlineMessage = `<p class="warning">⚠️ Deadline approaching</p>`;
    }
}

        taskDiv.innerHTML = `
    <h3>${item.task}</h3>
    <p>Subject: ${item.subject}</p>
    <p>Deadline: ${item.date}</p>

    <p class="priority ${item.priority.toLowerCase()}">
        Priority: ${item.priority}
    </p>

    ${deadlineMessage}

    <button onclick="completeTask(${index})">
        ${item.completed ? "Completed" : "Complete"}
    </button>

    <button onclick="deleteTask(${index})">
        Delete
    </button>
`;

        if (item.completed) {
            taskDiv.style.textDecoration = "line-through";
        }

        taskList.appendChild(taskDiv);
    });

    updateDashboard();
}

function completeTask(index) {

    tasks[index].completed = true;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

displayTasks();
function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(function(item) {
        return item.completed;
    }).length;

    const pending = total - completed;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("pendingTasks").innerText = pending;
    document.getElementById("completedTasks").innerText = completed;
}