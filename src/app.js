const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Vejret',
        name: 'Martin Hansen'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Omkring os',
        name: 'Martin Hansen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hjælp',
        name: 'Martin Hansen',
        aidText: 'Hvad kan vi hjælpe dig med?'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
    return res.send({
        error: 'Du mangler at angive en adresse'
    })
}

geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
    if(error) {
    return res.send({error})
    }
    forecast (latitude, longtitude, (error, forecastData) => {
        if (error) {
            return res.sendt({ error })
        }
        res.send({
            forecast: forecastData,
            location, 
            address: req.query.address
        })
    })
})
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Martin Hansen',
        errorMessage: 'Siden "Omkring os" blev ikke fundet'
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Du skal angive et søgekriterie'
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Martin Hansen',
        errorMessage: 'Siden "hjælp" blev ikke fundet'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Martin Hansen',
        errorMessage: 'Siden blev ikke fundet'
    })
})
//starts up the server when called
app.listen(port, () => {
    console.log('Serveren er oppe på port' + port)
}) 
