/* ----- Variables ----- */

let input = document.getElementById('cityInput');
let button = document.getElementById('btn');
let body = document.querySelector('body');
let output = document.getElementById('output');
let clearBtn = document.getElementById('clearbtn');
let nbClick=0;
let nbClickMax=2;
let apiKey = '4c0665f89ed0153262e09818da099b8d';
let city = input.value;

/* ----- Functions autofocus & fill the input ----- */

input.addEventListener('click', function() {
    if (input.value === 'Enter a city') {
        input.value = '';
    }
    }
);

input.addEventListener('blur', function() {
    if (input.value === '') {
        input.value = 'Enter a city';
    }
    }
);

/* Press Enter to get the weather */

input.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        button.click();
    }
});

/* ----- Clear the output ----- */

clearBtn.addEventListener('click', function() {
    output.innerHTML = '';
    nbClick=0;
    document.getElementById('btn').disabled=false;
});

/* ----- limitation du nombre de clic ----- */

function compter(){
nbClick++;
if(nbClick>=nbClickMax)
    {
        alert('You can only choose ' + nbClickMax + ' cities');
        document.getElementById('btn').disabled=true;
    }
}

/* call the geocoding API */
function getGeocoding(city) {
    let url = 'https://api.opencage.com/geocode/v1/json?q=' + city + '&key=' + apiKey;
    return fetch(url)
        .then(function(response) {
            return response.json();
        }
        )
        .catch(function(error) {
            console.log(error);
        }
        );
}

/* call the weather API  that displays the weather of the city for the next 5 days */
function getWeather(lat, lng) {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&units=metric&appid=' + apiKey;
    return fetch(url)
        .then(function(response) {
            return response.json();
        }
        )
        .catch(function(error) {
            console.log(error);
        }
        );
}

/* display the weather of the city in a card in the output */
function displayWeather(weather) {
    let cityContainer = document.createElement('div');
    cityContainer.classList.add('cityContainer');

    let weatherContainer = document.createElement('div');
    weatherContainer.classList.add('weatherContainer');

    let tempContainer = document.createElement('div');
    tempContainer.classList.add('tempContainer');

    let iconImgContainer = document.createElement('div');
    iconImgContainer.classList.add('iconImgContainer');

    let cityCard = document.createElement('div');
    cityCard.classList.add('cityCard');

    let cityName = document.createElement('h2');
    cityName.classList.add('cityName');
    cityName.innerHTML = weather.city.name;

    let temp = document.createElement('p');
    temp.classList.add('temp');
    temp.innerHTML = weather.list[0].main.temp + '°C';

    let iconImg = document.createElement('img');
    iconImg.classList.add('iconImg');
    iconImg.src = 'http://openweathermap.org/img/wn/' + weather.list[0].weather[0].icon + '.png';

    let weatherDesc = document.createElement('p');
    weatherDesc.classList.add('weatherDesc');
    weatherDesc.innerHTML = weather.list[0].weather[0].description;

    let weatherDate = document.createElement('p');
    weatherDate.classList.add('weatherDate');
    weatherDate.innerHTML = 'Date: ' + weather.list[0].dt_txt;

    let weatherTemp = document.createElement('p');
    weatherTemp.classList.add('weatherTemp');
    weatherTemp.innerHTML = 'Temperature: ' + weather.list[0].main.temp + '°C';

    let weatherHumidity = document.createElement('p');
    weatherHumidity.classList.add('weatherHumidity');
    weatherHumidity.innerHTML = 'Humidity: ' + weather.list[0].main.humidity + '%';

    let weatherWind = document.createElement('p');
    weatherWind.classList.add('weatherWind');
    weatherWind.innerHTML = 'Wind: ' + weather.list[0].wind.speed + 'km/h';

    let weatherClouds = document.createElement('p');
    weatherClouds.classList.add('weatherClouds');
    weatherClouds.innerHTML = 'Clouds: ' + weather.list[0].clouds.all + '%';

    let weatherPressure = document.createElement('p');
    weatherPressure.classList.add('weatherPressure');
    weatherPressure.innerHTML = 'Pressure: ' + weather.list[0].main.pressure + 'hPa';

    let weatherSunrise = document.createElement('p');
    weatherSunrise.classList.add('weatherSunrise');
    weatherSunrise.innerHTML = 'Sunrise: ' + weather.city.sunrise;

    let weatherSunset = document.createElement('p');
    weatherSunset.classList.add('weatherSunset');
    weatherSunset.innerHTML = 'Sunset: ' + weather.city.sunset;

    cityContainer.appendChild(cityCard);
    cityCard.appendChild(cityName);
    cityCard.appendChild(tempContainer);
    tempContainer.appendChild(temp);
    tempContainer.appendChild(iconImgContainer);
    iconImgContainer.appendChild(iconImg);
    cityCard.appendChild(weatherContainer);
    weatherContainer.appendChild(weatherDesc);
    weatherContainer.appendChild(weatherDate);
    weatherContainer.appendChild(weatherTemp);
    weatherContainer.appendChild(weatherHumidity);
    weatherContainer.appendChild(weatherWind);
    weatherContainer.appendChild(weatherClouds);
    weatherContainer.appendChild(weatherPressure);
    weatherContainer.appendChild(weatherSunrise);
    weatherContainer.appendChild(weatherSunset);

    output.appendChild(cityContainer);
}

/* ----- Get the weather of the city ----- */

button.addEventListener('click', function() {
    let city = input.value;
    getGeocoding(city)
        .then(function(response) {
            let lat = response.results[0].geometry.lat;
            let lng = response.results[0].geometry.lng;
            return getWeather(lat, lng);
        }
        )
        .then(function(response) {
            displayWeather(response);
            compter();
        }
        )
        .catch(function(error) {
            console.log(error);
        }
        );
}
);
