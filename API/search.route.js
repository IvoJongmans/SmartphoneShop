const express = require('express');
const searchRoutes = express.Router();

//models here
let Phone = require('./Phone');

//get search query from Url and repsond with correct JSON
searchRoutes.route('/').get(function (req, res) {

    const { brand, priceMin, priceMax } = req.query;
    let query = {};
    if (brand) {
        query.brand = brand;
    }
    if (priceMin && priceMax) {
        query.price = {$gte: priceMin, $lte: priceMax};
    }
    // if (priceMax) {
    //     query.price = {$lte: priceMax};
    // }
    console.log(query)
    Phone.find(query)
        .then(phones => {
            res.json(phones)
        })
        .catch()
});




module.exports = searchRoutes;