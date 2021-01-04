const request = require('request');
const forecast = (city, apiId, callback) => {

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Failed to connect weather service!', undefined);
        } else if (response.body.cod === 401) {
            callback(response.body.message, undefined);
        } else {
            callback(undefined, response.body);
        }
    })
}

module.exports = forecast;