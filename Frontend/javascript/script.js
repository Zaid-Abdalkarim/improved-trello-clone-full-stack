item_counter = 0 // make this so it first counts all of the draggable items
list_counter = 0
function counter()
{
  const Lists = document.getElementsByClassName("example-dropzone");
  item_counter = 0
  if(Lists.children != undefined)
    item_counter = item_counter + (Lists[0].children.length - 2);

  return item_counter
}

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
}
function onDragOver(event) {
    event.preventDefault();
}
function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');
      const draggableElement = document.getElementById(id);
      const dropzone = event.target;
      dropzone.appendChild(draggableElement);
      event
      .dataTransfer
      .clearData();
}
function addListItem(id) {
    const newDiv = document.createElement("div"); // create the new element 

    newDiv.classList.add("example-draggable")
    newDiv.classList.add("task-div0");

    newDiv.draggable = false
    newDiv.setAttribute("onDragStart","onDragStart(event)");
    id_string = ('draggable-' + item_counter)
    newDiv.id = id_string
    
    const input = document.createElement('label')
    input.name =  "text";
    input.value = 'new task'
    input.setAttribute("disabled", '')
    input.classList.add('center')
    input.classList.add("task-edit");
    
    const btn = document.createElement("button");
    const item_count = counter()
    btn.classList.add('fa')
    btn.classList.add('fa-edit')
    btn.classList.add('center')
    btn.id = 'new-task' + item_count;
    btn.textContent = "   Edit"
    btn.setAttribute("onclick", 'popup(this.id);')

    input.name = "lists" + ".tasks" + item_counter;
    newDiv.appendChild(input)
    newDiv.appendChild(btn)
    item_counter = item_counter + 1;
    Button = document.getElementById(id);
    Button.parentNode.insertBefore(newDiv, Button.nextSibling)

    post(item_count)
}


function getListId()
{
  list_id = document.getElementsByClassName("example-dropzone")[0].id
  return list_id
}

function printData(data)
{
  console.log(data)
}

const new_task = {
  "text": "new task"
}

async function post(id)
{
  const pushData = await fetch(("http://localhost:8080/lists/".concat(String(getListId()))), {method: 'POST', body: JSON.stringify(new_task),   headers: {"Content-type": "application/json; charset=UTF-8"}})

  const input = document.getElementById(id).previousElementSibling
}

async function put(id, data)
{
  const putData = await fetch(("http://localhost:8080/lists/".concat(getListId()).concat("/").concat(String(id))), {method: 'PUT', body: JSON.stringify(data),   headers: {"Content-type": "application/json; charset=UTF-8"}})
}
//<button onclick="addListItem(this.id)" id='To-Do-Button2'>Add Child</button>
