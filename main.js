let input = document.querySelector('input');

input.addEventListener('focus', function() {
    input.value = 'Enter a city name here';
}
);

function myFocus(element) { 
    if (element.value == element.defaultValue) 
    { element.value = ''; } } 
    
    function myBlur(element) 
    { if (element.value == '') 
    { element.value = element.defaultValue; } } 

myFocus(input);