var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dotenv = require('dotenv').config({path: '../.env'});
var debug = require('debug')("node-lina:outletter");

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

router.get('/',function(req, res, next){
    res.send("Outletter API");
    
});

router.get('/getNumber/:dept',function(req, res, next){
  debug("getNumber");

  let result = {};
  var sql = `select key_number from outletter where department=? order by created_date desc limit 1`;
  connection.query(sql,[req.params.dept], function(err, rows, field){
    if(err) throw err;
    result = {
      key_number : rows[0].key_number
    }

    res.json(result);
  });
  
});

module.exports = router;