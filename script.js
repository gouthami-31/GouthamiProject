document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const allTasksFilter = document.getElementById('allTasksFilter');
    const activeTasksFilter = document.getElementById('activeTasksFilter');
    const completedTasksFilter = document.getElementById('completedTasksFilter');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all'; // 'all', 'active', 'completed'

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    // Function to render tasks based on the current filter
    function renderTasks() {
        taskList.innerHTML = ''; // Clear existing tasks

        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') {
                return !task.completed;
            } else if (currentFilter === 'completed') {
                return task.completed;
            }
            return true; // 'all' filter

        });

        if (filteredTasks.length === 0 && currentFilter === 'all') {
            const noTasksMessage = document.createElement('li');
            noTasksMessage.className = 'no-tasks-message';
            noTasksMessage.textContent = 'No tasks yet! Add one above.';
            noTasksMessage.style.textAlign = 'center';
            noTasksMessage.style.padding = '20px';
            noTasksMessage.style.color = '#888';
            noTasksMessage.style.fontStyle = 'italic';
            noTasksMessage.style.border = 'none';
            noTasksMessage.style.backgroundColor = 'transparent';
            taskList.appendChild(noTasksMessage);
            return;
        } else if (filteredTasks.length === 0 && currentFilter === 'active') {
             const noActiveTasksMessage = document.createElement('li');
            noActiveTasksMessage.className = 'no-tasks-message';
            noActiveTasksMessage.textContent = 'No active tasks. Time to relax or add more!';
            noActiveTasksMessage.style.textAlign = 'center';
            noActiveTasksMessage.style.padding = '20px';
            noActiveTasksMessage.style.color = '#888';
            noActiveTasksMessage.style.fontStyle = 'italic';
            noActiveTasksMessage.style.border = 'none';
            noActiveTasksMessage.style.backgroundColor = 'transparent';
            taskList.appendChild(noActiveTasksMessage);
            return;
        }
        else if (filteredTasks.length === 0 && currentFilter === 'completed') {
             const noCompletedTasksMessage = document.createElement('li');
            noCompletedTasksMessage.className = 'no-tasks-message';
            noCompletedTasksMessage.textContent = 'No completed tasks yet. Get to work!';
            noCompletedTasksMessage.style.textAlign = 'center';
            noCompletedTasksMessage.style.padding = '20px';
            noCompletedTasksMessage.style.color = '#888';
            noCompletedTasksMessage.style.fontStyle = 'italic';
            noCompletedTasksMessage.style.border = 'none';
            noCompletedTasksMessage.style.backgroundColor = 'transparent';
            taskList.appendChild(noCompletedTasksMessage);
            return;
        }


        filteredTasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.dataset.id = task.id; // Store task ID for easy lookup

            if (task.completed) {
                listItem.classList.add('completed');
            }

            // Checkbox and text content
            const taskContent = document.createElement('div');
            taskContent.className = 'task-content';

            const checkbox = document.createElement('div');
            checkbox.className = 'task-checkbox';
            if (task.completed) {
                checkbox.classList.add('checked');
            }
            checkbox.addEventListener('click', () => toggleTaskCompletion(task.id));

            const taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            taskTextSpan.textContent = task.text;
            taskTextSpan.addEventListener('dblclick', () => editTask(task.id)); // Double click to edit

            taskContent.appendChild(checkbox);
            taskContent.appendChild(taskTextSpan);

            listItem.appendChild(taskContent);

            // Action buttons (edit and delete)
            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';

            const editButton = document.createElement('button');
            editButton.className = 'edit-btn';
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.title = 'Edit Task';
            editButton.addEventListener('click', () => editTask(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.title = 'Delete Task';
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            listItem.appendChild(taskActions);
            taskList.appendChild(listItem);
        });
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }

        const newTask = {
            id: Date.now(), // Unique ID for the task
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = ''; // Clear input field
        saveTasks();
        renderTasks();
    }

    // Function to toggle task completion status
    function toggleTaskCompletion(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks();
            renderTasks();
        }
    }

    // Function to delete a task
    function deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }
    }

    // Function to edit a task
    function editTask(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            const currentText = tasks[taskIndex].text;
            const newText = prompt('Edit task:', currentText);

            if (newText !== null && newText.trim() !== '' && newText.trim() !== currentText) {
                tasks[taskIndex].text = newText.trim();
                saveTasks();
                renderTasks();
            } else if (newText !== null && newText.trim() === '') {
                alert('Task cannot be empty after editing!');
            }
        }
    }

    // Function to clear all completed tasks
    function clearCompletedTasks() {
        if (confirm('Are you sure you want to clear all completed tasks?')) {
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
        }
    }

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    allTasksFilter.addEventListener('click', () => {
        currentFilter = 'all';
        updateFilterButtons();
        renderTasks();
    });

    activeTasksFilter.addEventListener('click', () => {
        currentFilter = 'active';
        updateFilterButtons();
        renderTasks();
    });

    completedTasksFilter.addEventListener('click', () => {
        currentFilter = 'completed';
        updateFilterButtons();
        renderTasks();
    });

    clearCompletedBtn.addEventListener('click', clearCompletedTasks);

    // Function to update active filter button styling
    function updateFilterButtons() {
        allTasksFilter.classList.remove('active');
        activeTasksFilter.classList.remove('active');
        completedTasksFilter.classList.remove('active');

        if (currentFilter === 'all') {
            allTasksFilter.classList.add('active');
        } else if (currentFilter === 'active') {
            activeTasksFilter.classList.add('active');
        } else if (currentFilter === 'completed') {
            completedTasksFilter.classList.add('active');
        }
    }

    // Initial render when page loads
    renderTasks();
    updateFilterButtons();
});
