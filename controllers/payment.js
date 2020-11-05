var express = require('express');
var router = express.Router();
var configHeader = require("../configs/config_Header");
var mongoose = require('mongoose');
var Product = require('../models/product');
var session = require('express-session');
var multer = require('multer');
const { query } = require('express');
var storage = multer.diskStorage({
    destination: function (req, file, xcallback) {
        xcallback(null, 'public/images');
    },
    filename: function (req, file, xcallback) {
        xcallback(null, file.originalname);
    }
});
var uploadStore = multer({ storage: storage });

const dbname = 'shopbebe';
const uri = 'mongodb+srv://phuc:khieVuk2ZM11p2s4@cluster0.skjiy.mongodb.net/shopbebe?retryWrites=true&w=majority';

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Product controller - Time: ', Date.now());
    next();
})

router.get('/', payment);
function payment(req,res){
    var price = req.query.price;
    var name = req.query.name;
    var sl = req.query.soluong;
    var pricee = req.query.pricee;
    var id = req.query.id;
    var img = req.query.img;
    res.render("pages/payment", {title: "ATN-Shop Payment USER page", Notify: "",_img:img,_id:id,prices:price,names:name,pricees:pricee,soluongs:sl, configHeader: configHeader , currpage: "Payment" });
}
module.exports = router;