//Variables
const listTask  =document.getElementById('list-task');

//Event Listeners
eventLissteners();

function eventLissteners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', addTask);

    //Borrar tarea
    listTask.addEventListener('click',deleteTask);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded',taskLocalStorage);
}


//Funciones


//Añadir tarea
function addTask(e){
    e.preventDefault();
    //Leer valor del textarea
    const task = document.getElementById('task').value;

    if(task === ""){
        alert('Tarea esta vacia')
    } else {
    //Boton para eliminar tarea
    const buttonDelete = document.createElement('a');
    buttonDelete.setAttribute('href', '#')
    buttonDelete.classList = 'delete-task';
    buttonDelete.innerText = 'Eliminar';

    //Se crea lista y se agrega contenido a la lista.
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = task;
    li.appendChild(span);
    li.appendChild(buttonDelete);
    listTask.appendChild(li);

      //Guardar en localStorage
    addTaskLocalStorage(task);
    document.getElementById('task').value = ""; 
    }
}


//Elimina tarea del DOM
function deleteTask(e){
    e.preventDefault();
    //Comprueba si se da click al elemento que tenga la clase delete-task
    if(e.target.className === 'delete-task'){
        e.target.parentElement.remove();
        deleteTaskLocalStorage(e.target.parentElement.innerText);
    }
}

//Mostrar datos guardados en localStorage
function taskLocalStorage(){
    let tasks;
    tasks = getTaskLocalStorage();

    tasks.forEach(function(task){
        //Boton para eliminar tarea
        const buttonDelete = document.createElement('a');
        buttonDelete.setAttribute('href', '#')
        buttonDelete.classList = 'delete-task';
        buttonDelete.innerText = 'X';
    
        //Se crea lista y se agrega contenido a la lista.
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerText = task;
        li.appendChild(span);
        li.appendChild(buttonDelete);
        listTask.appendChild(li);
    })
}

//Guarda datos en el localStorage
function addTaskLocalStorage(task){
    let tasks;
    tasks = getTaskLocalStorage();
    //Añadir tarea
    tasks.push(task);
    //Convertir de string a arreglo para localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Comprueba si hay elementos en localStorage, retorna un array
function getTaskLocalStorage(){
    let tasks;
    //Revisamos valores de localStorage
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}

//Eliminar tarea de localStorage
function deleteTaskLocalStorage(task){
    let tasks, taskDelete;
    //Elimina la x de la tarea
    taskDelete = task.substring(0, task.length - 1);

    tasks = getTaskLocalStorage();
    
    tasks.forEach(function(task, index){
        if(taskDelete === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
