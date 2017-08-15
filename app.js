const express = require('express');
let bodyParser = require('body-parser');
const path = require('path');
let methodOverride = require("method-override");
let favicon = require('serve-favicon');

const port = process.env.PORT || 2323;

let app = express();


//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Method Override
app.use(methodOverride("_method"));

//MiddleWares estaticos
//Se hace para usar CSS-JS-etc
app.use(express.static(path.join(__dirname, 'public')));

//favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// Routes
const routes = require('./routes/routes');

app.use(routes);

//view engine
app.set("view engine", "pug");


app.listen(port, function (err) {
    console.log(`Server running in ${port}`);
});
