document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const itemsLeftSpan = document.getElementById('itemsLeft');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all'; // Default filter

    // Function to save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to update items left count
    function updateItemsLeft() {
        const activeTasks = tasks.filter(task => !task.completed).length;
        itemsLeftSpan.textContent = `${activeTasks} items left`;
    }

    // Function to render tasks based on current filter
    function renderTasks() {
        taskList.innerHTML = ''; // Clear existing tasks

        let filteredTasks = [];
        if (currentFilter === 'all') {
            filteredTasks = tasks;
        } else if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        if (filteredTasks.length === 0 && tasks.length > 0) {
            // If tasks exist but none match the filter, show a message
            const noMatchMessage = document.createElement('li');
            noMatchMessage.className = 'task-item';
            noMatchMessage.style.justifyContent = 'center';
            noMatchMessage.style.fontStyle = 'italic';
            noMatchMessage.textContent = `No ${currentFilter} tasks to show.`;
            taskList.appendChild(noMatchMessage);
            return;
        } else if (tasks.length === 0) {
            // If no tasks at all, show a generic message
             const emptyMessage = document.createElement('li');
            emptyMessage.className = 'task-item';
            emptyMessage.style.justifyContent = 'center';
            emptyMessage.style.fontStyle = 'italic';
            emptyMessage.textContent = `No tasks yet. Add one above!`;
            taskList.appendChild(emptyMessage);
            return;
        }


        filteredTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            listItem.dataset.id = task.id; // Store unique ID

            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions-item">
                    <button class="complete-btn" aria-label="Mark task as complete">
                        <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                    </button>
                    <button class="delete-btn" aria-label="Delete task">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(listItem);
        });

        updateItemsLeft(); // Update count after rendering
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!'); // Basic validation
            return;
        }

        const newTask = {
            id: Date.now(), // Unique ID for each task
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        taskInput.value = ''; // Clear input field
        renderTasks(); // Re-render to show new task
    }

    // Function to handle task actions (complete/delete) using event delegation
    function handleTaskActions(event) {
        const target = event.target;
        const listItem = target.closest('.task-item'); // Find the parent li element

        if (!listItem) return; // Not a task item

        const taskId = parseInt(listItem.dataset.id);
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex === -1) return; // Task not found (shouldn't happen)

        if (target.closest('.complete-btn')) {
            // Toggle completed status
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks();
            renderTasks();
        } else if (target.closest('.delete-btn')) {
            // Delete task
            tasks.splice(taskIndex, 1);
            saveTasks();
            renderTasks();
        }
    }

    // Function to change filter
    function changeFilter(event) {
        const clickedFilter = event.target.dataset.filter;
        if (clickedFilter && clickedFilter !== currentFilter) {
            currentFilter = clickedFilter;

            // Update active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            renderTasks();
        }
    }

    // Function to clear all completed tasks
    function clearCompletedTasks() {
        const initialTaskCount = tasks.length;
        tasks = tasks.filter(task => !task.completed);
        if (tasks.length < initialTaskCount) { // Only save and re-render if something was removed
            saveTasks();
            renderTasks();
        } else {
            alert('No completed tasks to clear!');
        }
    }

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    taskList.addEventListener('click', handleTaskActions); // Event delegation
    filterButtons.forEach(button => button.addEventListener('click', changeFilter));
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);

    // Initial render when the page loads
    renderTasks();
});
