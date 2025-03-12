export function openProject(index, myProjects) {
    const project = myProjects[index];
    const mainContent = document.getElementById("main-content");

    // clear previous content before rendering new project
    mainContent.innerHTML = `<h1 id ="task-page-project-title">${project.name}</h1>
                             <div id="task-list"></div>`;

    const taskList = document.getElementById("task-list");

    // clear and re-render
    taskList.innerHTML = '';

    // render each task
    project.tasks.forEach((task, i) => {
        // task header with a dropdown, dropdown is lower in the code
        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');
        taskHeader.innerHTML = `<h2>${task.title}</h2>`;

        const taskHeaderToggle = document.createElement('button');
        taskHeaderToggle.classList.add('task-header-toggle');
        taskHeaderToggle.textContent = '▼ Show';
        taskHeader.appendChild(taskHeaderToggle);
        

        // below goes the task display
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.style.visibility = 'hidden';

        const taskTitle = document.createElement('div');
        taskTitle.textContent = `Title: ${task.title}`;
        taskItem.appendChild(taskTitle);

        const taskDescription = document.createElement('div');
        taskDescription.textContent = `Description: ${task.description}`;
        taskItem.appendChild(taskDescription);

        const taskDueDate = document.createElement('div');
        taskDueDate.textContent = `Due Date: ${task.dueDate}`;
        taskItem.appendChild(taskDueDate);

        const taskPriority = document.createElement('div');
        taskPriority.textContent = `Priority: ${task.priority}`;
        taskItem.appendChild(taskPriority);

        const taskNotes = document.createElement('div');
        taskNotes.textContent = `Notes: ${task.notes}`;
        taskItem.appendChild(taskNotes);

        // button for deleting each task
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.textContent = 'Delete Task';
        deleteTaskButton.addEventListener('click', () => {
            const isConfirmed = confirm(`Are you sure you want to delete ${task.title}?`);
            if (isConfirmed) {    
                project.tasks.splice(i, 1); // remove from array
                openProject(index, myProjects); // Re-render without the deleted task
            }
        });

        taskItem.appendChild(deleteTaskButton); // append to task div

        // this is the dropdown code !!!
        taskItem.style.maxHeight = "0";
        taskItem.style.overflow = "hidden";
        taskItem.style.transition = "max-height 0.3s ease-out";
        
        // dropdown toggle
        taskHeaderToggle.addEventListener('click', () => {
            if (taskItem.style.maxHeight === "0px") {
                taskItem.style.maxHeight = taskItem.scrollHeight + "px";
                taskHeaderToggle.textContent = '▲ Hide';
                taskItem.style.visibility = 'visible';
            } else {
                taskItem.style.maxHeight = "0px";
                taskHeaderToggle.textContent = '▼ Show';
                taskItem.style.visibility = 'hidden';
            }
        });

        // weird, but it works
        taskList.appendChild(taskHeader); // appends to main container
        taskList.appendChild(taskItem); // appends to header

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
