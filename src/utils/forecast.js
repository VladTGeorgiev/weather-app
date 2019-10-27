const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/a33639af39e09017cf8de46ad4b4427f/${latitude},${longitude}?units=si`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to the weather service.');
		} else if (body.error) {
			callback(`Unable to find location. ${body.error}`);
		} else {
			callback(
				undefined,
				`${body.daily.data[0].summary} It is currently ${body.currently
					.temperature} degrees out. There is ${body.currently.precipProbability}% chance of rain.`
			);
		}
	});
};

module.exports = forecast;
