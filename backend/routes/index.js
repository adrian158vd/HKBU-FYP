var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


/* Handle the Form */
router.post('/bookings', async function (req, res) {

  var response = {
      headers: req.headers,
      body: req.body
  };

  res.json(response);    
});