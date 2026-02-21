// Elementos do DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// Array para armazenar as tarefas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para atualizar as estatísticas
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
}

// Função para renderizar as tarefas
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${index})"
            >
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Deletar</button>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

// Função para adicionar uma tarefa
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
}

// Função para deletar uma tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Função para marcar uma tarefa como concluída
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Renderizar tarefas ao carregar a página
renderTasks();