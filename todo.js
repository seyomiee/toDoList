const toDoForm = document.querySelector(".js-toDoForm")
 ,toDoInput = toDoForm.querySelector("input")
 ,toDoList = document.querySelector(".js-toDoList");

const TODOS_LS= 'toDos';
/*
function filterFn(toDo){
  //return if true only
  return toDo.id === 1
}*/

//array have object, and object have id is number
let toDos=[];

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
                        //JSON.stringify : js object->string
}


function deleteToDo(event){
  //delete target
  const btn= event.target;
  const li= btn.parentNode;
  toDoList.removeChild(li);
  //여기까지 하면 새로고침 시 다시 나타남
  const cleanToDos= toDos.filter(function(toDo){
    return toDo.id !==parseInt(li.id);
  });
  toDos=cleanToDos;
  saveToDos();
}



function paintToDo(text){

    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.innerText = '🚀';
    delBtn.addEventListener('click', deleteToDo);
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    span.innerText = text;
    li.id = newId;
    toDoList.appendChild(li);
    li.appendChild(delBtn);
    li.appendChild(span);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
  const loadedToDos= localStorage.getItem(TODOS_LS);
  if(loadedToDos !==null){
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo){
          paintToDo(toDo.text);
      })
      //forEach :
  }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}
init();
