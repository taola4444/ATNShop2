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
router.post('/',reportPage);
router.get('/',reportPage);
function reportPage(req,res){
    require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;
    if (session.user) 
    {
        var fullname1 = "";
        var bophan1 = "";
        var chinhanh1 = "";
        var sanphambanchay1 = ""
        var soluong1 = "";
        var sanphambankhongchay1 = "";
        var total1 = "";

if(req.query.fullname){
    fullname1 = req.query.fullname;
}
if(req.query.bophan){
    bophan1 = req.query.bophan;
}
if(req.query.chinhanh){
    chinhanh1 = req.query.chinhanh;
}
if(req.query.sanphambanchay){
    sanphambanchay1 = req.query.sanphambanchay;
}
if(req.query.soluong){
    soluong1 = req.query.soluong;
}
if(req.query.sanphambankhongchay){
    sanphambankhongchay1 = req.query.sanphambankhongchay;
}
if(req.query.total){
    total1 = req.query.total;
}
console.log(fullname1);
            if(fullname1 != ""){
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
            res.render("pages/report",  {
                title: "ATN-Shop report page", 
                username: session.user.username,
                 configHeader: configHeader , currpage: "Report"
                });
            
    }
    else{
        res.redirect('/login');
    }
        

    
}

module.exports = router;




