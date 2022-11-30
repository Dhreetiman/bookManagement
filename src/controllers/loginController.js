const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')

const login = async function (req, res) {
    try {
        const {
            email,
            password
        } = req.body
        const fetchData = await userModel.findOne({
            email: email,
            password: password
        })
        if (fetchData == null) return res.status(401).send({
            status: false,
            msg: "incorrect email or password"
        })
        const mytoken = jwt.sign({
            email: email,
            id: fetchData._id
        }, 'shhh', {
            expiresIn: 600
        })
        console.log(mytoken)
        res.status(200).send({
            status: true,
            data: mytoken
        })

    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    login
}