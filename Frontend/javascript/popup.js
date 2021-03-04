var currentId = ''
function popup(id)
{
    const form = document.getElementById('popup-1')
    const edit_input = document.getElementById("form-edit")
    if(id != undefined)
    {
        const button = document.getElementById(id)
        console.log(button)
        const input = button.previousElementSibling
        console.log(input)

        currentId = button.id

        console.log('input.value =' + input.textContent)


        edit_input.placeholder = input.textContent
        var edit_button = edit_input.parentElement
        edit_button = edit_button.parentElement.lastElementChild
        edit_button.id = id;

        form.classList.toggle('active')
    }
    else
    {
        edit_input.value = ''
        const form = document.getElementById('popup-1')
        const list_id = getListId()
        console.log(currentId)
        console.log(list_id)
        form.classList.toggle('active')
    }
}

function SaveListName(id)
{
    console.log(id)
}

async function update(id)
{
  const pushData = await fetch(("http://localhost:8080/lists/".concat(String(getListId()))), {method: 'PUT', body: JSON.stringify(new_task),   headers: {"Content-type": "application/json; charset=UTF-8"}})
  console.log(await pushData.json())
}

function getListId()
{
//   list_id = document.getElementsByClassName("example-dropzone")[0].id
  returnJSON.parse( sessionStorage.getItem("id"))
}