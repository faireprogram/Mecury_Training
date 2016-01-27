var express = require('express');
var router = express.Router();
var db = require('mongodb').MongoClient.connect('mongodb://localhost/test')
var Q = require('q')
var passport = require('passport');
var Account = require('../models/account.js');

router.post('/', function(req, res, next) {

    // delete user.isLogin;
    // // TODO, separate login and signup
    // db.then(function(db) {
    //         if (isLogin) {
    //             return db.collection('users').find(user).toArray();
    //         } else
    //             return db.collection('users').insert(user)
    //     }).then(function(users) {
    //         if (!isLogin || users.length > 0) {
    //             var defer = Q.defer();
    //             req.session.user = user;
    //             req.session.save(function(err) {
    //                 if (err) {
    //                     defer.reject(err);
    //                 } else {
    //                     defer.resolve(isLogin ? {
    //                         status: users.length > 0
    //                     } : user);
    //                 }
    //             });
    //             return defer.promise;
    //         }else{
    //             return {}
    //         }
    //     })
    //     .then(res.json.bind(res))
    //     .catch(function(err) {
    //         console.log('insert user fail', err);
    //         next(err);
    //     });

    debugger;

    var user = req.body;
    console.log('post user', user);
    var isLogin = user.isLogin || false;

    delete user.isLogin;

    if (!isLogin) {
        Account.register(new Account({
                username: user.username,
                email: user.email,
                verify: user.verify
            }),
            user.password,
            function(err, account) {
                console.log('after save', err, account);

                if (err) {
                    res.json({});
                } else {
                    passport.authenticate('local')(req, res, function() {
                        console.log("dddddddd");
                        res.json({
                            username: account.username
                        });
                    });
                }
            });
    } else {
        passport.authenticate('local')(req, res, function(err) {
            if (!err) {
                Account.findOne({
                    email: user.email
                }).exec(function(err, person) {
                    res.json({
                        username: person.username,
                        status: true
                    });
                });
            }
        });
    }

});

router.get('/', function(req, res, next) {
    // var username;
    // if (req.session.user) username = req.session.user.name;
    // res.json({
    //     username: username
    // })

    if (req.user) {
        res.json({
            username: req.user.username
        });
    } else {
        res.json({});
    }

});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function() {
        res.json({})
    })
});

router.get('/active/:activeid', function(req, res, next) {
    debugger
    var activeid = req.params.activeid;
    var query = {'verify.activeid': activeid};
    Account.update(query, {$set: {'verify.status': true}}, {multi: true}, function(err, numAffected) {
        console.log(numAffected);        
    }) 
});

module.exports = router;
