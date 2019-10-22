const express = require('express');
const paymentRoutes = express.Router();
const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: 'test_stya7g8C4aTytKxcVrsjDsb9nd5Cnb' });

//models here

paymentRoutes.route('/').get(function (req, res) {

 

  (async () => {

    var value = req.query.value
    var payment_method = req.query.method
    var description = req.query.description


    try {
      const payment = await mollieClient.payments.create({
        amount: {
          currency: 'EUR',
          value: value, // You must send the correct number of decimals, thus we enforce the use of strings
        },
        method: payment_method,
        description: 'Order at Smartphoneshop',
        redirectUrl: 'http://127.0.0.1:8080',
        webhookUrl: 'https://webshop.example.org/payments/webhook/',
        metadata: {
          order_id: '12345',
        },
      });
  
      res.json({payment})
    } catch (error) {
      res.json({error})
    }
  })();

 
});




module.exports = paymentRoutes;