//select form
const form = document.querySelector('#newItem')
//select input text
const todoItem = document.querySelector('.todo-input');
//select the ul to add li element
const ulList = document.querySelector('.ToDo');

let listTask = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    addTodo(todoItem.value);
})

function addTodo(item) {
    if(item !== '') {
        const task = {
            id: Date.now(),
            name: item,
            completed:false,
        }
        
        //push tasks into the array
        listTask.push(task);
        addToLocalStorage(listTask);

        //return value of input text to empty string
        todoItem.value = '';
    }
}

//here e create the element itself
function renderTask(listTask) {
    ulList.innerHTML = '';

    listTask.forEach(function(item) {
        //check if the task is completed or not
        const checked = item.completed ? 'checked': null;

        const li = document.createElement('li');
        //set a class to the li
        li.setAttribute('class', 'task');
        //gives the li a id
        li.setAttribute('data-key', item.id);

        
        //it creates the li markup
        li.innerHTML = 
        `<input type="checkbox" class="checkbox" ${checked}>
        <span>- ${item.name}</span>
        <i class="far fa-trash-alt delete-button"></i>`;

        //if the task is completed, it add a line through
        if(item.completed === true) {
            li.children[1].classList.add('strike');
        }

        //add task inside ul
        ulList.append(li)

    });
}

//add data to localStorage
function addToLocalStorage(listTask) {
    localStorage.setItem('listTask', JSON.stringify(listTask));
    renderTask(listTask);
}

//retrieve data from localStorage on refresh
function getFromLocalStorage() {
    const localSto = localStorage.getItem('listTask')

    if(localSto) {
        listTask = JSON.parse(localSto);
        renderTask(listTask)
    }
}

//toggle the completed or not on the task when click on checkbox
function toggle(id) {
    listTask.forEach(function(item) {
        if(item.id == id) {
            item.completed = !item.completed;
        };
    });

    addToLocalStorage(listTask);
}

//deleting task when clicking on bin
function deleteTask(id) {
    listTask = listTask.filter(function(item) {
        return item.id != id;
    });

    addToLocalStorage(listTask);
}

//we get data from the getgo
getFromLocalStorage();

//we listening for events on the page
ulList.addEventListener('click', function(event) {
    if(event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    
    if(event.target.classList.contains('delete-button')) {
        deleteTask(event.target.parentElement.getAttribute('data-key'))
    }
});