var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function (req, res, next) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            throw err;
        }

        db.collection('test').find({status: true}).sort({sort: 1}).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            res.render('db/index', {title: 'DB', result: result});
        });
    });
});
router.get('/:id', function (req, res, next) {
    var id = +req.params.id;
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            throw err;
        }
        db.collection('test').find({id: id}).limit(1).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length) {
                res.render('db/inner', {title: 'DB', obj: result.pop()});
            } else {
                res.status(404).render('error', {title: 'Ошибка', message: 'Несуществующий id', error: {}});
            }
        });
    });
});

module.exports = router;
