require('dotenv').config()
const express = require('express');
const mysql = require('mysql');

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

//create Database

app.get('/create',(req,res)=>{
    let sql="CREATE DATABASE nodemysql";
    db.query(sql,(err)=>{
        if(err){
            throw err;
        }
        res.send("Database created");
    });
});
//create table
app.get('/table',(req,res)=>{
    let sql = "USE nodemysql";
    db.query(sql,err=>{
        if(err){
            throw err;
        }
    });
    sql= "Create TABLE employee(id int AUTO_INCREMENT,ename VARCHAR(255),designation VARCHAR(255),PRIMARY KEY(id))"
    db.query(sql,err=>{
        if(err){
            throw err;
        }
        res.send("Table Created");
    });
});
//insert data
app.get('/employee1',(req,res)=>{
    let sql = "USE nodemysql";
    db.query(sql,err=>{
        if(err){
            throw err;
        }
    });

    let post = {ename:'sudhanshu',designation:"sd"};
    sql = "INSERT INTO employee SET ?";
    db.query(sql,post,err=>{
        if(err){
            throw err;
        }
    });
    res.send("employee Created");
})
//get data
app.get('/getemployee',(req,res)=>{
    let sql = "USE nodemysql";
    db.query(sql,err=>{
        if(err){
            throw err;
        }
    });
    sql = "SELECT * FROM employee";
    let query= db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send("fetched");
    });
})
//update table
app.get('/update',(req,res)=>{
    let sql = "USE nodemysql";
    db.query(sql,err=>{
        if(err){
            throw err;
        }
    });
    sql = "UPDATE employee SET ename ='xxx' WHERE id='1'";
    db.query(sql,err=>{
        if(err){
            throw err;
        }
        res.send("Table updated");
    });
});
//delete entry
app.get('/delete',(req,res)=>{
    let sql = "USE nodemysql";
    db.query(sql,err=>{
        if(err){
            throw err;
        }
    });
    sql = "DELETE FROM employee WHERE id='1'";
    db.query(sql,err=>{
        if(err){
            throw err;
        }
        res.send("deleted");
    });
});
app.listen('3030',()=>{
    console.log("server started");
});