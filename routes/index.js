var express = require('express');
var router = express.Router();
var Cafe = require('cafe');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET cafes page. */
router.get('cafes', function(req, res, next) {
    res.render('cafes', { title: 'Ajax Demo', layout: 'layout1' });    
});

router.get("/setup-db", function(req, res) {

    var cafes = [
        {
            Name : "Кава від поліцмейстера",
            Adress: "вулиця Старобульварна, 8",
            Contacts: "067 713 0469"
        }
    ];

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