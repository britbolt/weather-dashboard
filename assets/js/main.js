var getWeatherData = function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=2e8e5ab39a4c6705ee6a8e263e1e4bbc')
    .then(response => {
        return response.json();
    }).then(data => {
       
        console.log(data.main, data.wind)
    })
};

getWeatherData();


document.getElementById('citySearch-btn').onclick = function displayWeather() {
    const searchInput=document.getElementById('citySearchInput');
    localStorage.setItem('city',searchInput.value);

    
    let url = new URL('https://api.openweathermap.org/data/2.5/weather?');
    let params = new URLSearchParams(url.search);
    
    console.log(url.origin);
    console.log(url.pathname);
    
    params.append('q', searchInput.value);
    params.append('appid', '2e8e5ab39a4c6705ee6a8e263e1e4bbc');

    const new_url = new URL(`${url.origin}${url.pathname}?${params}`);

    console.log(new_url.href);


    

    


    

    

   


    // document.getElementsByClassName('results-today').textContent=data.main.temp;
}

function displayCity() {

}