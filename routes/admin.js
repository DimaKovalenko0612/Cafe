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

router.get('/cafes-add', function(req, res, next) { //Додати  
    res.render('admin/cafes-add', {
        layout: 'admin/layout',
        title: 'Add Cafe'
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

router.get('/cafes-edit/:id', function(req, res) { //редагувати  
    Cafe.findById(req.params.id, function(err, cafes) {
        if (err) {
            //console.log(res);
            console.error(err);
            res.render('admin/Cafe-res', { title: 'Error', message: err });
        } else {
            res.render('admin/cafes-edit', {
                layout: 'admin/layout',
                title: 'Delete Cafe',
                cafes: cafes
            });
        }
    });
});

router.post('/cafes-edit/:id', function(req, res) { //Результат редагування країни 
    Cafe.remove({_id: req.params.id }, function(err) {
        if (err) {                        
            console.error(err);
            res.render('admin/Cafe-res', { title: 'Error', message: err });
        } else {
            Cafe.remove({_id: req.params.id});
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
                        message: 'Cafe edit succesfully'
                    });
            });
        }
    });
});

router.get('/cafes-delete/:id', function(req, res, next) { //Видалити     
    Cafe.findById(req.params.id, function(err, cafes) {
        if (err) {
            //console.log(res);
            console.error(err);
            res.render('admin/Cafe-res', { title: 'Error', message: err });
        } else {
            res.render('admin/cafes-delete', {
                layout: 'admin/layout',
                title: 'Delete Cafe',
                cafes: cafes
            });
        }
    });
});

router.post('/cafes-delete/:id', function(req, res) { //Результат додавання країни 
    Cafe.remove({ _id: req.params.id }, function(err) {
        if (err) {                                   
            //console.log(req.params);
            console.error(err);
              res.render('admin/Cafe-res', { title: 'Error', message: err });
        } else {           
            Cafe.remove({
                _id: req.params.id  ,          
            }, function(err, Cafe) {
                if (err) {
                    console.error('Error: ' + err);
                    res.render('admin/Cafe-res', { title: 'Error І', message: err });
                } else
                    res.render('admin/Cafe-res', {
                        title: 'Super: ',
                        message: 'Cafe delete succesfully'
                    });
            });
         }
    });
});

module.exports = router;