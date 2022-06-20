/* ----- Variables ----- */

let input = document.getElementById('cityInput');
let button = document.getElementById('btn');
let body = document.querySelector('body');
let output = document.getElementById('output');
let clearBtn = document.getElementById('clearbtn');
let nbClick=0;
let nbClickMax=2;
let apiKey = '4c0665f89ed0153262e09818da099b8d';

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
    let geocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
    fetch(geocodingUrl)
        .then(function(response) {
            return response.json();
        }
        )
        .then(function(data) {
            let lat = data.features[0].geometry.coordinates[1];
            let lon = data.features[0].geometry.coordinates[0];
            let apicall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;