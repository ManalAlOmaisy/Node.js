const express = require('express');
const axios = require('axios');

const router = express.Router()

router.get('/', (req, res) => {
    res.setHeader("Contetn-Type",'text/html');
    res.render('index')
    res.status(200)
});


router.post('/', (req, res) => {
    const API_KEY = require('../sources/keys.json').API_KEY;
    const cityName = req.body.cityName;
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
    
    .then(response =>{
        const tempData =Math.round(response.data.main.temp);
        const tempDesc = response.data.weather[0].description;
        const tempIcon = response.data.weather[0].icon;
        res.render('index', {
            weatherText: `${cityName}`, 
            weatherdegree:`${tempData}°C`, 
            weatherDesc: `${tempDesc}`, 
            weatherIcon:`${tempIcon}`,
            weatherData: true,
        })
    })
    .catch(err =>{
        res.render('index',{ weatherText: "City is not found!"})
    })

})

 module.exports = router