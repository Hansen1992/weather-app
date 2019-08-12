const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFuc2VuOTIiLCJhIjoiY2p5cm4xcWw5MGJ0MjNubm95aWRucHF0YiJ9.dDN4bMuDhPAMVMgmMjdw_w&language=da'
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Kunne ikke tilslutte til lokation-service')
        } else if (body.features.length === 0) {
            callback('Kunne ikke finde lokation, prøv et andet søgeord', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode