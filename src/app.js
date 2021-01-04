const express = require('express');
const path = require('path');
const hbs = require('hbs');


const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const partialsPath = path.join(__dirname + '../../templates/partials');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '../../templates/views'));
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname + '../../public')));

app.get('', (req, res) => {
    res.render('index', { title: 'Weather', name: 'Aishwarya Surwase' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', name: 'Aishwarya Surwase' });
});

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', name: 'Aishwarya Surwase', message: 'This is help message' });
});

app.use('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, place_name } = {}) => {
        if (error) {
            return res.send({ error: error });
        }

        // console.log("Geocode Data: \n Longitude : " + longitude + " \n Latitude : " + latitude + "\n Location : " + place_name);
        forecast(req.query.address, '139fe2d61b408e0e27861310c045ae15', (error, forecastData) => {
            if (error) {
                return res.send({ error: error });
            }
            console.log('Forecast Data ', forecastData)
            res.send({
                location: place_name,
                forecastData: forecastData
            })
        })
    })

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aishwarya Surwase',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aishwarya Surwase',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("Connected to web server");
});