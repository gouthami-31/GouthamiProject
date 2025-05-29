document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('complete-btn')) {
            toggleComplete(event.target.closest('li'));
        } else if (event.target.classList.contains('delete-btn')) {
            deleteTask(event.target.closest('li'));
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="task-actions">
                <button class="complete-btn">&#10003;</button> <button class="delete-btn">&#10006;</button> </div>
        `;

        taskList.appendChild(li);
        taskInput.value = ''; // Clear the input field
        saveTasks(); // Save tasks to Local Storage
    }

    function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks(); // Save tasks to Local Storage
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
        saveTasks(); // Save tasks to Local Storage
    }

    function saveTasks() {
        // Get all task items and convert them to an array of objects
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        // Store the array of tasks as a JSON string in Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        // Retrieve tasks from Local Storage
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div class="task-actions">
                        <button class="complete-btn">&#10003;</button>
                        <button class="delete-btn">&#10006;</button>
                    </div>
                `;
                if (task.completed) {
                    li.classList.add('completed');
                }
                taskList.appendChild(li);
            });
        }
    }
});
