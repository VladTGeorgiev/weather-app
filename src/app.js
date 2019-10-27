const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials/');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Vlad'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Vlad'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'Here is some help',
		title: 'Help',
		name: 'Vlad'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!'
		});
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
                return res.send({ error });
            }
            	res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            });
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'Search term must be provided'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Article not found',
		name: 'Vlad'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found',
		name: 'Vlad'
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
