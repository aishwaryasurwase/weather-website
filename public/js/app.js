const weatherForm = document.querySelector('form');
const searchEl = document.querySelector('input');
const errorMessage = document.querySelector('#error');
const locationData = document.querySelector('#location');
const forecastData = document.querySelector('#forecastData');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = searchEl.value;
    errorMessage.textContent = 'Loading...';
    locationData.textContent = '';
    forecastData.textContent = '';
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                errorMessage.innerText = data.error;
                locationData.innerText = '';
                forecastData.innerText = '';
            } else {
                errorMessage.innerText = '';
                locationData.innerText = data.location;
                forecastData.innerHTML = JSON.stringify(data.forecastData);
            }
        })
    })
})