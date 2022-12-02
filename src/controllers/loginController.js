const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const {isValidEmail, isValidPassword} = require("../validators/validator")

const login = async function (req, res) {
    try {

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "login credentials required" })

        const email = req.body.email
        const password = req.body.password

        if (!email) return res.status(400).send({status: false, message: "Email is required"})
        if (!isValidEmail(email)) { return res.status(400).send({ status: false, msg: "Email is not valid" }) }

        if (!password) return res.status(400).send("Password is required")
        if (!isValidPassword(password)) { return res.status(400).send({ status: false, msg: "Password should contain min 8 character & max 15 character , 1 uppercase , 1 special character" })}

        if (email && password) {
            const user = await userModel.findOne({ email: email, password: password })
            if (user) {
                const token = jwt.sign({ userId: user._id }, 'Group20', {expiresIn: 6000} )
                res.setHeader("x-api-key", token);
                return res.status(200).send({ status: true, token: token })
            }
            else {
                return res.status(400).send({ status: false, msg: "Email or Password is incorrect." })
            }
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}


module.exports.login = login
