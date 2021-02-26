item_counter = 0 // make this so it first counts all of the draggable items
list_counter = 0
function counter(list_index)
{
  const Lists = document.getElementsByClassName("example-dropzone");
  item_counter = 0
  item_counter = item_counter + (Lists[list_index].children.length - 2);

  // for(i = 0; i < Lists.length; i++)
  // {
  //     Lists[i].id = list_counter;
  //     list_counter = list_counter + 1;
  //     item_counter = item_counter + (Lists[i].children.length - 2);
  // }
  // list_counter = list_counter + 1; // list counter will always be off by one
}

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
    list_id = id.slice(6, id.length)
    console.log(parseInt(list_id))
    
    counter(parseInt(list_id))
    const newDiv = document.createElement("div"); // create the new element 

    newDiv.classList.add("example-draggable")
    newDiv.draggable = true
    newDiv.setAttribute("onDragStart","onDragStart(event)");
    id_string = ('draggable-' + item_counter)
    newDiv.id = id_string
    
    const input = document.createElement('input')
    
    
    input.name = parseInt(list_id) + ":" + item_counter;
    newDiv.appendChild(input)
    item_counter = item_counter + 1;
    Button = document.getElementById(id);
    Button.parentNode.insertBefore(newDiv, Button.nextSibling)
}


//<button onclick="addListItem(this.id)" id='To-Do-Button2'>Add Child</button>
