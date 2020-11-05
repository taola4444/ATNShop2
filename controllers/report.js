// var express = require('express');
// var router = express.Router();
// var configHeader = require("../configs/config_Header");
// var mongoose = require('mongoose');
// var Product = require('../models/product');
// var session = require('express-session');


// const dbname = 'shopbebe';
// const uri = 'mongodb+srv://phuc:khieVuk2ZM11p2s4@cluster0.skjiy.mongodb.net/shopbebe?retryWrites=true&w=majority';

// /// --- Code CONTROLLERs
// router.use(function timeLog (req, res, next) {
//     console.log('\n\t Product report - Time: ', Date.now());
//     next();
// })
// router.get('/', reportPage);
// function reportPage(req, res) {
//     if(session.user){
//         res.render("pages/report",  {
//             title: "ATN-Shop Report page", 
//             username: session.user.username
//             , configHeader: configHeader , currpage: "Report"
//             });
//     }
    
// }

// module.exports = router;