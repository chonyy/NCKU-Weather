if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const axios = require('axios')

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data))
    console.log(req.body)
})

app.listen(port, () => {
    console.log(DARKSKY_API_KEY)
    console.log('server started')
})