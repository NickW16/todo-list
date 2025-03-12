import folderImage from "./img/folder.png";
import { openProject } from "./create-todo";

(function createProject () {

    const myProjects = [
        {
        name: "Project 1", 
        tasks: [
            {
            title: "Task 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
            dueDate: "2025-04-01",
            priority: "High",
            notes: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
            },
            {
            title: "Task 2",
            description: "Task 2 Description",
            dueDate: "2025-05-01",
            priority: "Low",
            notes: "Some notes for Task 2",
            }
        ]
    },
        {
            name: "Project 2",
            tasks: []  // No tasks yet
        }
    ];
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
            titleElement.innerHTML = project.name;
            titleElement.href = "#";
            projectDiv.appendChild(titleElement);

            titleElement.addEventListener('click', (event) => {
                event.preventDefault();
                openProject(index, myProjects);
            });

            projectsContainer.appendChild(projectDiv);
        });
    };

    function addProjectToContainer(projectName) {
        if (!projectName.trim()) return; // prevent empty projects
        
        myProjects.push({ name: projectName, tasks: [] }); // Store project as an object
        
        displayProjects();
    }

    displayProjects();

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