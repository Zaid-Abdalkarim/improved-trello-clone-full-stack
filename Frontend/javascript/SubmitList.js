function SetListId(id){
    sessionStorage.setItem("id", JSON.stringify(id));
}

async function SerializeList() {
    console.log('data');

    var form = document.querySelector('form');
    data = new FormData(form)
    
    const newData = Array.from(data.keys()).reduce((result, key) => {
        result[key] = data.get(key);
        return result;
      }, {});

    console.log(newData)

    Save(newData)
}

async function Save(data)
{
  const pushData = await fetch("http://localhost:8080/lists", {method: 'POSt', body: JSON.stringify(data),   headers: {"Content-type": "application/json; charset=UTF-8"}})
  data = await pushData.json()
  
  const input = document.getElementById('form-edit')
  input.name = data._id
  
  SetListId(data._id)
  window.location = 'task.html'
}