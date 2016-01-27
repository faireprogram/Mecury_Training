// var passportLocalMongoose = require('passport-local-mongoose');


// onsole.log(passportLocalMongoose);

var TestClass = function (a) {

    if(!a.statics) {
        a.statics = {};
    }
    a.statics.sayHello = function() {
        console.log(this);
    }

    this.a = a;
}


// var a = new TestClass({});

// a.a.statics.sayHello();

// var mongoose = require('mongoose');
// console.log(mongoose.Schema);

var passport = require('passport');
debugger;
console.log(passport.authenticate('local'));
