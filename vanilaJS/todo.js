const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos"; //ToDoList_LocalStorage

let toDo = []; //일정 임시 저장


function deleteToDo(event){
    //delete버튼 누르면 일정삭제
    //event.target : 클릭된 것에 html태그를 가져옴
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //배열명.filter(함수) : return이 true인 요소만 모아 새로운 배열 만듬
    const cleanToDo = toDo.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDo = cleanToDo;
    saveToDos();
}

function saveToDos(){
    //toDo를 가져와서 localstorage에 저장
    //JSON.stringify(object) : 자바스크립트의 object를 string으로 바꿔줌
    localStorage.setItem(TODOS_LS, JSON.stringify(toDo));
}

function paintToDo(text){
    //할일을 화면에 표시
    //document.createElement("html 태그 이름"); : javascript로 html 생성
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDo.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId 
    };
    toDo.push(toDoObj);
    saveToDos(); 
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    //LocalStorage에 저장된 ToDoList를 화면에 표시
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null){
        //JSON.parse(String) : String을 Object로 변환
        const parseToDos = JSON.parse(toDos);
        //오브젝트명.forEach(함수) : 각각의 Object마다 함수 실행
        parseToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }   


}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}


init();