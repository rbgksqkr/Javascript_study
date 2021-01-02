const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings");
 
const USER_LS = "currentUser",  //Local Storage Key
    SHOWING_CN = "showing";     //Class Name
 

function saveName(text){
    //데이터 저장. 브라우저가 사용자의 이름 기억.
    //localStorage.setItem(key, value);
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    //actionListener function. 이름을 입력하고 엔터를 눌렀을 때 실행
    event.preventDefault();
    const currentValue = input.value; //input.value == input에 입력된 값  
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    //decide your name
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit); 
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN); //텍스트상자를 없애고
    greeting.classList.add(SHOWING_CN); //greeting innerText 추가
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //user is not
        askForName();
    } else{
        paintGreeting(currentUser); 
    }
}

function init(){
    loadName();
}

init();