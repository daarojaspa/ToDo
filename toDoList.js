const ul=document.getElementById("taskContainer")
const form=document.querySelector("form")
const theemButton=document.getElementById("theemToggle")

function createButton(text,classname) {
  const btn=document.createElement("button")
  btn.textContent=text;
  btn.classname=classname;
   switch (classname){ 
    case "delete-btn":
      btn.setAttribute("aria-label","delete");
      break;
      case "Edit-btn":
        btn.setAttribute("aria-label","Edit");
          break;
   }
  return btn;
}
function taskCreator(task){
li=document.createElement("li")
li.textContent=task  
li.append(
  createButton("❌", "delete-btn"),
  createButton("✏️",  "Edit-btn")
    
)
return li;

}
function taskDestructor(task){
  if(confirm("are you sure?")){
    task.remove()
  }
  upDateLocalStorageTasks();
}
function taskeditor(item){
  const newTask=prompt("edit the task ",item.firstChild.textContent)
if (newTask!==null){
  item.firstChild.textContent=newTask
}
upDateLocalStorageTasks();
}
function storeInLocalStorage(task){
  const tasks=JSON.parse(localStorage.getItem("tasks")||"[]")
  tasks.push(task)
  localStorage.setItem("tasks",JSON.stringify(tasks))
}
function loadLocalStorage(){
  const tasks=JSON.parse(localStorage.getItem("tasks"||"[]"))
  if (tasks){
  tasks.forEach(element => {
    ul.appendChild(taskCreator(element))
  });
  }
  if(localStorage.getItem("theme")==="Dark"){
    document.body.classList.toggle("darkTheme");
  }
  
}
function upDateLocalStorageTasks(){
  const tasks=Array.from(ul.querySelectorAll("li")).map(li=>li.firstChild.textContent) 
  localStorage.setItem("tasks",JSON.stringify(tasks))
}
loadLocalStorage();
form.addEventListener("submit",event=>{
  event.preventDefault();
  const input=document.getElementById("task")
  const task=input.value;
  if(task){
    ul.append(taskCreator(task));
    storeInLocalStorage(task)
    input.value="";
  }
})
ul.addEventListener("click",e=>{
  console.log(e.target)
  if(e.target.textContent==="❌"){
  taskDestructor(e.target.parentElement)  
  }else if (e.target.textContent==="✏️"){
    taskeditor(e.target.parentElement)
  }
})
theemButton.addEventListener("click",e=>{
  document.body.classList.toggle("darkTheme")
  const theme= document.body.classList.contains("darkTheme")?
  "Dark":"Light";
  localStorage.setItem("theme",theme);
})
