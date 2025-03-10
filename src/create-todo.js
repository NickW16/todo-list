export function openProject(index, myProjects) {
    const project = myProjects[index];
    const mainContent = document.getElementById("main-content");

    // Clear previous content before loading the new project
    mainContent.innerHTML = `<h2>${project.name}</h2>
                             <ul id="task-list"></ul>`;

    const taskList = document.getElementById("task-list");

    // Clear out any previous tasks and re-render them
    taskList.innerHTML = '';

    // Render each task in the project
    project.tasks.forEach((task, i) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item'); // Apply CSS class

        // Ensure checklist is an array
        const checklist = Array.isArray(task.checklist) ? task.checklist : [];

        // Render task details
        taskItem.innerHTML = `
            <strong>Title:</strong> ${task.title}<br>
            <strong>Description:</strong> ${task.description}<br>
            <strong>Due Date:</strong> ${task.dueDate}<br>
            <strong>Priority:</strong> ${task.priority}<br>
            <strong>Notes:</strong> ${task.notes}<br>
            <strong>Checklist:</strong> ${checklist.join(', ')}
        `;

        taskList.appendChild(taskItem);
    });

    // Add input fields for new tasks
    const addTaskDiv = document.createElement('div');
    addTaskDiv.classList.add('add-task-div');

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "New Task";
    addTaskDiv.appendChild(titleInput);

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Task Description";
    addTaskDiv.appendChild(descriptionInput);

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    addTaskDiv.appendChild(dueDateInput);

    const priorityInput = document.createElement("select");
    const priorityOptions = ["Low", "Medium", "High"];
    priorityOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        priorityInput.appendChild(optionElement);
    });
    addTaskDiv.appendChild(priorityInput);

    const notesInput = document.createElement("input");
    notesInput.type = "text";
    notesInput.placeholder = "Notes";
    addTaskDiv.appendChild(notesInput);

    const checklistInput = document.createElement("input");
    checklistInput.type = "text";
    checklistInput.placeholder = "Checklist Items (comma separated)";
    addTaskDiv.appendChild(checklistInput);

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add Task";
    addTaskDiv.appendChild(addTaskButton);

    addTaskButton.addEventListener("click", () => {
        if (titleInput.value.trim() && descriptionInput.value.trim()) { // Ensure some data is entered
            const newTask = {
                title: titleInput.value.trim(),
                description: descriptionInput.value.trim(),
                dueDate: dueDateInput.value,
                priority: priorityInput.value,
                notes: notesInput.value.trim(),
                checklist: checklistInput.value.trim().split(',').map(item => item.trim()) // Ensure the checklist is always an array
            };

            project.tasks.push(newTask); // Add the new task to the project
            openProject(index, myProjects); // Refresh the project view with the new task
        }
    });

    mainContent.appendChild(addTaskDiv);
}