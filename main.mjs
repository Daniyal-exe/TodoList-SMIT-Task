import { ClassManager } from './classManager.mjs';

const classSearchInput = document.getElementById('class-search');
const searchButton = document.getElementById('search-button');
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const contentDiv = document.getElementById('content');

const predefinedClasses = ['classA', 'classB', 'classC', 'classD'];
const classManager = new ClassManager(contentDiv, predefinedClasses);

let selectedClass = null;

function searchClass() {
    const className = classSearchInput.value.trim();
    if (!predefinedClasses.includes(className)) {
        customAlert('Invalid class. Please enter a correct class name.');
        selectedClass = null;
        todoInput.disabled = true;
        addButton.disabled = true;
    } else {
        selectedClass = className;
        todoInput.disabled = false;
        addButton.disabled = false;
        classManager.showClassContent(className);
    }
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!selectedClass) {
        customAlert('Please enter a class name to add text.');
    } else if (!text) {
        customAlert('Your text is empty. Please enter something to add.');
    } else {
        classManager.addTodoItem(selectedClass, text);
        todoInput.value = '';
    }
}

function openEditModal(todoItem, callback) {
    const modal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-input');
    const saveButton = document.getElementById('save-edit');
    const cancelButton = document.getElementById('cancel-edit');

    editInput.value = todoItem.textContent; // Pre-fill with current todo text
    modal.style.display = 'block';

    saveButton.onclick = function() {
        const newText = editInput.value.trim();
        if (newText) {
            callback(newText);  // Pass the new text to the callback
            modal.style.display = 'none';
        } else {
            customAlert('Todo cannot be empty!'); // Use customAlert instead of alert
        }
    };

    cancelButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Event listeners for buttons
searchButton.addEventListener('click', searchClass);
addButton.addEventListener('click', addTodo);

// Event listeners for pressing "Enter"
classSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchClass();
    }
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

contentDiv.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        openEditModal(event.target, function(newText) {
            event.target.textContent = newText; 
        });
    }
});


// Custom alert modal implementation
function customAlert(message) {
    const modal = document.getElementById('custom-alert');
    const alertText = document.getElementById('alert-text');
    const closeButton = document.getElementById('close-alert');

    alertText.textContent = message;
    modal.style.display = 'block';

    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Override the default alert
window.alert = customAlert;
