const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        required: true,
        default: "patient",

    },

    password: {
        type: String,
        // minlength: 6,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            default: "No token"
        }

    }]




})

UserSchema.methods.GenToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() },
            process.env.JWTSERCETKEY
        )
        this.tokens = this.tokens.concat({
            token
        })
        this.save()
        return token

    } catch (err) {
        return err;

    }

}
const User = mongoose.model('USER', UserSchema);

module.exports = User;