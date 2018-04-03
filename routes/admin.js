var express = require('express');
var router = express.Router();
var Cafe = require('../models/cafe');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //Виводим меню адміна
    res.render('admin/index', {
        layout: 'admin/layout',
        title: 'Admin Panel'
    });
});

router.get('/cafes', function(req, res, next) {
    Cafe.find({}, function(err, cafes) {
        if (err) {
            console.error('Error: ' + err);
            res.render('admin/Cafe-res', {
                title: 'Error І',
                message: err
            });
        } else {
            res.render('admin/cafes', {
                layout: 'admin/layout',
                title: 'Add Cafe',
                cafes: cafes
            });
        }
    });
});

router.get('/cafes-add', function(req, res, next) { //Додати/редагувати країну    
    res.render('admin/cafes-add', {
        layout: 'admin/layout',
        title: 'Add Cafe'
    });
});

router.get('/cafes-delete', function(req, res, next) { //Видалити країну    
    res.render('admin/cafes-delete', {
        layout: 'admin/layout',
        title: 'Delete Cafe '+req.body.CafeName
        });
});

router.post('/cafes-add', function(req, res) { //Результат додавання країни
    Cafe.remove({ Name: req.body.CafeName }, function(err) {
        if (err) {
            console.error(err);
            res.render('admin/Cafe-res', { title: 'Error', message: err });
        } else {
            Cafe.create({
                Name: req.body.CafeName,
                Adress: req.body.CafeAdress,
                Contacts: req.body.CafeContacts,
            }, function(err, Cafe) {
                if (err) {
                    console.error('Error: ' + err);
                    res.render('admin/Cafe-res', { title: 'Error І', message: err });
                } else
                    res.render('admin/Cafe-res', {
                        title: 'Super: ',
                        message: 'Cafe added to DB succesfully'
                    });
            });
        }
    });
});

router.post('/cafes-delete', function(req, res) { //Результат Видалення країни
    Cafe.remove({ Name: req.body.CafeName }, function(err) {
        if (err) {
            console.error(err);
            res.render('admin/cafes-delete', { title: 'Error', message: err });
        } else {
            console.log(req.body.CafeName);
            Cafe.remove({
                      Name: req.body.CafeName                                    
            }, function(err, Cafe) {
                if (err) {
                    console.error('Error: ' + err);
                    res.render('admin/cafes-delete', { title: 'Error І', message: err });
                } else
                    res.render('admin/cafes-delete', {
                        title: 'Super: ',
                        message: 'Cafe remove from DB succesfully'
                    });
            });
        }
    });
});

module.exports = router;