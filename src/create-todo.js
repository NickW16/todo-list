export function openProject(index, myProjects) {
    const project = myProjects[index];
    const mainContent = document.getElementById("main-content");

    // clear previous content before rendering new project
    mainContent.innerHTML = `<h2>${project.name}</h2>
                             <ul id="task-list"></ul>`;

    const taskList = document.getElementById("task-list");

    // clear and re-render
    taskList.innerHTML = '';

    // render each task
    project.tasks.forEach((task, i) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        // ensure checklist is an array
        const checklist = Array.isArray(task.checklist) ? task.checklist : [];

        // render task details
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

    // dialog creation
    const addTaskDialog = document.createElement("dialog");
    addTaskDialog.classList.add("add-task-dialog");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "New Task";
    addTaskDialog.appendChild(titleInput);

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Task Description";
    addTaskDialog.appendChild(descriptionInput);

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    addTaskDialog.appendChild(dueDateInput);

    const priorityInput = document.createElement("select");
    const priorityOptions = ["Low", "Medium", "High"];
    priorityOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        priorityInput.appendChild(optionElement);
    });
    addTaskDialog.appendChild(priorityInput);

    const notesInput = document.createElement("input");
    notesInput.type = "text";
    notesInput.placeholder = "Notes";
    addTaskDialog.appendChild(notesInput);

    const checklistInput = document.createElement("input");
    checklistInput.type = "text";
    checklistInput.placeholder = "Checklist Items (comma separated)";
    addTaskDialog.appendChild(checklistInput);

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add Task";
    addTaskDialog.appendChild(addTaskButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    addTaskDialog.appendChild(cancelButton);

    // append to main content
    mainContent.appendChild(addTaskDialog);

    // event listener to add tasks
    addTaskButton.addEventListener("click", () => {
        if (titleInput.value.trim() && descriptionInput.value.trim()) { 
            const newTask = {
                title: titleInput.value.trim(),
                description: descriptionInput.value.trim(),
                dueDate: dueDateInput.value,
                priority: priorityInput.value,
                notes: notesInput.value.trim(),
                checklist: checklistInput.value.trim().split(',').map(item => item.trim()) 
            };

            project.tasks.push(newTask); // add new task to project
            addTaskDialog.close(); // close dialog screen
            openProject(index, myProjects); // refresh the project view with the new task added
        }
    });

    //close dialog on cancel
    cancelButton.addEventListener("click", () => {
        addTaskDialog.close();
    });

    // add button to open the task dialog
    const openAddTask = document.createElement("button");
    openAddTask.classList.add('open-add-task');
    openAddTask.textContent = "Add Task";
    mainContent.appendChild(openAddTask);

    // open dialog when button is clicked
    openAddTask.addEventListener("click", () => {
        addTaskDialog.showModal(); // opens modal
    });
}
