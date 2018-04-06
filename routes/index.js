var express = require('express');
var router = express.Router();
var Cafe = require('../models/cafe');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET cafes page. */
router.get('/cafes', function(req, res, next) {
    res.render('cafes', { title: 'Ajax Demo', layout: 'layout1' });
});

router.get("/setup-db", function(req, res) {

    var cafes = [{
        Name: "Афродіта",
        Adress: "шосе Хмельницьке, 19а",
        Contacts: "+38 (03849) 2-75-36"
    }];
    var cafes = [{
        Name: "Lumore",
        Adress: "вулиця Огієнка, 49",
        Contacts: "+38 (096) 402-63-03"

    }];
    var cafes = [{
        Name: "У старого друга",
        Adress: "вулиця Князів Коріатовичів, 14к",
        Contacts: "+38 (097) 909-97-22"

    }];
    var cafes = [{
        Name: "Кава від поліцмейстера",
        Adress: "вулиця Старобульварна, 8",
        Contacts: "067 713 0469"
    }];
    var cafes = [{
        Name: "Бломанже",
        Adress: "вулиця Уральська, 4а",
        Contacts: "096 503 0022"
    }];

    Cafe.remove({}, function(err) {
        if (err) {
            console.error(err);
        } else {

            for (let i = 0; i < cafes.length; i++) {
                Cafe.create(cafes[i], function(err, Cafe) {
                    if (err) console.error('Error: ' + err);
                    else console.log();
                });
            }
        }
    });
    res.status(200).json({
        message: "Okey",
    });

});
module.exports = router;