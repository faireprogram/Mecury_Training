var express = require('express');
var router = express.Router();
var db = require('mongodb').MongoClient.connect('mongodb://localhost/test');


router.post('/', function(req, res, next) {
    var user = req.body;
    console.log('user', user);
    var isLogin = user.isLogin || false;
    delete user.isLogin;
    // TODO, login and signup
    db.then(function(db) {
        console.log(user);
        if(isLogin) {
            return db.collection('users').find(user).toArray();
        } else {
             //return db.collection('users').insert(user);
            db.collection('users').insert(user);
        }
    }).then(function(users){
        if(isLogin) {
          res.json({status: users.length > 0});
        } else res.json(user);
    }).catch(function(err){
        console.log('inser user fail', err);
        next(err);
    });
});

module.exports = router;

