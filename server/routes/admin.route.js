const router = require('express').Router();
const mysql = require('mysql');
const connection = require('../db/conn');


router.post('/signup', (req, res)=>{
    const name = req.body.name;
    const regdNumber = req.body.regdNumber;
    const password = req.body.password

    connection.query(`insert into admin values(?,?,?)`, [name, regdNumber, password]
    , (err, result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})




module.exports = router;