const userModel = require('../models/userModel')
const {
    isValidEmail,
    isValidName,
    captilize,
    isValidPhone,
    isValidPassword
} = require("../validators/validator")

const createUser = async function (req, res) {
    try {
        let data = req.body
        let {
            title,
            name,
            phone,
            email,
            password
        } = data
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            message: "request body is empty"
        })
        if (!title) return res.status(400).send({
            status: false,
            message: "title is required"
        })


        if (!name) return res.status(400).send({
            status: false,
            message: "name is required"
        })
        if (!phone) return res.status(400).send({
            status: false,
            message: "phone no. is required"
        })
        if (!email) return res.status(400).send({
            status: false,
            message: "email is required"
        })
        if (!password) return res.status(400).send({
            status: false,
            message: "password is required"
        })

        if (!["Mr", "Mrs", "Miss"].includes(title)) return res.status(400).send({
            status: false,
            message: "Please provide the title in these options - Mr || Mrs || Miss"
        })

        if (!isValidName(name)) return res.status(400).send({
            status: false,
            message: "Please input the valid name"
        })

        data.name = captilize(name)
        // console.log(name)
        if (!isValidPhone(phone)) return res.status(400).send({
            status: false,
            message: "Please provide a valid Number"
        })

        if (!isValidEmail(email)) return res.status(400).send({
            status: false,
            message: "Please input the valid email"
        })

        if (!isValidPassword(password)) return res.status(400).send({
            status: false,
            message: "Invalid Password: password must contains one upperCase latter, one lowerCase latter, one Number, one special character and min character: 8 & max character 15 "
        })
        // let newData1 = await userModel.find({$or: [{email:data.email},{phone:data.phone}]})
        // console.log(newData1)


        let userData = await userModel.create(data)
        res.status(201).send({
            status: true,
            data: userData
        })

    } catch (err) {
        if (err.name == "ValidationError") {
            return res.status(400).send(err.message);
        }
        if (err.code == 11000) {
            return res.status(400).send({
                status: false,
                message: `Duplicate value provided :- ${Object.keys(err.keyValue)}: ${Object.values(err.keyValue)} already exist`,
            });
        }
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    createUser
}