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
    `;

    // Add task to the task list
    document.getElementById("taskList").appendChild(taskDiv);

    // Clear the form
    document.getElementById("taskInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("dateInput").value = "";
}