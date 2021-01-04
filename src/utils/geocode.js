const request = require('request');

const geocoding = (address, cb) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiYWlzaHdhcnlhc3Vyd2FzZSIsImEiOiJja2l4ZGU1bncxM3IzMnRuenE1NWUwZmVoIn0.JynC4yUJ47bxAyWDhssBog&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            cb('Failed to connect geocode service!', undefined);
        }
        else if (body.message || body.features.length == 0) {
            cb(body.message || 'Not found', undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const place_name = body.features[0].place_name;

            cb(undefined, { longitude, latitude, place_name });
        }
    })
}

module.exports = geocoding;