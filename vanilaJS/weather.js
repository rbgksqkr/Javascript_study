const weather = document.querySelector(".js-weather");

const API_KEY = "2d659395c0966b9094d9fd775878e781";
const COORDS = 'coords';

function getWeather(lat, lon){
    //API 데이터 가져오기 : fetch(API_KEY)
    //.then() : 데이터가 완전히 들어올 때까지 기다린 다음 실행하도록 함
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText=`${temperature} @ ${place}`;
    })

}

function saveCoords(coordsObj){
    //localStorage에 좌표 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    //위치정보 사용 허용했을 때
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    //위치정보 사용 거부했을 때
    console.log("Cant access location"); 
}

function askForCoords(){
    //좌표(coords) 정보 사용
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        //좌표 요청
        askForCoords();
    } else{
        //get weather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();