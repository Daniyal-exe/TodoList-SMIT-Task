export class ClassManager {
    constructor(contentDiv, predefinedClasses) {
        this.contentDiv = contentDiv;
        this.classes = {};

        // Initialize predefined classes
        predefinedClasses.forEach(className => {
            this.classes[className] = [];
        });
    }

    showClassContent(className) {
        this.renderClassContent(className);
    }

    renderClassContent(className) {
        this.contentDiv.innerHTML = ''; // Clear content

        const todoList = this.classes[className] || [];

        todoList.forEach((todo, index) => {
            const todoItem = this.createTodoItem(todo, className, index);
            this.contentDiv.appendChild(todoItem);
        });
    }

    addTodoItem(className, text) {
        if (!this.classes[className]) return;
        this.classes[className].push(text);
        this.renderClassContent(className);
    }

    // createTodoItem(todo, className, index) {
    //     const todoItem = document.createElement('div');
    //     todoItem.classList.add('todo-item');

    //     const text = document.createElement('span');
    //     text.textContent = todo;

    //     const editButton = document.createElement('button');
    //     const editIcon = document.createElement('i');
    //     editIcon.classList.add('ri-pencil-line');
    //     editButton.appendChild(editIcon);

    //     editButton.addEventListener('click', () => {
    //         this.openEditModal(todo, (newText) => {
    //             if (newText !== null && newText.trim()) {
    //                 this.classes[className][index] = newText.trim();
    //                 this.renderClassContent(className);
    //             }
    //         });
    //     });


    //     const deleteButton = document.createElement('button');
    //     const deleteIcon = document.createElement('i');
    //     deleteIcon.classList.add('ri-delete-bin-line');
    //     deleteButton.appendChild(deleteIcon);
    //     deleteButton.addEventListener('click', () => {
    //         this.classes[className].splice(index, 1);
    //         this.renderClassContent(className);
    //     });


    //     todoItem.appendChild(text);
    //     todoItem.appendChild(editButton);
    //     todoItem.appendChild(deleteButton);

    //     return todoItem;
    // }


    createTodoItem(todo, className, index) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
    
        const text = document.createElement('span');
        text.textContent = todo;
        text.classList.add('todo-text');  // Add a class for text styling
    
        // Create a wrapper div for the buttons
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');  // Add a class for button styling
    
        const editButton = document.createElement('button');
        const editIcon = document.createElement('i');
        editIcon.classList.add('ri-pencil-line');
        editButton.appendChild(editIcon);
    
        editButton.addEventListener('click', () => {
            this.openEditModal(todo, (newText) => {
                if (newText !== null && newText.trim()) {
                    this.classes[className][index] = newText.trim();
                    this.renderClassContent(className);
                }
            });
        });
    
        const deleteButton = document.createElement('button');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('ri-delete-bin-line');
        deleteButton.appendChild(deleteIcon);
    
        deleteButton.addEventListener('click', () => {
            this.classes[className].splice(index, 1);
            this.renderClassContent(className);
        });
    
        // Append buttons to the wrapper
        buttonWrapper.appendChild(editButton);
        buttonWrapper.appendChild(deleteButton);
    
        // Append text and button wrapper to todo item
        todoItem.appendChild(text);
        todoItem.appendChild(buttonWrapper);
    
        return todoItem;
    }
    

    openEditModal(currentText, callback) {
        const modal = document.getElementById('edit-modal');
        const editInput = document.getElementById('edit-input');
        const saveButton = document.getElementById('save-edit');
        const cancelButton = document.getElementById('cancel-edit');

        editInput.value = currentText;
        modal.style.display = 'block';

        const closeModal = () => {
            modal.style.display = 'none';
        };

        saveButton.onclick = function() {
            const newText = editInput.value.trim();
            if (newText) {
                callback(newText);
                closeModal();
            } else {
                customAlert('Todo cannot be empty!'); 
            }
        };

        cancelButton.onclick = closeModal;

        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        };
    }
}
