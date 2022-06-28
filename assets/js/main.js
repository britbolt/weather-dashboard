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

function displayWeather(event){
    event.preventDefault();
    if(citySearch.val().trim()!==""){
        city=citySearch.val().trim();
        weatherSearch(city);
        console.log(city);
    }
//store search in local storage
    localStorage.setItem('city', city);
}


//function to search city
function weatherSearch(city) {
    let url = new URL('https://api.openweathermap.org/data/2.5/weather?');
    let params = new URLSearchParams(url.search);
    
    console.log(url.origin);
    console.log(url.pathname);
  
    params.append('q', city);
    params.append('appid', '2e8e5ab39a4c6705ee6a8e263e1e4bbc');
    params.append('units', 'imperial');

  const new_url = new URL(`${url.origin}${url.pathname}?${params}`);
    console.log(new_url.href);  
    
    $.ajax({
        url:new_url.href,
        method:"GET",
    }).then(function(response){
        console.log(response);
        //display weather icon after name and date
        const weatherIcon = response.weather[0].icon;
        // const iconSize = "@2x.png"
        const iconurl = (`${url.origin}+${weatherIcon}`)
        const date = new Date(response.dt*1000).toLocaleDateString();
        console.log(iconurl);

        //display city name, date and icon
        (currentCity).html(response.name+"("+date+")");
        //display current temp
        (currentTemp).html(response.main.temp + " deg F");
        //display current wind speed
        (currentWind).html(response.wind.speed + " MPH");
        //display current humidity
        (currentHumidity).html(response.main.humidity + "%");
        console.log(response.name); 
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
    console.log(forecastURL);
    $.ajax({
        url:forecastURL,
        method:"GET"
    }).then (function(response){
        console.log(response);
        
        for (i=0; i<5; i++){
            const date = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            console.log(date);

            const iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            console.log(iconcode);

            const iconurl= new URL("https://openweathermap.org/img/wn/"+iconcode+"@2x.png");
            console.log(iconurl);


            var temp= response.list[((i+1)*8)-1].main.temp;
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#forecast-Date"+i).html(date);
            $("#forecast-Img"+i).html("<img src="+ iconurl +">");
            $("#forecast-Temp"+i).html("Temp: " + temp+"&#8457");
            $("#forecast-Humidity"+i).html("Humidity: "+ humidity+"%");
        }
        
    });

  
};

//display 5-day forecast

//add searched city to recents list

//function to display results for recent searches if clicked 


//click functions
$("#searchButton").on('click', displayWeather);




    
    
    
//     // const ul = document.getElementById('#results-today');
//     // const list = document.createDocumentFragment();
    

   
//     fetch(new_url.href)
//     .then((response) => {
//         return response.json();
//         })
//         .then((data) => {
//             let results = data;
//             results.map(function(result) {
//                 console.log(results);
//                 results.forEach((result) => {
//                    document.getElementById("results-today").innerHTML += `${results}`;
//                 })  
                
//             });
//         });
// }
 // let li = document.createElement('li');
                // let name = document.createElement('h2');
                // let temp = document.createElement('span')

                // name.innerHTML = `${result.name}`;
                // temp.innerHTML = `${result.temp}`;

                // li.appendChild(name);
                // li.appendChild(temp);
                // list.appendChild(li);
                // ul.appendChild(list);

                // var getWeatherData = function () {
//     fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=2e8e5ab39a4c6705ee6a8e263e1e4bbc')
//     .then(response => {
//         return response.json();
//     }).then(data => {
       
//         console.log(data.main, data.wind)
//     })
// };

// getWeatherData();