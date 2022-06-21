/* ----- Variables ----- */

let input = document.getElementById('cityInput');
let button = document.getElementById('btn');
let page = document.querySelector('body');
let output = document.getElementById('output');
let clearBtn = document.getElementById('clearbtn');
let nbClick=0;
let nbClickMax=2;

/* ----- Automatic Background ----- */

page.style.backgroundImage = 'url(https://source.unsplash.com/1600x900/?landscape)';

/* ----- Functions ----- */

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

/* ----- Get the weather ----- */

button.addEventListener('click', function() {
    let city = input.value;
    let apiKey = '4c0665f89ed0153262e09818da099b8d';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    /* ----- Change the background depending on the city input ----- */
function changeBackground(city) {
    let unsplashKey = '4wCdXsoxO0JFDpjy9xDNK3UqH1gzff2PvbNevoUxIFk';
    let unsplashUrl = 'https://api.unsplash.com/search/photos?query=' + city + '&client_id=' + unsplashKey;
    fetch(unsplashUrl)
        .then(function(response) {
            return response.json();
        }
        )
        .then(function(data) {
            let randomIndex = Math.floor(Math.random() * data.results.length);
            let randomPhoto = data.results[randomIndex];
            let photoUrl = randomPhoto.urls.regular;

            page.style.backgroundImage = `url(${photoUrl})`;

        }
        )
        .catch(function(error) {
            console.log(error);
        }
        );
}

changeBackground(city);

/* ----- Call the API ----- */

    fetch(url)
        .then(function(response) {
            return response.json();
        }
        )
        .then(function(data) {

            /* ----- Create variables ----- */
            
            let weather = data.weather[0].main;
            let temp = data.main.temp;
            let tempCelsius = temp - 273.15;
            let tempFahrenheit = temp * 9/5 - 459.67;
            let tempCelsiusRound = Math.round(tempCelsius);
            let tempFahrenheitRound = Math.round(tempFahrenheit);
            let city = data.name;
            let country = data.sys.country;
            let icon = data.weather[0].icon;
            let longitude = data.coord.lon;
            let latitude = data.coord.lat;
            let oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=en&exclude=minutely,alerts&appid=${apiKey}`;
            let iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png';
            let iconImg = document.createElement('img');

            iconImg.src = iconUrl;
            iconImg.alt = weather;

            let iconImgContainer = document.createElement('div');
            iconImgContainer.classList.add('iconImgContainer');
            iconImgContainer.appendChild(iconImg);

            let cityContainer = document.createElement('div');
            cityContainer.classList.add('cityContainer');
            cityContainer.innerHTML = city + ', ' + country;

            let weatherContainer = document.createElement('div');
            weatherContainer.classList.add('weatherContainer');
            weatherContainer.innerHTML = weather;

            let tempContainer = document.createElement('div');
            tempContainer.classList.add('tempContainer');
            tempContainer.innerHTML = tempCelsiusRound + '&deg;C / ' + tempFahrenheitRound + '&deg;F';

            let currentCityCard = document.createElement('div');
            currentCityCard.classList.add('currentCityCard');

            currentCityCard.appendChild(cityContainer);
            currentCityCard.appendChild(weatherContainer);
            currentCityCard.appendChild(tempContainer);
            currentCityCard.appendChild(iconImgContainer);

            output.appendChild(currentCityCard);

            return fetch(oneCallAPI)
        }
        )
        .then(function(response) {
            return response.json();
        }
        )
        .then(function(data) {
            let fiveDaysContainer = document.createElement('div');
            fiveDaysContainer.classList.add('fiveDaysContainer');
            output.appendChild(fiveDaysContainer);
            
            for (let [index, element] of data.daily.entries()) {
                if (index < 6){
                    let date = element.dt;
                    let dateString = new Date(date * 1000);
                    let dateStringDay = dateString.toDateString();
                    let icon = element.weather[0].icon;
                    let iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png';
                    let iconImg = document.createElement('img');
                    let tempMin = element.temp.min;
                    let tempMax = element.temp.max;
                    let humidity = element.humidity;
                    let description = element.weather[0].description;
    
                    iconImg.src = iconUrl;
                    iconImg.alt = description;
    
                    let iconImgContainer = document.createElement('div');
                    iconImgContainer.classList.add('iconImgContainer');
                    iconImgContainer.appendChild(iconImg);
    
                    let dateContainer = document.createElement('div');
                    dateContainer.classList.add('dateContainer');
                    dateContainer.innerHTML = dateStringDay;
    
                    let tempMinContainer = document.createElement('div');
                    tempMinContainer.classList.add('tempMinContainer');
                    tempMinContainer.innerHTML = 'Min : ' + tempMin + '&deg;C';
    
                    let tempMaxContainer = document.createElement('div');
                    tempMaxContainer.classList.add('tempMaxContainer');
                    tempMaxContainer.innerHTML = 'Max : ' + tempMax + '&deg;C';
    
                    let humidityContainer = document.createElement('div');
                    humidityContainer.classList.add('humidityContainer');
                    humidityContainer.innerHTML = 'Humidity : ' + humidity + '%';
    
                    let descriptionContainer = document.createElement('div');
                    descriptionContainer.classList.add('descriptionContainer');
                    descriptionContainer.innerHTML = description;
    
                    let cityCard = document.createElement('div');
                    cityCard.classList.add('cityCard');
    
                    cityCard.appendChild(dateContainer);
                    cityCard.appendChild(tempMinContainer);
                    cityCard.appendChild(tempMaxContainer);
                    cityCard.appendChild(humidityContainer);
                    cityCard.appendChild(descriptionContainer);
                    cityCard.appendChild(iconImgContainer);
    
                    fiveDaysContainer.appendChild(cityCard);

                }}})
        .catch(function(error) {
            console.log(error);
        }
        );
}
);

/* ----- Reset input after submit */

let resetInput = function() {
    input.value = '';
}

button.addEventListener('click', resetInput);
clearBtn.addEventListener('click', resetInput);