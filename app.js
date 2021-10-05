require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const util = require('util');

//create connection 
const db= mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT
});


db.connect(err=>{
    if(err){
        throw err;
    }
    console.log("connected");
});

const app=express();
const query = util.promisify(db.query).bind(db);

//create Database

app.get('/create',async (req,res)=>{
    let sql="CREATE DATABASE nodemysql";
    await query(sql)
    res.send("Database created");
});
//create table
app.get('/table',async (req,res)=>{
    let sql = "USE nodemysql";
    await query(sql);
    sql= "Create TABLE employee(id int AUTO_INCREMENT,ename VARCHAR(255),designation VARCHAR(255),PRIMARY KEY(id))"
    await query(sql)
    res.send("Table Created");
});
//insert data
app.get('/employee1',async (req,res)=>{
    let sql = "USE nodemysql";
    await query(sql);

    let post = {ename:'sudhanshu',designation:"sd"};
    sql = "INSERT INTO employee SET ?";
    await query(sql,post);
    res.send("employee Created");
})
//get data
app.get('/getemployee',async (req,res)=>{
    let sql = "USE nodemysql";
    await query(sql);
    sql = "SELECT * FROM employee";
    var result = await query(sql);
    console.log(result);
    res.send("fetched");
})
//update table
app.get('/update',async (req,res)=>{
    let sql = "USE nodemysql";
    await query(sql);
    sql = "UPDATE employee SET ename ='xxx' WHERE id='1'";
    await query(sql)
    res.send("Table updated");
});
//delete entry
app.get('/delete',async (req,res)=>{
    let sql = "USE nodemysql";
    await query(sql);
    sql = "DELETE FROM employee WHERE id='1'";
    await query(sql)
    res.send("deleted");
});
app.listen('3030',()=>{
    console.log("server started");
});