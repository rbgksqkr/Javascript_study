const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    //저장한 image파일 랜덤으로 배경설정. 이미지 경로 설정 주의.
    const image = new Image();
    image.src = `C:/Users/박규한/Desktop/vanilaJS/image/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    //난수 발생. Math.random() : 0부터 1까지 / Math.floor() : 소수점 내림
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}
function init(){
    const randomNumber = genRandom(); 
    paintImage(randomNumber);
}

init();