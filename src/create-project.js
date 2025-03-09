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

            const titleElement = document.createElement('div');
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

    addProjectToContainer('Default 1');
    addProjectToContainer('Default 2');

    // project dropdown functionality
    const dashboardLink = document.getElementById("projects");

    dashboardLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        projectsContainer.classList.toggle('show'); // Toggle the 'show' class
    });

    // add new project
    document.getElementById("add-new-project").addEventListener('click', () => {

    });


})();