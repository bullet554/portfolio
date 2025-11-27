const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('.add-button');
const taskList = document.querySelector('.task-list');

if (localStorage.getItem('tasks')) {
    taskList.innerHTML = localStorage.getItem('tasks');
}

addButton.addEventListener('click', () => {
    const taskDescription = taskInput.value;
    if (taskDescription !== '') {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.innerHTML = `
            <span class="task-description">${taskDescription}</span>
            <button class="delete-button">Удалить</button>
        `;
        taskList.appendChild(listItem);

        taskInput.value = '';

        localStorage.setItem('tasks', taskList.innerHTML);
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        const listItem = e.target.closest('li');
        listItem.parentNode.removeChild(listItem);

        localStorage.setItem('tasks, taskList.innerHTML');
    }
});