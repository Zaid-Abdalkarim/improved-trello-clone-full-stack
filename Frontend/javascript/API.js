getList()

async function getList()
{
    const response  = await fetch('http://localhost:8080/questions/60384188051d3a6284e79d76')
    const data = await response.json();
    console.log(data.lists)
    return getHTML(data)
}

function getHTML(json) {
    const master = document.createElement('div')
    master.classList.add('example-parent')
    

    for (var i in json.lists) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('example-dropzone')
        newDiv.setAttribute("ondragover", "onDragOver(event);")
        newDiv.setAttribute("ondrop", "onDrop(event);")
        newDiv.textContent = json.lists[i].list_name;

        const btn = document.createElement("button");
        btn.setAttribute("onclick", "addListItem(this.id)");
        btn.id = json.lists[i]._id;
        btn.textContent = "Add Task"
        newDiv.appendChild(btn)

        console.log(json.lists[i])
        for(j in json.lists[i].tasks)
        {
            const child = document.createElement('div');
            child.classList.add("example-draggable");
            child.id = json.lists[i].tasks[j].task_id;
            child.textContent = json.lists[i].tasks[j].text;
            child.draggable = true;
            child.setAttribute("ondragstart","onDragStart(event)");
            newDiv.appendChild(child);
        }
        master.appendChild(newDiv);
    }
    console.log(master);
    body = document.body.appendChild(master)
  }

function save()
{

}