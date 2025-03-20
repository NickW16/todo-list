export function openProject(index, myProjects) {
    const project = myProjects[index];
    const mainContent = document.getElementById("main-content");

    // clear previous content before rendering new project
    mainContent.innerHTML = `<h1 id ="task-page-project-title">${project.name}</h1>
                             <div id="task-list"></div>`; // project title and header


    const taskList = document.getElementById("task-list");

    // clear and re-render
    taskList.innerHTML = '';

    // render each task
    project.tasks.forEach((task, i) => {
        // task header with a dropdown, dropdown is lower in the code
        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');
        taskHeader.innerHTML = `<h2 class="task-header-title">${task.title}</h2>`;

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
        taskTitle.classList.add('task-content');
        taskTitle.id = 'task-title';
        taskItem.appendChild(taskTitle);

        const taskPriority = document.createElement('div');
        taskPriority.textContent = `Priority: ${task.priority}`;
        taskPriority.classList.add('task-content');
        taskPriority.id = 'task-priority';
        taskItem.appendChild(taskPriority);

        const taskDueDate = document.createElement('div');
        taskDueDate.textContent = `Due Date: ${task.dueDate}`;
        taskDueDate.classList.add('task-content');
        taskDueDate.id = 'task-due-date';
        taskItem.appendChild(taskDueDate);

        const taskDescription = document.createElement('div');
        taskDescription.textContent = `Description: ${task.description}`;
        taskDescription.classList.add('task-content-large');
        taskItem.appendChild(taskDescription);

        const taskNotes = document.createElement('div');
        taskNotes.textContent = `Notes: ${task.notes}`;
        taskNotes.classList.add('task-content-large');
        taskItem.appendChild(taskNotes);

        // task button options
        const taskButtonsDiv = document.createElement('div');
        taskButtonsDiv.classList.add('task-buttons-div');
        taskItem.appendChild(taskButtonsDiv);

        // button for deleting each task
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.textContent = 'Delete Task';
        deleteTaskButton.classList.add('button-task-options');
        deleteTaskButton.addEventListener('click', () => {
            const isConfirmed = confirm(`Are you sure you want to delete ${task.title}?`);
            if (isConfirmed) {    
                project.tasks.splice(i, 1); // remove from array
                window.saveProjectsToLocalStorage(); // save to local storage
                openProject(index, myProjects); // Re-render without the deleted task
            }
        });

        // button for editing the current task
        // it calls the dialog function with an editing mode
        const editTaskButton = document.createElement('button');
        editTaskButton.textContent = 'Edit Task';
        editTaskButton.classList.add('button-task-options');
        editTaskButton.addEventListener('click', () => {
            dialogCreation(false, true, i);
        });

        taskButtonsDiv.appendChild(editTaskButton);
        taskButtonsDiv.appendChild(deleteTaskButton); // append to task div

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
    function dialogCreation (create, edit, index=null) {
        const addTaskDialog = document.createElement("dialog");
        addTaskDialog.classList.add("add-task-dialog");


        const titleInput = document.createElement("input");
        titleInput.classList.add('task-input');
        titleInput.type = "text";
        titleInput.maxLength = 25;
        titleInput.placeholder = "New Task";
        addTaskDialog.appendChild(titleInput);

        const descriptionInput = document.createElement("input");
        descriptionInput.classList.add('task-input');
        descriptionInput.maxLength = 40;
        descriptionInput.type = "text";
        descriptionInput.placeholder = "Task Description";
        addTaskDialog.appendChild(descriptionInput);

        const dueDateInput = document.createElement("input");
        dueDateInput.classList.add('task-input');
        dueDateInput.type = "date";
        addTaskDialog.appendChild(dueDateInput);

        const priorityInput = document.createElement("select");
        priorityInput.classList.add('task-input');
        const priorityOptions = ["Low", "Medium", "High"];
        priorityOptions.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            priorityInput.appendChild(optionElement);
        });
        addTaskDialog.appendChild(priorityInput);

        const notesInput = document.createElement("textarea");
        notesInput.placeholder = "Notes";
        notesInput.rows = 5; //styling for better UX
        notesInput.maxLength = 300;
        notesInput.style.overflow = 'auto';
        notesInput.style.resize = 'both';
        notesInput.style.width = '300px';
        notesInput.style.maxWidth = '350px';
        notesInput.style.maxHeight = '400px';
        addTaskDialog.appendChild(notesInput);

        // buttons
        const buttonDiv = document.createElement('div');
        buttonDiv.id = 'task-button-container';

        const addTaskButton = document.createElement("button");
        addTaskButton.classList.add('form-buttons');
        addTaskButton.textContent = "Add Task";
        buttonDiv.appendChild(addTaskButton);

        const cancelButton = document.createElement("button");
        cancelButton.classList.add('form-buttons');
        cancelButton.textContent = "Cancel";
        buttonDiv.appendChild(cancelButton);

        addTaskDialog.appendChild(buttonDiv); //append to dialog

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
                };

            if (create) {
                project.tasks.push(newTask); // add new task to project
            } else if (edit) {
                project.tasks[index] = newTask; // update existing task
            }                
                
                addTaskDialog.close(); // close dialog screen
                openProject(index, myProjects); // refresh the project view with the new task added
            }  
            
            window.saveProjectsToLocalStorage(); // save to local storage
            addTaskDialog.close();
            openProject(index, myProjects); //refresh UI
        });

        //close dialog on cancel
        cancelButton.addEventListener("click", () => {
            addTaskDialog.close();
        });

        return addTaskDialog.showModal(); // opens modal
    };

    // add button to open the task dialog
    const openAddTask = document.createElement("button");
    openAddTask.classList.add('open-add-task');
    openAddTask.textContent = "Add Task";
    mainContent.appendChild(openAddTask);
    
    // open dialog when button is clicked
    openAddTask.addEventListener("click", () => {
        dialogCreation(true, false, index); // opens modal
     });
}
