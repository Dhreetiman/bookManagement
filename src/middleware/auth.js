const jwt = require("jsonwebtoken")
const {
    isValidObjectId
} = require("mongoose");
const bookModel = require("../models/bookModel");


const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({
            status: false,
            msg: "token must be present in header"
        })

        let decodedToken = jwt.verify(token, 'Group20', function (err, decodedToken) {

            if (err) {
                return res.status(401).send({
                    status: false,
                    msg: "invalid Token "
                })
            } else {
                req.decodedToken = decodedToken.userId
                // console.log(req.decodedToken)

                next()

            }
        })
    } catch (err) {
        return res.status(500).send({
            msg: err.message
        })
    }
}

const authorisation = async function (req, res, next) {
    try {

        let Id = req.decodedToken
        let idParams = req.params.bookId;
        if (idParams) {
            if (!isValidObjectId(idParams)) return res.status(400).send({
                status: false,
                message: "Book Id is not valid, please provide a valid Book id"
            })
            let checkId = await bookModel.findById(idParams)
            let userId1 = checkId.userId
            // console.log(userId1)
            if (userId1 != Id) return res.status(403).send({
                status: false,
                message: "Unauthorised User"
            })
        } else {
            let idBody = req.body.userId
            if (!isValidObjectId(idBody)) return res.status(400).send({
                status: false,
                message: "User id is not valid, pleaes provide a valid User id."
            })
            if (idBody != Id) return res.status(403).send({
                status: false,
                message: "Unauthorised User"
            })

        }
        next()
    } catch (err) {
        if (err.name == "TypeError") return res.status(404).send({
            status: false,
            message: "Could not find Book by the given BoodId"
        })
        return res.status(500).send({
            status: false,
            message: err.name
        })
    }
}


module.exports = {
    authentication,
    authorisation
}