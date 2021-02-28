var currentId = ''
function EditPopup(id)
{
    const form = document.getElementById('popup-1')
    const edit_input = document.getElementById("form-edit")
    if(id != undefined)
    {
        const button = document.getElementById(id)
        const input = button.previousElementSibling

        currentId = button.id

        
        edit_input.placeholder = input.value

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
function PostPopup(id)
{
    const form = document.getElementById('popup-1')
    const edit_input = document.getElementById("form-edit")
    if(id != undefined)
    {
        const button = document.getElementById(id)
        const input = button.previousElementSibling

        currentId = button.id

        
        edit_input.placeholder = input.value

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