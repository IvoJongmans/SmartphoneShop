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
    if (priceMin) {
        query.price = {$gte: priceMin};
    }
    if (priceMax) {
        query.price = {$lte: priceMax};
    }
    // const items = await Items.find(query);
    // var brands = req.query.brand
    // var price_min = req.query.priceMin
    // var price_max = req.query.priceMax


    // console.log(price_min)
    // res.json({brand})

    Phone.find(query)
        .then(phones => {
            res.json(phones)
        })
        .catch()
});




module.exports = searchRoutes;