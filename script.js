function addTask() {

    // Get values from the form
    const task = document.getElementById("taskInput").value;
    const subject = document.getElementById("subjectInput").value;
    const date = document.getElementById("dateInput").value;
    const priority = document.getElementById("priorityInput").value;

    // Check if task and subject are entered
    if (task === "" || subject === "") {
        alert("Please enter the task and subject.");
        return;
    }

    // Create a new task element
    const taskDiv = document.createElement("div");

    taskDiv.innerHTML = `
    <h3>${task}</h3>
    <p>Subject: ${subject}</p>
    <p>Deadline: ${date}</p>
    <p>Priority: ${priority}</p>

    <button onclick="completeTask(this)">Complete</button>
    <button onclick="deleteTask(this)">Delete</button>
`;

    // Add task to the task list
    document.getElementById("taskList").appendChild(taskDiv);

    function completeTask(button) {

    const taskDiv = button.parentElement;

    taskDiv.style.textDecoration = "line-through";

    button.disabled = true;
    button.innerText = "Completed";

    function deleteTask(button) {

    const taskDiv = button.parentElement;

    taskDiv.remove();
}
}

    // Clear the form
    document.getElementById("taskInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("dateInput").value = "";
}