var express = require('express');
var router = express.Router();
var configHeader = require("../configs/config_Header");
var mongoose = require('mongoose');
var Product = require('../models/product');
var session = require('express-session');
var configHeader = require("../configs/config_Header");
var configDB = require("../configs/config_DB");
const { MongoClient } = require('mongodb');

const dbname = 'shopbebe';
const uri = 'mongodb+srv://phuc:khieVuk2ZM11p2s4@cluster0.skjiy.mongodb.net/shopbebe?retryWrites=true&w=majority';

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Product report - Time: ', Date.now());
    next();
})
router.get('/', (req,res) => {
    if (session.user) {
    res.render("pages/report",  {title: "ATN-Shop report page",msg:'',username: session.user.username, configHeader: configHeader, currpage: "Report" });  
}else{
    res.redirect('/login');
}
});
router.post('/',reportPage);
function reportPage(req,res){
    require('dotenv').config();
    if(session.user){

const nodemailer = require('nodemailer');
const log = console.log;
        var fullname1 = "";
        var bophan1 = "";
        var chinhanh1 = "";
        var sanphambanchay1 = ""
        var soluong1 = "";
        var sanphambankhongchay1 = "";
        var total1 = "";

if(req.body.fullname){
    fullname1 = req.body.fullname;
}
if(req.body.bophan){
    bophan1 = req.body.bophan;
}
if(req.body.chinhanh){
    chinhanh1 = req.body.chinhanh;
}
if(req.body.sanphambanchay){
    sanphambanchay1 = req.body.sanphambanchay;
}
if(req.body.soluong){
    soluong1 = req.body.soluong;
}
if(req.body.sanphambankhongchay){
    sanphambankhongchay1 = req.body.sanphambankhongchay;
}
if(req.body.total){
    total1 = req.body.total;
}
console.log(fullname1);
        if(session.user){
            MongoClient.connect(uri, function(err, db) {
                if (err) throw err;
                var dbo = db.db("shopbebe");
                array = {
                    fullname : fullname1,
                    bophan : bophan1,
                    chinhanh: chinhanh1,
                    sanphambanchay1: sanphambanchay1,
                    soluong : soluong1,
                    sanphambankhongchay: sanphambankhongchay1,
                    total: total1
                };
                dbo.collection("Report").insertOne(array, function(err, res) {
                  if (err) throw err;
                  console.log("Report submit");
                  db.close();
                });
              });
              let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'abcdefghjk2707@gmail.com' , // 
                    pass: 'P12345678' // TODO: your gmail password 
                }
            });
            let mailOptions = {
                from: 'abcdefghjk2707@gmail.com', // TODO: email sender
                to: 'nguyenphuc12a6@gmail.com' , // TODO: email receiver
                subject: 'The director has a new announcement',
                text: 'Full name: ' + fullname1 + 'Position: ' + bophan1 + 'at branch ' + chinhanh1 + 'submitted report!!!'
            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    return log('Error occurs' + err);
                }else{
                    return log('Email sent!!!');
                }
            });
        }

        }
        res.render("pages/report",  {
            title: "ATN-Shop report page", msg:'Submit report success!!!',
            username: session.user.username,
             configHeader: configHeader , currpage: "Report"
            });
        

    
}

module.exports = router;




