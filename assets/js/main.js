const todoValues = document.getElementById("input--value");
const addButton = document.getElementById("input__btn");
const todoContainer = document.querySelector(".Todo__container");
const updateContainer = document.querySelector(".Pop__up--input");
const updateData = document.getElementById("data-updateValue");

const localStorageKey = "TodoItems";

document.addEventListener("DOMContentLoaded", () => {
    const fetchTodoitem = [...JSON.parse(localStorage.getItem(localStorageKey)),];

    fetchTodoitem.forEach((item) => {
        const todoList = document.createElement("li");
        todoList.innerHTML = `<table width="100%" cellpadding="0" cellspacing="0" border="0" class="Todo__table">
        <tr>
            <td width="70%">
                <div class="Todo__item">${item.TodoItem}</div>
            </td>
            <td width="6%">
                <div><span class="compelete fa-sharp fa-solid fa-circle-check" onclick="taskCompelete(event)"></span>
                </div>
            </td>
            <td width="6%">
                <div><span class="undo fa-solid fa-rotate-left" onclick="taskUndo(event)"></span></div>
            </td>
            <td width="6%">
                <div><span class="delete fa-sharp fa-solid fa-circle-xmark" onclick="taskDelete(event)"></span></div>
            </td>
        </tr>
</table>`
        todoContainer.append(todoList)
    })
    refreshUI()
})

addButton.addEventListener("click", callBack);

todoValues.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        handleSumbitlist(todoValues.value)
    }
})


function enterKey(event) {
    if (event.key === "Enter") {
        handleSumbitlist(todoValues.value)
    }
}

function callBack() {
    handleSumbitlist(todoValues.value)
}

function handleSumbitlist(value) {
    if (isNaN(todoValues.value) && todoValues.value !== "") {
        const todoList = document.createElement("li");
        todoList.innerHTML = `<table width="100%" cellpadding="0" cellspacing="0" border="0" class="Todo__table">
        <tr>
            <td width="70%">
              <div class="Todo__item">${todoValues.value}</div> 
            </td>
            <td width="6%">
                <div><span class="compelete fa-sharp fa-solid fa-circle-check" onclick="taskCompelete(event)"></span>
                </div>
            </td>
            <td width="6%">
                <div><span class="undo fa-solid fa-rotate-left" onclick="taskUndo(event)"></span></div>
            </td>
            <td width="6%">
                <div><span class="delete fa-sharp fa-solid fa-circle-xmark" onclick="taskDelete(event)"></span></div>
            </td>
        </tr>
</table>`
        todoContainer.append(todoList)
        setLocalStorage()
        todoValues.value = "";
        todoValues.focus()
        refreshUI()
    }
    else {
        alert("Enter the valid values")
    }
}

function setLocalStorage() {
    localStorage.setItem("TodoItems",
        JSON.stringify([...JSON.parse(localStorage.getItem("TodoItems") || "[]"),
        { TodoItem: todoValues.value },
        ])
    );
}

function refreshUI() {
    const todoLists = document.querySelector(".Todo__lists")
    todoContainer.children.length > 0 ? ((todoLists.classList.remove("background")), (todoLists.classList.add("background1"))) : ((todoLists.classList.add("background")), todoLists.classList.remove("background1"))
}

function taskCompelete(event) {
    event.target.parentElement.parentElement.previousElementSibling.classList.add("over");
}

function taskUndo(event) {
    event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.classList.remove("over");
}

function taskDelete(event) {
    const removeList = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    removeList.remove()

    const fetchTodoitem = [...JSON.parse(localStorage.getItem(localStorageKey)),];
    const itemText = event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild;
    fetchTodoitem.forEach((item) => {
        if (item.TodoItem === itemText.innerText) {
            fetchTodoitem.splice(fetchTodoitem.indexOf(item), 1);
        }
    });

    localStorage.setItem(localStorageKey, JSON.stringify(fetchTodoitem))
    refreshUI()
}




