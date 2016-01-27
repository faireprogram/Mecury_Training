var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var AccountSchema = new Schema({
    username: String,
    email: String,
    password: String,
    verify: {status: Boolean, activeid: String}
});

AccountSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

// console.log(AccountSchema);


module.exports = mongoose.model('login', AccountSchema);

