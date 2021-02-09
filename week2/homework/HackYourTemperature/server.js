const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const path = require('path')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

//create a route

app.get('/', (req, res) => {
    res.setHeader("Contetn-Type",'text/html');
    res.render('index')
    res.status(200)
});

app.post('/weather', (req, res) => {
    const cityName = req.body.cityName
    res.send(cityName);
 })


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));