const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// pbkdf2 hashing algorithm is getting implemented by passport-local-mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
    // username, password field banane ki no need coz passport-local-mongoose implements these itself
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);