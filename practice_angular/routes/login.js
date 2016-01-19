var express = require('express');
var router = express.Router();
var db = require('mongodb').MongoClient.connect('mongodb://localhost/test');
var Q = require('q');

router.post('/', function(req, res, next) {
    var user = req.body;
    // console.log('user', user);
    var isLogin = user.isLogin || false;
    delete user.isLogin;
    console.log('req.xhr', !!req.xhr);

    // TODO, login and signup
    db.then(function(db) {
        if (isLogin) {
            return db.collection('users').find(user).toArray();
        } else {
            //return db.collection('users').insert(user);
            db.collection('users').insert(user);
        }
    }).then(function(users) {

        var defer = Q.defer();
        req.session.user = user;
        req.session.save(function(err) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(isLogin ? {
                    status: users.length > 0
                } : user);
            }
        });
        return defer.promise;
    }).then(res.json.bind(res))
      .catch(function(err) {
        console.log('inser user fail', err);
        next(err);
    });

});

router.get('/', function(req, res, next) {
    var username;
    console.log('Path', req.originalUrl);
    console.log('user', req.session.user);
    if(req.session.user) {
        username = req.session.user.name;
    } 
    res.json({username: username});
});


router.get('/logout', function(req, res, next) {
    req.session.destroy(function() {
        res.json({});
    }); 
})
module.exports = router;
