const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")

const authentication = async function (req, res, next) {

    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({
            status: false,
            msg: "token must be present in header"
        })

        let decodedToken = jwt.verify(token, 'shhh', function (err, decodedToken) {

            if (err) {
                return res.status(401).send({
                    status: false,
                    msg: "invalid Token "
                })
            } else {
                req.decodedToken = decodedToken
                next()

            }
        })
    } catch (err) {
        return res.status(500).send({
            msg: err.message
        })
    }
}


const authorization = async function (req, res, next) {

    try {
        let getbookId = req.params.bookId;

        if (!idCharacterValid(getbookId)) return res.status(400).send({
            status: false,
            msg: "Enter a valid bookId"
        })

        let book = await bookModel.findOne({
            _id: getbookId
        })
        if (!book) return res.status(404).send({
            status: false,
            msg: "Book not found !"
        })
        if (book.isDeleted == true) return res.status(404).send({
            status: false,
            msg: "Book is already been deleted"
        })

        let userId = book.userId
        if (userId != req.decodedToken.userId) return res.status(403).send({
            status: false,
            msg: "you do not have authorization to this "
        });
        next()
    } catch (err) {
        res.status(500).send({
            msg: err.message
        })
    }
}


module.exports = {
    authentication,
    authorization
}