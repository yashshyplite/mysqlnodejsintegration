require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const util = require('util');
var LiveSelect = require('@vlasky/mysql-live-select');
//create connection 
const liveDb= new LiveSelect({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'nodemysql',
    port: process.env.MYSQL_PORT
},err=>{
    if(err){
        throw err;
    }
    console.log("connected");}
);

liveDb.select('select * from employee', null,
LiveMysqlKeySelector.Columns(['id']), [ {
  table: 'employee',
  database: 'nodemysql'
} ]).on('update', function(diff, data){
  console.log("data ------------------>\n",diff);
});

const app=express();
// const liveDb.db.query = util.promisify(liveDb.db.liveDb.db.query).bind(db);

//create Database

app.get('/create',(req,res)=>{
    let sql="CREATE DATABASE nodemysql";
     liveDb.db.query(sql)
    res.send("Database created");
});
//create table
app.get('/table', (req,res)=>{
    let sql = "USE nodemysql";
     liveDb.db.query(sql);
    sql= "Create TABLE employee(id int AUTO_INCREMENT,ename VARCHAR(255),designation VARCHAR(255),PRIMARY KEY(id))"
     liveDb.db.query(sql)
    res.send("Table Created");
});
//insert data
app.get('/employee1', (req,res)=>{
    let sql = "USE nodemysql";
     liveDb.db.query(sql);

    let post = {ename:'bhuvnesh',designation:"backend developer"};
    sql = "INSERT INTO employee SET ?";
    liveDb.db.query(sql,post);
     
    res.send("employee Created");
})
//get data
app.get('/getemployee', (req,res)=>{
    // let sql = "USE nodemysql";
    // liveDb.db.query(sql);
    let sql = "SELECT * FROM employee";
    liveDb.db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log("table->>>>>>>>>>>>>>>>>\n",result);
        res.send("fetched");
    });
    
})
//update table
app.get('/update', (req,res)=>{
    // let sql = "USE nodemysql";
    //  liveDb.db.query(sql);
    let sql = "UPDATE employee SET ename ='bhuvnesh patnaik' WHERE id='44'";
     liveDb.db.query(sql)
    res.send("Table updated");
});
//delete entry
app.get('/delete', (req,res)=>{
    // let sql = "USE nodemysql";
    //  liveDb.db.query(sql);
    let sql = "DELETE FROM employee WHERE id='55'";
     liveDb.db.query(sql)
    res.send("deleted");
});
app.listen('3030',()=>{
    console.log("server started");
});