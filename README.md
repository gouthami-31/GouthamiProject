# TeamSG
cat << 'EOF' > README.md
# Simple To-Do List App

---

This is a basic, web-based To-Do List application built with plain HTML, CSS, and JavaScript. It allows users to manage their daily tasks efficiently, offering core functionalities like adding, marking as complete, and deleting tasks. All tasks are saved directly in your browser using `localStorage`, so they persist even after you close and reopen the page.

## Features

* **Add Tasks:** Quickly add new tasks using an input field and an "Add Task" button (or by pressing Enter).
* **Mark as Complete:** Toggle a task's completion status with a "Complete" button. Completed tasks are visually distinguished.
* **Delete Tasks:** Remove individual tasks with a "Delete" button.
* **Persistent Storage:** Tasks are saved in your browser's `localStorage`, ensuring they remain even after refreshing the page or closing the browser.
* **Clear Completed Tasks:** A dedicated button to remove all tasks that have been marked as complete.

## Tech Stack

* **HTML5:** Provides the foundational structure and content of the web page.
* **CSS3:** Styles the application, making it visually appealing and user-friendly.
* **JavaScript (ES6+):** Handles all the interactive logic, including DOM manipulation, event handling, and `localStorage` management.

## How to Use

1.  **Clone the Repository (or download the files):**
    ```bash
    git clone <repository-url>
    ```
    (Replace `<repository-url>` with the actual URL of your repository.)

2.  **Navigate to the Project Directory:**
    ```bash
    cd simple-todo-app
    ```
    (Replace `simple-todo-app` with the name of the folder if you downloaded it.)

3.  **Open `index.html`:** Simply open the `index.html` file in your preferred web browser.

No server or complex setup is required, as this is a front-end only application.

## Project Structure
.
├── index.html    # The main HTML file for the app's structure
├── style.css     # Contains all the CSS rules for styling
└── script.js     # Houses the JavaScript logic for interactivity and data management


## Future Enhancements (Optional Features)

This app can be expanded with more advanced features, such as:

* **Filter Tasks:** Add options to display "All," "Active," or "Completed" tasks.
* **Edit Tasks:** Allow users to edit task text by clicking on them.
* **Drag-and-Drop Reordering:** Enable users to reorder tasks in the list.
* **Due Dates/Priorities:** Incorporate fields for setting due dates or task priorities.
* **Accessibility Improvements:** Enhance usability for users with disabilities.

Feel free to explore the code and modify it to suit your needs!
EOF
