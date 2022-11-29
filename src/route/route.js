const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController")
const bookController = require("../controllers/bookController")
const authMiddleware = require("../middleware/auth")
const authorizationMid = require("../middleware/authorization")

router.post("/user",userController.createUser)
router.post("/login",loginController.login)
router.post('/books',authMiddleware.auth, bookController.createBook)
router.get('/books', bookController.getBooks)
router.get('/books/:bookId', bookController.getBookByParam)
router.delete('/books/:bookId', bookController.deleteBook)


router.all("/**", (req, res)=>{
    return res.status(400).send({status:false, message:"check your URL"})
})

module.exports = router