var mysql = require('mysql');
var dotenv = require('dotenv').config({path: '../.env'});

function database(db_type){
    this.type = db_type;
    this.connection = null;

    this.open = function(){
        if(this.type == "MySQL"){
            console.log("Open MySQL");
            this.connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASS,
                database : process.env.DB_NAME
            });
            return this.connection;
        }else{
            console.log("Open another SQL");
        }
    }
}

module.exports = database;