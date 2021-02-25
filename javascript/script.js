item_counter = 0 // make this so it first counts all of the draggable items
list_counter = 0

const Lists = document.getElementsByClassName("example-dropzone");

for(i = 0; i < Lists.length; i++)
{
    Lists[i].id = list_counter;
    list_counter = list_counter + 1;
    item_counter = item_counter + (Lists[i].children.length - 1);
}
list_counter = list_counter + 1; // list counter will always be off by one

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
    event
      .currentTarget
      .style
      .backgroundColor = 'yellow';
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
    newDiv.draggable = true
    newDiv.setAttribute("onDragStart","onDragStart(event)");
    id_string = ('draggable-' + item_counter)
    newDiv.id = id_string
    
    const input = document.createElement('input')
    newDiv.appendChild(input)

    item_counter = item_counter + 1;
    Button = document.getElementById(id);
    Button.parentNode.insertBefore(newDiv, Button.nextSibling)
}