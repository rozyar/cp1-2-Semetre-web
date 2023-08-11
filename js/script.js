"use strict";
//Criar uma array que irá receber as tarefas e suas informações
let taskArray = [];
//Pegando os elementos do HTML
const add = document.querySelector("#addTask");
const organizer = document.querySelector("#organizer");
const taskDiv = document.querySelector(".tasksList");
const taskForm = document.querySelector("form");
//Adicionando um evento de click no botão de adicionar
add.addEventListener("click", (event) => {
    //Prevenindo o comportamento padrão do botão
    event.preventDefault();
    // Pegando os valores dos inputs
    const autor = document.querySelector("#author");
    const task = document.querySelector("#task");
    const description = document.querySelector("#description");
    const department = document.querySelector("#department");
    const important = document.querySelector("#important");
    // console.log(author.value, task.value, description.value, important.value)
    //Validando se os inputs estão vazios
    if (!validateInput(autor) || !validateInput(task) || !validateInput(description) || !validateInput(department)) {
        alert("Preencha todos os campos");
        return;
    }
    //criando um objeto com o valor dos inputs
    let taskObject = {
        autor: autor.value,
        task: task.value,
        descricao: description.value,
        departamento: department.value,
        importancia: Number(important.value),
        valor: 0,
        duracao: undefined
    };
    //adicionando os objetos na array
    taskArray.push(taskObject);
    //chamando a função que irá mostrar as tarefas na tela
    displayTasks();
    //resetando os valores dos inputs
    taskForm.reset();
    console.log(taskArray);
});
//Função que irá validar se o input está vazio
function validateInput(input) {
    return input.value.trim() !== "";
}
//Adicionando um evento de click no botão de organizar para organizar as tarefas por importancia
organizer.addEventListener("click", (e) => {
    e.preventDefault();
    taskArray.sort((a, b) => a.importancia - b.importancia);
    displayTasks();
});
//Função que irá mostrar as tarefas na tela 
function displayTasks() {
    //Limpando a div que irá mostrar as tarefas na tela
    taskDiv.innerHTML = "";
    //Percorrendo o array de tarefas e criando um elemento para cada tarefa
    taskArray.forEach((task, index) => {
        let taskItemDiv = document.createElement("div");
        taskItemDiv.classList.add("task");
        //O innerHTML irá adicionar o elemento criado na div e as condições criadas foram feitas para substituir os botões de adicionar valor e duração por um texto
        taskItemDiv.innerHTML = `
            <div class="task-item">
                <p><strong>Autor: </strong>${task.autor}</p>
                <p><strong> Tarefa: </strong>${task.task}</p>
                <p><strong>Descrição: </strong> ${task.descricao}</p>  
                <p><strong>Departamento: </strong>${task.departamento}</p>
                <p><strong>importancia: </strong> ${task.importancia}</p>
                
                ${task.valor > 0 ? `<p><strong>Valor: </strong>${task.valor}` :
            `<button class="addValue" onclick="addValue(${index})">Adicione Valor</button>`}
                
                ${task.duracao !== undefined ? `<p><strong>Duracao: </strong>${task.duracao}` :
            `<button class="addDuration" onclick="addDuration(${index})">Adicione Duração</button>`}

                <button class="complete" onclick="completeTask(${index})">Complete</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
             </div>
            `;
        //Adicionando o elemento criado na div  
        taskDiv.appendChild(taskItemDiv);
    });
    console.log(taskArray);
}
//Função que irá deletar a tarefa
function deleteTask(index) {
    taskArray.splice(index, 1);
    displayTasks();
}
//Função que irá completar a tarefa e como ela vai estar completada irá ser deletada
function completeTask(index) {
    taskArray.splice(index, 1);
    displayTasks();
}
//Função que irá adicionar o valor da tarefa
function addValue(index) {
    const value = Number(prompt("Digite o valor da tarefa"));
    taskArray[index].valor = value;
    displayTasks();
}
//Função que irá adicionar a duração da tarefa
function addDuration(index) {
    const value = prompt("Digite a duração da tarefa");
    taskArray[index].duracao = value;
    displayTasks();
}
//<teste>
// function deletaTUDO(){
//     taskArray.splice(0, taskArray.length)
//     displayTasks()
// }
