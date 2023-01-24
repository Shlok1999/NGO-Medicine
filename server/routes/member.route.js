const router = require('express').Router();
const mysql = require('mysql');
const connection = require('../db/conn');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const session = require('express-session');
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

router.post('/signup', (req, res) => {
    const f_name = req.body.f_name;
    const l_name = req.body.l_name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;

    connection.query(`insert into member values(?,?,?,?,?)
    ;`, [f_name, l_name, email, password, address],
        (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result);
            }
        })

})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        connection.query(`select * from member where email=? and password = ?`,
            [email, password], (err, result) => {
                if (err) {
                    res.send("Invalid Credentials");
                }
                if (result) {
                    req.session.loggedin = true;
                    req.session.userData = result[0];
                    res.status(200).send(result)
                    console.log("Member Logged In")
                }
                else {
                    res.send("Invalid Credentials")
                }
            })
    }
})

router.post('/add-medicine', (req, res)=>{
    const id = req.body.id;
    const nameOfMedicine = req.body.nameOfMedicine;
    const Quantity = req.body.Quantity;
    const ExpiryDate = req.body.ExpiryDate;
    const donorName = req.body.donorName;
    if(req.session){
        connection.query(`insert into medicine values(?,?,?,?,?);`, [id, nameOfMedicine, Quantity, ExpiryDate, donorName]
        ,(err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        res.send("User Logged Out")
    }
})


module.exports = router;