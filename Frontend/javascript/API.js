getList()

async function getList()
{
    const response  = await fetch('http://localhost:8080/questions/60384188051d3a6284e79d76')
    const data = await response.json();
    console.log(data.lists)
    return getHTML(data)
}

function getHTML(json) {
    const master = document.createElement('form')
    master.classList.add('example-parent')
    master.id = "main"

    for (var i in json.lists) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('example-dropzone')
        newDiv.setAttribute("ondragover", "onDragOver(event);")
        newDiv.setAttribute("ondrop", "onDrop(event);")

        const List_name = document.createElement('input')
        List_name.name = 'lists' + i + '.'
        List_name.value = json.lists[i].list_name

        newDiv.appendChild(List_name)

        const btn = document.createElement("button");
        btn.setAttribute("onclick", "addListItem(this.id)");
        btn.type = "button"
        btn.id = "button" + i;
        btn.textContent = "Add Task"
        newDiv.appendChild(btn)

        console.log(json.lists[i])
        for(j in json.lists[i].tasks)
        {
            const child = document.createElement('div');
            child.classList.add("example-draggable");
            child.id = json.lists[i].tasks[j].task_id;
            // child.textContent = json.lists[i].tasks[j].text;
            child.draggable = true;
            child.setAttribute("ondragstart","onDragStart(event)");
            const input = document.createElement('input')
            input.name =  'lists' + i + '.' + "tasks" + j
            input.value = json.lists[i].tasks[j].text
            child.appendChild(input)
            newDiv.appendChild(child);
        }
        master.appendChild(newDiv);
    }
    const btn = document.createElement("button");
    btn.textContent = "Save"
    btn.type = "submit"
    btn.onclick = serialize()
    btn.formAction = "http://localhost:8080/questions"
    btn.formMethod = "POST"
    master.appendChild(btn)

    console.log(master);
    body = document.body.appendChild(master)

    const Save = document.createElement("button");
    Save.textContent = 'save'
    Save.setAttribute("onclick", "serialize();")
    document.body.appendChild(Save)

}

data = {}

async function serialize() {
    console.log('data');
    var elements = document.querySelectorAll('form input');
    var data = {};
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var val = el.value;
        if (!val) val = "";
        var fullName = el.getAttribute("name");
        if (!fullName) continue;
        var fullNameParts = fullName.split('.');
        var prefix = '';
        var stack = data;
        for (var k = 0; k < fullNameParts.length - 1; k++) {
        prefix = fullNameParts[k];
        if (!stack[prefix]) {
            stack[prefix] = {};
        }
        stack = stack[prefix];
        }
        prefix = fullNameParts[fullNameParts.length - 1];
        if (stack[prefix]) {

        var newVal = stack[prefix] + ',' + val;
        stack[prefix] += newVal;
        } else {
        stack[prefix] = val;
        }
    }
    sendData(data)
}

async function sendData(data)
{
    console.log(data)
    await fetch("http://localhost:8080/questions", {method: 'POST', body: JSON.stringify(data),   headers: {"Content-type": "application/json; charset=UTF-8"}})
}