let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ADD TASK

function addTask() {

    const task = document.getElementById("taskInput").value.trim();
    const subject = document.getElementById("subjectInput").value.trim();
    const date = document.getElementById("dateInput").value;
    const priority = document.getElementById("priorityInput").value;
    const category = document.getElementById("categoryInput").value;

    if (task === "" || subject === "") {
        alert("Please enter the task and subject.");
        return;
    }

    const newTask = {
        task: task,
        subject: subject,
        date: date,
        priority: priority,
        category: category,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    displayTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("dateInput").value = "";

}


// SAVE TASKS

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// DISPLAY TASKS

function displayTasks() {

    const taskList = document.getElementById("taskList");

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const statusFilter =
        document.getElementById("statusFilter").value;

    const priorityFilter =
        document.getElementById("priorityFilter").value;

    taskList.innerHTML = "";

    let visibleTasks = 0;

    tasks.forEach((item, index) => {

        const matchesSearch =
            item.task.toLowerCase().includes(searchText) ||
            item.subject.toLowerCase().includes(searchText);

        const matchesStatus =
            statusFilter === "All" ||
            (statusFilter === "Pending" && !item.completed) ||
            (statusFilter === "Completed" && item.completed);

        const matchesPriority =
            priorityFilter === "All" ||
            item.priority === priorityFilter;

        if (
            !matchesSearch ||
            !matchesStatus ||
            !matchesPriority
        ) {
            return;
        }

        visibleTasks++;

        const taskDiv = document.createElement("div");

        let deadlineMessage = "";

        if (item.date) {

            const today = new Date();
            const deadline = new Date(item.date);

            const difference = deadline - today;

            const daysLeft = Math.ceil(
                difference / (1000 * 60 * 60 * 24)
            );

            if (daysLeft < 0 && !item.completed) {

                deadlineMessage =
                    `<p class="overdue">⚠️ Overdue</p>`;

            } else if (daysLeft <= 2 && !item.completed) {

                deadlineMessage =
                    `<p class="warning">⚠️ Deadline approaching</p>`;

            }
        }


        taskDiv.innerHTML = `

            <h3>
                ${item.completed ? "✅ " : "📌 "}
                ${item.task}
            </h3>

            <p>📚 Subject: ${item.subject}</p>

            <p>📅 Deadline:
                ${item.date || "No deadline"}
            </p>

            <p class="priority ${item.priority.toLowerCase()}">
                🔥 Priority: ${item.priority}
            </p>

            <p class="category">
                ${item.category || "Other"}
            </p>

            ${deadlineMessage}

            <button onclick="completeTask(${index})">
                ${item.completed ? "Completed ✓" : "Complete"}
            </button>

            <button onclick="deleteTask(${index})">
                🗑 Delete
            </button>
        `;

        if (item.completed) {

            taskDiv.style.opacity = "0.65";
            taskDiv.style.textDecoration = "line-through";

        }

        taskList.appendChild(taskDiv);

    });


    document.getElementById("taskCount").innerText =
        visibleTasks +
        (visibleTasks === 1 ? " task" : " tasks");

    document.getElementById("emptyMessage").style.display =
        visibleTasks === 0 ? "block" : "none";

    updateDashboard();
    displayUpcomingTasks();

}


// COMPLETE TASK

function completeTask(index) {

    tasks[index].completed = true;

    saveTasks();

    displayTasks();

}


// DELETE TASK

function deleteTask(index) {

    if (
        confirm("Are you sure you want to delete this task?")
    ) {

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();

    }

}


// DASHBOARD

function updateDashboard() {

    const total = tasks.length;

    const completed =
        tasks.filter(item => item.completed).length;

    const pending = total - completed;

    const high =
        tasks.filter(
            item =>
                item.priority === "High" &&
                !item.completed
        ).length;

    document.getElementById("totalTasks").innerText =
        total;

    document.getElementById("pendingTasks").innerText =
        pending;

    document.getElementById("completedTasks").innerText =
        completed;

    document.getElementById("highTasks").innerText =
        high;

}


// DARK MODE

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "darkMode",
        isDark
    );

    document.getElementById("themeButton").innerText =
        isDark ? "☀️" : "🌙";

}


// LOAD THEME

if (
    localStorage.getItem("darkMode") === "true"
) {

    document.body.classList.add("dark");

    document.getElementById("themeButton").innerText =
        "☀️";

}


// START APPLICATION
function displayUpcomingTasks() {

    const upcomingContainer =
        document.getElementById("upcomingTasks");

    upcomingContainer.innerHTML = "";

    const upcomingTasks = tasks
        .filter(item => item.date && !item.completed)
        .sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        )
        .slice(0, 3);

    if (upcomingTasks.length === 0) {

        upcomingContainer.innerHTML = `
            <div class="no-upcoming">
                🎉 No upcoming deadlines!
            </div>
        `;

        return;
    }

    upcomingTasks.forEach(item => {

        const card = document.createElement("div");

        card.className = "upcoming-card";

        card.innerHTML = `
            <h3>📌 ${item.task}</h3>
            <p>📚 ${item.subject}</p>
            <p>📅 Deadline: ${item.date}</p>
            <p>🔥 ${item.priority} Priority</p>
        `;

        upcomingContainer.appendChild(card);

    });
}
displayTasks();