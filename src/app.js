const path = require('path');
const express = require('express');
const hbs = require('hbs')

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials/')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vlad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vlad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Here is some help',
        title: 'Help',
        name: 'Vlad'
    })
})

app.get('/weather', (req, res) => {
	res.send({
		location: 'London',
		forecast: 'Cloudy'
	});
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: 'Article not found',
        name: "Vlad"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: 'Page not found',
        name: "Vlad"
    })
})

app.listen(3000, () => {
	console.log('Server running on port 3000.');
});
