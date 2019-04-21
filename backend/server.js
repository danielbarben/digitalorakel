const express = require('express');
const router = require('./api/routes.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Server", "Nginx")
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(router)
//app.use(subdomain('api', router));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`)
})