const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    //자바스크립트에서 제공하는 Date() 객체에서 시간 정보 가져옴
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds}`;
}


function init(){
    getTime();
    //setInterval(간격마다 실행할 function, 시간간격)
    //1초마다 갱신
    setInterval(getTime, 1000); 
}

init();
