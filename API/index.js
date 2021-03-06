const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const phoneRoute = require('./phone.route');
const searchRoute = require('./search.route');
const paymentRoute = require('./payment.route');


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { 
    console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/phones', phoneRoute);
app.use('/search', searchRoute);
app.use('/payment', paymentRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});