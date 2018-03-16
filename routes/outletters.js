var express = require('express');
var router = express.Router();
var debug = require('debug')("node-lina:outletter");
var uuidv4 = require('uuid/v4');
var moment = require('moment');
var database = require('../modules/database');

var db = new database("MySQL");
var connection = db.open();

router.get('/',function(req, res, next){
    res.send("Outletter API");
});

router.get('/getNumber/:dept',function(req, res, next){
  debug("getNumber");
  
  let result = {};
  var sql = `select key_number from outletter where department=? order by created_date desc limit 1`;
  connection.query(sql,[req.params.dept], function(err, rows, field){
    if(err) throw err;
    if(rows.length){
      result = {
        key_number : rows[0].key_number
      }
    }else{
      result = {
        key_number : 0
      }
    }
    res.json(result);
  });
  
});

router.post('/', function(req, res, next){
  debug("post outletter");
  req.body.id = uuidv4();
  req.body.created_date = moment().format("YYYY-M-DD HH:mm:ss");
  let data = req.body;
  debug(req.body);

  let sql = `insert into outletter(id,sender,receiver,department,created_date,key_number,letter_number) 
  values(?,?,?,?,?,?,?)`;

  connection.query(sql,[data.id,data.sender,data.receiver,data.department,data.created_date,data.key_number,data.letter_number], function(err, rows, field){
    let result = {};
    if(err){
      result = {
        success: false,
        message: err.message
      }
    }else{
      result = {
        success: true,
        message: "Insert complete"
      }
    }

    res.json(result);
  });
})

module.exports = router;