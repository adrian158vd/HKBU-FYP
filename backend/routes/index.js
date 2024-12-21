var express = require('express');
var router = express.Router();

/* GET home page. */
//get method 
router.get('/', function(req, res, next) {
  // index of view
  res.render('index', { title: 'Express' });
});

const { connectToDB, ObjectId } = require('../utils/db');

const { generateToken } = require('../utils/auth');




module.exports = router;