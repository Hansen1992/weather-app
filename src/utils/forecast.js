const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2bfebcd14a46495f82dc7c8a222e1ba6/' + latitude + ',' + longtitude + '?lang=da'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Kunne ikke tilslutte til vejr-service', undefined)
        } else if (body.error) {
            callback('Kunne ikke finde vejrudsigt, prøv en anden søgning', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' Det er ' + body.currently.temperature + ' grader udenfor. Der er ' + body.currently.precipProbability + '%' + ' chance for regn.' + body.currently.icon)
        }
    })
}

module.exports = forecast