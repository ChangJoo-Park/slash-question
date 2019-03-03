var express = require('express');
const { questions } = require('../store')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', questions });
});

module.exports = router;
