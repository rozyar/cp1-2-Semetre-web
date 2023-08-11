let taskArray: {
    autor: string, 
    task:string, 
    descricao: string, 
    departamento: string, 
    importancia: number, 
    valor: number, 
    duracao: any}[] = [];

const add = document.querySelector("#addTask") as HTMLButtonElement
const organizer = document.querySelector("#organizer") as HTMLButtonElement
const taskDiv = document.querySelector(".tasksList") as HTMLDivElement
const taskForm = document.querySelector("form") as HTMLFormElement


add.addEventListener("click", (event) => {
    event.preventDefault()
    // Pegando os valores dos inputs
    const autor = document.querySelector("#author") as HTMLInputElement
    const task = document.querySelector("#task") as HTMLInputElement
    const description = document.querySelector("#description") as HTMLInputElement
    const department = document.querySelector("#department") as HTMLInputElement
    const important = document.querySelector("#important") as HTMLSelectElement

    // console.log(author.value, task.value, description.value, important.value)

    //criando um objeto com o valor dos inputs
    if(!validateInput(autor) || !validateInput(task) || !validateInput(description) || !validateInput(department)){
        alert("Preencha todos os campos")
        return
    }

    let taskObject = {
        autor: autor.value,
        task: task.value,
        descricao: description.value,
        departamento: department.value,
        importancia: Number(important.value),
        valor: 0,
        duracao: undefined    
    }
    
    //adicionando o objeto no array
    taskArray.push(taskObject)
    displayTasks()
    taskForm.reset()
    console.log(taskArray)
})

function validateInput(input: HTMLInputElement): boolean{
    return input.value.trim() !== ""
}

organizer.addEventListener("click", (e) =>{
    e.preventDefault()
    taskArray.sort((a,b) => a.importancia - b.importancia)
    displayTasks()
})

function displayTasks(){

    taskDiv.innerHTML = ""

    taskArray.forEach((task, index) => {
        let taskItemDiv = document.createElement("div") as HTMLDivElement
        taskItemDiv.classList.add("task")
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
            `
        taskDiv.appendChild(taskItemDiv)

    })
    console.log(taskArray)
}

function deleteTask(index:number){
    taskArray.splice(index, 1)
    displayTasks()
}

function completeTask(index:number){
    taskArray.splice(index, 1)
    displayTasks()
}

function addValue(index:number){
    const value: number = Number(prompt("Digite o valor da tarefa"))
    taskArray[index].valor = value
    displayTasks()
}

function addDuration(index:number){
    const value = prompt("Digite a duração da tarefa")
    taskArray[index].duracao = value
    displayTasks()
}


let nome:string = "           Derick              "
//<teste>
// function deletaTUDO(){
//     taskArray.splice(0, taskArray.length)
//     displayTasks()
// }


