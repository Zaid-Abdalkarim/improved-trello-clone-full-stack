getList()


async function getList()
{
    list_id = JSON.parse( sessionStorage.getItem("id"))
    const response  = await fetch('http://localhost:8080/lists/'.concat(list_id))
    const data = await response.json();
    return getHTML(data)
}

function getHTML(json) {
    const master = document.createElement('div')
    master.classList.add('example-parent')
    master.classList.add('card')
    master.classList.add('center')
    master.id = "main"

    const newDiv = document.createElement('div');
    newDiv.classList.add('example-dropzone')
    newDiv.setAttribute("ondragover", "onDragOver(event);")
    newDiv.setAttribute("ondrop", "onDrop(event);")
    newDiv.id = json._id;

    const List_name = document.createElement('H1')
    List_name.name = "list_name."
    List_name.textContent = json.list_name

    newDiv.appendChild(List_name)

    const addTaskForm = document.createElement('form')

    const btn = document.createElement("button");
    btn.setAttribute("onclick", "addListItem(this.id)");
    btn.type = "submit"
    btn.id = "button1";
    btn.classList.add('fa-plus')
    btn.classList.add('fa')

    btn.textContent = "Add Task"
    addTaskForm.appendChild(btn)
    newDiv.appendChild(addTaskForm)
    console.log(json)
    var i = 0
    
    for(j in json.task)
    {
        i = i + 1;
        const child = document.createElement('div');
        // child.classList.add("example-draggable");
        // child.textContent = json.lists[i].tasks[j].text;
        child.classList.add('task-div'.concat((i % 2).toString()))
        child.draggable = false;
        child.setAttribute("ondragstart","onDragStart(event)");
        const input = document.createElement('label')
        input.textContent = json.task[j].text
        input.classList.add('center')
        input.classList.add("task-edit");
        

        const btn = document.createElement("button");
        btn.classList.add('fa')
        btn.classList.add('fa-edit')
        btn.classList.add('center')
        btn.id = json.task[j]._id;
        btn.textContent = "  Edit"
        btn.setAttribute("onclick", 'popup(this.id);')


        child.appendChild(input)
        child.appendChild(btn)
        newDiv.appendChild(child);
    }
    master.appendChild(newDiv);

    console.log(master);
    body = document.body.appendChild(master)
}

data = {}

async function SerializeTask(id) {
    console.log('data');

    var form = document.querySelector('form');
    data = new FormData(form)
    
    const newData = Array.from(data.keys()).reduce((result, key) => {
        result[key] = data.get(key);
        return result;
      }, {});


    printData(newData)
    put(id, newData)
}