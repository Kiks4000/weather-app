/* ----- Variables ----- */

let input = document.getElementById('cityInput');
let button = document.getElementById('btn');
let body = document.querySelector('body');
let output = document.getElementById('output');
let clearBtn = document.getElementById('clearbtn');
let nbClick=0;
let nbClickMax=2;

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

/* ----- Get the weather ----- */

button.addEventListener('click', function() {
    let city = input.value;
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=4c0665f89ed0153262e09818da099b8d';
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

            let cityCard = document.createElement('div');
            cityCard.classList.add('cityCard');

            cityCard.appendChild(cityContainer);
            cityCard.appendChild(weatherContainer);
            cityCard.appendChild(tempContainer);
            cityCard.appendChild(iconImgContainer);

            output.appendChild(cityCard);

            // i want to change the the bg color depending on the alt of the img

                if (iconImg.alt === 'Clear') {
                    cityCard.style.backgroundColor = 'rgb(102,187,221)';
                } else if (iconImg.alt === 'Clouds') {
                    cityCard.style.backgroundColor = 'rgb(160,160,160)';
                } else if (iconImg.alt === 'Rain') {
                    cityCard.style.backgroundColor = '#9099a1';
                } else if (iconImg.alt === 'Snow') {
                    cityCard.style.backgroundColor = '#fffafa';
                } else if (iconImg.alt === 'Mist', 'Haze') {
                    cityCard.style.backgroundColor = '#e6e6fa';
                } else if (iconImg.alt === 'Thunderstorm') {
                    cityCard.style.backgroundColor = '#001C3D';
                }
        }
        )
        .catch(function(error) {
            console.log(error);
        }
        );
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

