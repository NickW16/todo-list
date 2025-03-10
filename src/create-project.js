import folderImage from "./img/folder.png";

(function createProject () {

    const myProjects = [];
    const projectsContainer = document.getElementById('projects-container');


    function displayProjects () {
        projectsContainer.textContent = '';
        myProjects.forEach((project, index) => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-display';

            const projectImage = document.createElement('img');
            projectImage.classList.add('medium-icon');
            projectImage.src = folderImage;
            projectDiv.appendChild(projectImage);

            const titleElement = document.createElement('a');
            titleElement.classList.add('project-folder-name');
            titleElement.innerHTML = project;
            projectDiv.appendChild(titleElement);

            projectsContainer.appendChild(projectDiv);
        });
    };

    function addProjectToContainer(addProject) {
        myProjects.push(addProject);
        displayProjects();
    }

    addProjectToContainer('Project 1');
    addProjectToContainer('Project 2');

    // project dropdown functionality
    const dashboardLink = document.getElementById("projects");

    dashboardLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        projectsContainer.classList.toggle('show'); // Toggle the 'show' class
    });

    // add new project functionality

    const dialog = document.querySelector("dialog");
    const projectForm = document.getElementById("project-form");
    const newProjectButton = document.getElementById("add-new-project");
    const cancel = document.getElementById("cancel-project-add");

    newProjectButton.addEventListener("click", () => {
        dialog.showModal();
    });

    cancel.addEventListener("click", () => {
        dialog.close();
        projectForm.reset();
    });

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault(); //prevent default form submission
    
        // get form data
        const formData = new FormData(projectForm);
        const projectName = formData.get('project_name');
        
        addProjectToContainer(projectName);
    
        //close dialog screen and reset form input
        dialog.close();
        projectForm.reset();
    });
})();