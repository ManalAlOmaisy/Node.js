const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: "main"}));

app.use(express.static('public'));


const routes = require("./routes/weather")
app.use(routes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));