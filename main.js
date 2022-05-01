const api = {
    key: "8c53c643e8e34961c3967e1ce8200f9a",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress' ,setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metrics&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let now =new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerText = `${Math.round(weather.main.temp).toFixed(0)}C`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${weather.main.temp_min}c/ ${weather.main.temp_max}c`;
}

function dateBuilder(d){
    let months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    let days = ["sunday","monday","tuesay","wednesday","thursday","friday","saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;

}