var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db = MongoClient.connect('mongodb://localhost/test');

/* GET home page. */
router.get('/user', function(req, res, next) {
    console.log('Post /user XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    db.then(function(db) {
        return db.collection('customer').find().toArray();
    }).then(res.json.bind(res)).catch(function(err) {
        console.log(err);
        next(err);
    })

});

router.post('/user', function(req, res, next) {
    console.log('Get /user XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    var user = req.body;
    console.log(user);
    db.then(function(db) {
        return db.collection('customer').insert(user);
    }).then(function() {
        // console.log("req.xhr", req);
        if (req.xhr) {
            console.log(user);
            res.json(user);
        } else {
            res.redirect("/");
        }
    }).catch(function(err) {
        console.log(err);
        next(err);
    })

});


router.delete('/user/:userId', function(req, res, next) {
    var userid = ObjectId(req.params.userId);
    console.log('delete Id', userid);
    db.then(function(db) {
        return db.collection('customer').remove({
            _id: userid
        });
    }).then(res.json.bind(res)).catch(function(err) {
        console.log(err);
        next(err);
    })

});


router.put('/user', function(req, res, next) {
    var user = req.body;
    var uid = user._id;
    delete user._id;
    console.log('UPDATE ', user);
    db.then(function(db) {
        return db.collection('customer').update({
            _id: ObjectId(uid)
        }, user);
    }).then(function() {
        user._id = uid;
        res.json(user);
    }).catch(function(err) {
        console.log(err);
        next(err);
    })
});


module.exports = router;
