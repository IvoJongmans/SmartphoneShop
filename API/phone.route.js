const express = require('express');
const phoneRoutes = express.Router();

//models here
let Phone = require('./Phone');

//get all phones
phoneRoutes.route('/').get(function (req, res) {

    Phone.find(function(err, phones){
    if(err){
      res.json(err);
    }
    else {
      res.json(phones);
    }
  });
});

//get phone by #id
phoneRoutes.get('/:id', (req, res) => {
  var phoneID = req.params.id
  Phone.findById(phoneID)
  .then(phone => {
    res.json(phone)
  })
  .catch(err => {
    res.json({
      message: err
    })
  })
})

module.exports = phoneRoutes;