const User = require('../model/userschema');
const jwt = require("jsonwebtoken");

const AdminApi = async(req, res, next) => {
    try {

        const userpresent = await User.findOne({ email: req.body.email });
        if (userpresent) {
            if (userpresent.role === "admin") {
                return res.status(201).send("Hello Admin");
            } else {
                return res.status(201).send("You are not authorized to access");
            }
        } else {
            return res.status(401).send("User doesnot exist");

        }


    } catch (err) {
        return res.status(400).send(err.message)
    }
}

const DoctorApi = async(req, res, next) => {
    try {

        const userpresent = await User.findOne({ email: req.body.email });
        if (userpresent) {
            if (userpresent.role === "doctor") {
                return res.status(201).send("Hello Doctor");
            } else {
                return res.status(201).send("You are not authorized to access");
            }
        } else {
            return res.status(401).send("User doesnot exist");

        }


    } catch (err) {
        return res.status(400).send(err.message)
    }
}

const PatientApi = async(req, res, next) => {
    try {
        console.log(req.body.email)
        const userpresent = await User.findOne({ email: req.body.email });
        if (userpresent) {
            if (userpresent.role === "patient") {
                // check auth
                const verifyuser = await jwt.verify(req.cookies.jwtoken, process.env.JWTSERCETKEY)
                if (verifyuser._id === userpresent._id.toString()) {
                    return res.status(201).send("Hello Hospito");
                } else {
                    return res.status(201).send("Hello Patient");
                }


            } else {
                return res.status(201).send("You are not authorized to access");
            }
        } else {
            return res.status(401).send("User doesnot exist");

        }


    } catch (err) {
        return res.status(400).send(err.message)
    }
}

const SearchApi = async(req, res, next) => {
    try {
        const { name, role } = req.body
        const userpresent = await User.find({ name, role });

        if (userpresent.size > 1) {
            return res.status(201).send(userpresent)
        } else {
            return res.status(201).send("No result found");

        }


    } catch (err) {
        return res.status(400).send(err.message)
    }
}
module.exports = { AdminApi, DoctorApi, PatientApi, SearchApi }