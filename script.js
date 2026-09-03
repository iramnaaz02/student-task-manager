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

    taskList.innerHTML = "";

    tasks.forEach((item, index) => {

        const taskDiv = document.createElement("div");

        taskDiv.innerHTML = `
            <h3>${item.task}</h3>
            <p>Subject: ${item.subject}</p>
            <p>Deadline: ${item.date}</p>
            <p>Priority: ${item.priority}</p>

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