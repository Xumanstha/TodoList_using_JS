"use strict";

// DOM element references
const inputTask = document.getElementById("taskInput");
const TodoList = document.getElementById("TodoList");
const submitbtn = document.getElementById("Submit");

// Task class to represent each to-do item
class Task {
    static lastId = 0;      // Static counter to ensure unique IDs
    name = "";
    isFinish = false;       // Tracks completion status

    constructor() {
        this.id = ++Task.lastId;
    }

    display() {
        console.log("id: " + this.id);
    }
}

let tasks = []; // Array to store all tasks

// Called when the user submits a new task
function submitTodo() {
    if (inputTask.value.trim() !== "") {
        let user = new Task();
        user.name = inputTask.value;
        tasks.push(user);
        inputTask.value = ""; // Clear the input field
        user.display();
        renderTodo();         // Refresh the list
    }
}

// Render all tasks to the page
function renderTodo() {
    TodoList.innerHTML = ""; // Clear current list

    if (tasks.length !== 0) {
        tasks.forEach((value) => {
            // Create list item and its child elements
            let li = document.createElement("li");
            const Span = document.createElement("span");
            const checkbox = document.createElement("input");
            let btn = document.createElement("button");

            // Style the list item
            li.style.display = "flex";
            li.style.justifyContent = "space-around";
            // li.className = "list-group-item active";
            li.id = `Id${value.id}`;

            // Append list item to the container
            TodoList.appendChild(li);
            
            // Setup checkbox
            checkbox.type = "checkbox";
            checkbox.id = `Check${value.id}`;
            li.appendChild(checkbox);
            li.appendChild(Span);

            // Setup task label
            Span.textContent = value.name;

            // Setup delete button
            btn.textContent = "delete";
            btn.id = `Btn${value.id}`;
            btn.className="delete-btn";

            let UniqueCheckbox = document.getElementById(`Check${value.id}`);

            // If task is already finished, visually reflect it
            if (value.isFinish) {
                UniqueCheckbox.checked = true; // Check the box (no event triggered)
                li.appendChild(btn);           // Show delete button
                Span.style.textDecoration = "line-through";
                console.log("Checkbox is ticked");

                btn.onclick = function () {
                    Deletetask(value.id);
                };
            }

            // Handle checkbox toggle event
            UniqueCheckbox.addEventListener("change", function () {
                if (this.checked) {
                    value.isFinish = true;
                    Span.style.textDecoration = "line-through";
                    li.appendChild(btn);
                    console.log("Checkbox is ticked");

                    btn.onclick = function () {
                        Deletetask(value.id);
                    };
                } else {
                    value.isFinish = false;
                    Span.style.textDecoration = "none";
                    console.log("CheckBox is unticked");

                    if (li.contains(btn)) {
                        btn.remove();
                    }
                }
            });
        });
    }
}

// Deletes a task by ID and re-renders the list
function Deletetask(valueId) {
    tasks = tasks.filter(task => task.id !== valueId);
    renderTodo();
}
