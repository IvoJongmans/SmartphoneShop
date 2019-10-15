const express = require('express');
const searchRoutes = express.Router();

//models here
let Phone = require('./Phone');

//get search query from Url and repsond with correct JSON
searchRoutes.route('/').get(function (req, res) {

    var brand = req.query.brand

    // res.json({brand})

    Phone.find({brand: brand})
    .then(phones => {
        res.json(phones)
    })
    .catch()
});

searchRoutes.get('/cart', (req, res) => {
    var phonesID = req.query._id

    Phone.find({_id : phonesID})
    .then(phones => {
        res.json({
            data: phones
        })
    })
    .catch()
})




module.exports = searchRoutes;