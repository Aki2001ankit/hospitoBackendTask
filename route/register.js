const User = require('../model/userschema')
const bcrypt = require("bcrypt");
const Registeruser = async(req, res, next) => {
    try {
        const { name, email, role, password } = req.body;
        const ifuserpresent = await User.findOne({ email: email });
        if (ifuserpresent) {
            return res.status(401).send("User already exist");
        } else {
            const hashpassword = await bcrypt.hash(password, 10)
            const user = new User({ name, email, role, password: hashpassword })
            const result = await user.save();
            if (result) {
                return res.status(201).send("Registered Successfully")

            } else {
                return res.status(400).send("unable to register")
            }

        }


    } catch (err) {
        return res.status(400).send(err.message)
    }
}

module.exports = { Registeruser }