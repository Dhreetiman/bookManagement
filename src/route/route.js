const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController")
const bookController = require("../controllers/bookController")
const middlewares = require("../middleware/auth")
const reviewController = require("../controllers/reviewController")



router.post("/user",userController.createUser)
router.post("/login",loginController.login)
router.post('/books',middlewares.authentication, middlewares.authorisation, bookController.createBook)
router.get('/books',middlewares.authentication, bookController.getBooks)
router.get('/books/:bookId',middlewares.authentication,middlewares.authorisation, bookController.getBookByParam)
router.put('/books/:bookId',middlewares.authentication,middlewares.authorisation,bookController.updateBooks)
router.delete('/books/:bookId',middlewares.authentication,middlewares.authorisation, bookController.deleteBook)

router.post("/books/:bookId/review", reviewController.creatReview);

router.put("/books/:bookId/review/:reviewId", reviewController.updatedReview);

router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReviewByParam);


router.all("/**", (req, res)=>{
    return res.status(400).send({status:false, message:"check your URL"})
})

module.exports = router