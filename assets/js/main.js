//consts for search data display
let city = "";
const citySearch = $("#citySearch");
const searchBtn = $("#search-btn");
const currentCity = $("#current-city");
const currentTemp = $("#currentTemp");
const currentHumidity = $("#currentHumidity");
const currentUV = $("#currentUV");
const currentWind = $("#currentWind");
const cityResults = [];

//get city input from form and trim value
function displayWeather(event){
    event.preventDefault();
    if(citySearch.val().trim()!==""){
        city=citySearch.val().trim();
        weatherSearch(city);
        // console.log(city);
    }
//store searched city in local storage
    localStorage.setItem('city', JSON.stringify(city));
    addCity(city);
}

//function to search city
function weatherSearch(city) {
    let url = new URL('https://api.openweathermap.org/data/2.5/weather?');
    let params = new URLSearchParams(url.search);
    
    // console.log(url.origin);
    // console.log(url.pathname);
  
    params.append('q', city);
    params.append('appid', '2e8e5ab39a4c6705ee6a8e263e1e4bbc');
    params.append('units', 'imperial');

  const new_url = new URL(`${url.origin}${url.pathname}?${params}`);
    // console.log(new_url.href);  
    
    $.ajax({
        url:new_url.href,
        method:"GET",
    }).then(function(response){
        console.log(response);
        //display weather icon after name and date
        const weatherIcon = response.weather[0].icon;
        // const iconSize = "@2x.png"
        const iconurl = new URL("https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png");
        const date = new Date(response.dt*1000).toLocaleDateString();
        // console.log(iconurl);
        const icon = $("#weather-Img").html("<img src="+ iconurl +">");
        //display city name, date and icon
        (currentCity).html(response.name+"("+date+")");
        
        //display current temp
        (currentTemp).html("Temp: " +response.main.temp + " deg F");
        //display current wind speed
        (currentWind).html("Wind: " +response.wind.speed + " MPH");
        //display current humidity
        (currentHumidity).html("Humidity: " +response.main.humidity + "%");
        // console.log(response.name); 
       
        forecast(city);
    }) 
};

//display 5-day forecast on cards for searched city
function forecast(city) {
    const url = new URL('https://api.openweathermap.org/data/2.5/forecast?');
    let params = new URLSearchParams(url.search);
    params.append('q', city);
    params.append('cnt', 40);
    params.append('appid', '2e8e5ab39a4c6705ee6a8e263e1e4bbc');
    params.append('units', 'imperial');

    const forecastURL = (`${url.origin}${url.pathname}?${params}`);
    // console.log(forecastURL);
    $.ajax({
        url:forecastURL,
        method:"GET"
    }).then (function(response){
        console.log(response);
        
        for (i=0; i<5; i++){
            const date = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            // console.log(date);

            const iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            // console.log(iconcode);

            const iconurl= new URL("https://openweathermap.org/img/wn/"+iconcode+"@2x.png");
            // console.log(iconurl);


            const temp= response.list[((i+1)*8)-1].main.temp;
            const humidity= response.list[((i+1)*8)-1].main.humidity;
            const wind = response.list[((i+1)*8)-1].wind.speed;
        
            $("#forecast-Date"+i).html(date);
            $("#forecast-Img"+i).html("<img src="+ iconurl +">");
            $("#forecast-Temp"+i).html("Temp: " + temp+"&#8457");
            $("#forecast-Wind"+i).html("Wind: " +wind+"MPH");
            $("#forecast-Humidity"+i).html("Humidity: "+ humidity+"%");
        }
        
    });

  
};

//load last search results so page isn't blank on page load
function lastSearch() {
    const city = JSON.parse(localStorage.getItem('city'));
    // console.log(city);
    weatherSearch(city);
}

//add searched city to recents list
function addCity(city) {
    const listEl = $("<li>"+city+"</li>")
    $(listEl).attr("class", "list-group-item btn btn-secondary");
    $(".list-group").append(listEl);
}

//function to display results for recent searches if clicked 
function showSearch(event) {
    const liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
    weatherSearch(city);
}
}

//click and load functions
$("#searchButton").on('click', displayWeather);
$(window).on('load', lastSearch);
$('#city-list').on('click', showSearch);