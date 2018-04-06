var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/index', function(req, res, next) {
    
    res.render('cafes', { title: 'Cafes' });
   // res.send('respond with a resource');
});

module.exports = router;