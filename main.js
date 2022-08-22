const form = document.getElementById('form');
const textInput = document.getElementById('textInput');
const dateInput = document.getElementById('dateInput');
const textarea = document.getElementById('textarea');
const msg = document.getElementById('msg');
const tasks = document.getElementById('tasks');
let add = document.getElementById('add');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation = ()=>{
    if(textInput.value === ''){
        msg.innerHTML = '*Title can not be blank';
        console.log('err');
    }
    else{
        console.log('suc');
        msg.innerHTML = '';
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (()=>{
            add.setAttribute("data-bs-dismiss", "");
        })()
        }
};

let data = [];

let acceptData = ()=>{
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem('data', JSON.stringify(data));

    console.log(data);
    createTasks();
};

let createTasks = ()=>{
    tasks.innerHTML = '';
    data.map((x, y)=>{
        return (
            tasks.innerHTML += `
            <div id="${y}">
                        <span class="fw-bold">${x.text}</span>
                        <span class="small text-secondary">${x.date}</span>
                        <p>${x.description}</p>
                        <span class="options">
                        <i onClick="editTask(this)"  data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square app-addNew"></i>
                            <i onClick="deleteTask(this);createTasks()" class="fa-solid fa-trash-can"></i>
                        </span>
                    </div>
            `)
    })

    resetForm();
};

let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(data));
};

let resetForm = ()=>{
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
};

(()=>{
    data = JSON.parse(localStorage.getItem('data')) || [];
    createTasks();
})()