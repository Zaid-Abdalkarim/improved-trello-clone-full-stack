getList()

async function getList()
{
    const response  = await fetch('http://localhost:8080/questions/603bf8ec5c972b4c3c994206')
    const data = await response.json();
    console.log(data.lists)
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

    const List_name = document.createElement('input')
    List_name.name = "list_name."
    List_name.value = json.list_name

    newDiv.appendChild(List_name)

    const btn = document.createElement("button");
    btn.setAttribute("onclick", "addListItem(this.id)");
    btn.type = "button"
    btn.id = "button1";
    btn.textContent = "Add Task"
    newDiv.appendChild(btn)

    console.log(json)
    for(j in json.tasks)
    {
        const child = document.createElement('div');
        child.classList.add("example-draggable");
        child.classList.add("task-card");
        child.classList.add("side-side");
        // child.textContent = json.lists[i].tasks[j].text;
        child.draggable = true;
        child.setAttribute("ondragstart","onDragStart(event)");
        const input = document.createElement('input')
        input.name =  "text";
        input.value = json.task[j].text
        input.setAttribute("disabled", '')
        
        const btn = document.createElement("button");
        btn.id = json.task[j]._id;
        btn.textContent = "Edit"
        btn.setAttribute("onclick", 'popup(this.id);')
        child.appendChild(input)
        child.appendChild(btn)
        newDiv.appendChild(child);
    }
    master.appendChild(newDiv);

    console.log(master);
    body = document.body.appendChild(master)

    const Save = document.createElement("button");
    Save.textContent = 'save'
    Save.setAttribute("onclick", "SerializeTask();")
    document.body.appendChild(Save)

}

data = {}

async function SerializeTask() {
    console.log('data');

    var form = document.querySelector('form');
    data = new FormData(form)
    
    const newData = Array.from(data.keys()).reduce((result, key) => {
        result[key] = data.get(key);
        return result;
      }, {});


    printData(newData)
    sendData(newData)

    // var elements = document.querySelectorAll('form');
    // var data = {};
    // for (var i = 0; i < elements.length; i++) {
    //     var el = elements[i];
    //     var val = el.value;
    //     if (!val) val = "";
    //     var fullName = el.getAttribute("name");
    //     if (!fullName) continue;
    //     var fullNameParts = fullName.split('.');
    //     console.log(fullNameParts)
    //     var prefix = '';
    //     var stack = data;
    //     var extra = ''
    //     for (var k = 0; k < fullNameParts.length - 1; k++) {
    //         prefix = fullNameParts[k];            

    //         if (!stack[prefix]) {
    //             stack[prefix] = {};
    //         }
    //         stack = stack[prefix];
    //     }
    //     prefix = fullNameParts[fullNameParts.length - 1];
    //     if (stack[prefix]) {

    //         var newVal = stack[prefix] + ',' + val;
    //         stack[prefix] += newVal;
    //     } else {
    //         stack[prefix] = val;
    //     }
    // }
    // printData(data)
    // sendData(data)
}

async function sendData(data)
{
    // console.log(await JSON.stringify(document.getElementById('main').formToJson()))
    console.log(data)
    await fetch("http://localhost:8080/list", {method: 'POST', body: JSON.stringify(data),   headers: {"Content-type": "application/json; charset=UTF-8"}})
}