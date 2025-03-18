import "./style.css";
import createProject from "./create-project";
import { openProject } from "./create-todo";

//this is the content of the page when the website is first-loaded
function renderMainPageMessage (){
    const mainPageMessage = document.getElementById("main-page-message");

    mainPageMessage.innerHTML = `<h2 id="main-page-title">This is a <strong><i>Task Manager</i></strong></h2>
                                <p>Here, you'll be able to create projects, organize them and assign tasks for each project.</p>
                                <p>Each task has a few elements to be determined by the user:</p>
                                <ul id="main-page-list">
                                <li>Its Name;</li>
                                <li>Its Priority;</li>
                                <li>Its Due Date;</li>
                                </ul>
                                <p>You can also add a description and some extra notes to the task.</p>
                                <p>And, on top of that, if you ever need to change anything you can simply click the <i>Edit Task</i> button and update your task info!</p>
                                
                                <p>Change the website's theme to your preference!</p>
                                <select id="theme-select">
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="blue">Blue</option>
                                    <option value="pink">Pink</option>
                                    <option value="red">Red</option>
                                </select>
                                <p style="margin-top: 50px">This is a project made for The Odin Project course, by <a href="https://github.com/NickW16" style="color: var(--tertiary-color)">NickW16</a>.</p>
                                `
                                ;                       
};

// welcome message
const mainContent = document.getElementById("main-content");

mainContent.innerHTML = `<h1 id ="task-page-project-title">Welcome</h1>
                        <div id="main-page-message"></div>`;
renderMainPageMessage();


// resets main page screen if one clicks 'dashboard'
const dashboardClear = document.getElementById('dashboard');
dashboardClear.addEventListener('click', () => {
    mainContent.innerHTML = `<h1 id="task-page-project-title">Main Page</h1>
                             <div id="main-page-message"></div>`;
    renderMainPageMessage();
});

//user theme changes

const themeSelect = document.getElementById("theme-select");

// event listener when user changes theme
themeSelect.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;
  
    // remove all theme classes
    document.body.classList.remove("light-theme", "dark-theme", "blue-theme", "pink-theme", "red-theme");
  
    // add selected theme class
    document.body.classList.add(`${selectedTheme}-theme`);
  
    // save preference to local storage
    localStorage.setItem("theme", selectedTheme);
  });

// apply saved theme
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
  
    document.body.classList.add(`${savedTheme}-theme`);
    themeSelect.value = savedTheme;
  });
