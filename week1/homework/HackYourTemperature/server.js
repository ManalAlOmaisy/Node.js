const express = require('express');
const express_Handlebars = require('express-handlebars');
const axios = require('axios');

const app = express();

//create a route

app.get('/', (req, res) => {

    res.send('<h1>hello from backend to frontend!</h1>')
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));