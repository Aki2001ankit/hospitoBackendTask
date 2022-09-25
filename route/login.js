const User = require('../model/userschema')
const bcrypt = require("bcrypt");
const Logintoaccount = async(req, res, next) => {
    try {
        const { email, password } = req.body
        const userlogin = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (isMatch) {
            let token = await userlogin.GenToken();

            res.cookie("jwtoken", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60)
            })
            return res.status(201).send({ data: "login successfully" })

        } else {

            return res.status(401).send("invalid login credentials");
        }


    } catch (err) {
        return res.status(401).send("invalid login credentials");
    }
}

module.exports = { Logintoaccount }



// if (password === userlogin.password) {
//     const updatetoken = await User.findOneAndUpdate({ email: email }, { token: token }, { new: true });
//     const saveupdatetoken = await result.save()


// } else {

//     return res.send("invalid login credentials").status(401);
// }