const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extends:true}));

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nani@1804',
    database:'testcrud'
});

app.get("/api/get",(req, res)=>{
    const sqlGet = "select * from user";
    db.query(sqlGet,(error, result)=>{
        res.send(result);
    });
});

app.post("/api/post", (req, res) =>{
    const {firstname, lastname, username, password, email} = req.body;
    const sqlInsert = "insert into user (firstname, lastname, username, password, email) values (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [firstname, lastname, username, password, email], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) =>{
    const { id } = req.params;
    const sqlRemove = "delete from user where id = ?";
    db.query(sqlRemove, id, (error, result) =>{
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id",(req, res)=>{
    const { id } = req.params;
    const sqlGet = "select * from user where id = ?";
    db.query(sqlGet,id, (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.put("/api/update/:id",(req, res)=>{
    const { id } = req.params;
    const { firstname, lastname, username, password, email } = req.body;
    const sqlUpdate = "update user set firstname = ?, lastname = ?, username = ?, password = ?, email = ? where id=?";
    db.query(sqlUpdate,[firstname, lastname, username, password, email, id], (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});



app.listen(8080, ()=>{
    console.log("Listening Server")
});