const bookModel = require("../models/bookModel")

//-------------------------Create Book Data------------------------------------------------------
const {
    isValidEmail,
    isValidName,
    captilize,
    isValidPhone,
    isValidPassword,
    isValidString,
    isValidPincode,
    isValidISBN,
    idCharacterValid
} = require('../validators/validator')

const createBook = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data) == 0) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "No input provided"
                });
        }
        const {
            title,
            excerpt,
            userId,
            ISBN,
            category,
            subcategory,
            reviews,
            releasedAt
        } = data

        if (!title) return res.status(400).send({
            status: false,
            message: "Please Enter Title"
        })
        if (!isValidString(title)) return res.status(400).send({
            status: false,
            message: "please inter valid title"
        })

        if (!excerpt) return res.status(400).send({
            status: false,
            message: "Please enter excerpt"
        })
        if (!isValidString(excerpt)) return res.status(400).send({
            status: false,
            message: "please inter valid excerpt"
        })

        if (!userId) return res.status(400).send({
            status: false,
            message: "Please enter userId"
        })

        if (!ISBN) return res.status(400).send({
            status: false,
            message: "Please enter ISBN"
        })
        if (!isValidISBN(ISBN)) return res.status(400).send({
            status: false,
            message: "please inter valid ISBN"
        })

        if (!category) return res.status(400).send({
            status: false,
            message: "Please enter category"
        })
        if (!isValidString(category)) return res.status(400).send({
            status: false,
            message: "please inter valid category"
        })

        if (!subcategory) return res.status(400).send({
            status: false,
            message: "Please enter subcategory"
        })
        if (!isValidString(subcategory)) return res.status(400).send({
            status: false,
            message: "please inter valid subcategory"
        })

        if (!reviews) return res.status(400).send({
            status: false,
            message: "Please enter reviews"
        })
        if (![1, 2, 3, 4, 5].includes(reviews)) return res.status(400).send({
            status: false,
            message: "Invalid review number"
        })

        if (!idCharacterValid(userId)) return res.status(400).send({
            status: false,
            msg: "Please provide the valid userId"
        })

        if (!releasedAt) {
            return res.status(400).send({
                status: false,
                message: "Please enter releasedAt"
            })
        }

        const bookData = await bookModel.create(data)
        res.status(201).send({
            status: true,
            data: bookData
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


//-----------------------------Get Book data-----------------------------------------------

const getBooks = async function (req, res) {
    try {
        if (req.query) {
            let {
                userId,
                category,
                subcategory
            } = req.query
            let obj = {}

            if (userId) {
                obj.userId = userId
            }
            if (category) {
                obj.category = category
            }
            if (subcategory) {
                obj.subcategory = subcategory
            }

            if (Object.keys.length == 0) return res.status(400).send({
                status: false,
                message: "Invalid query params"
            })

            obj.isDeleted = false
            const bookDetals = await bookModel.find(obj).select({
                title: 1,
                excerpt: 1,
                userId: 1,
                category: 1,
                reviews: 1,
                releasedAt: 1
            })
            if (!bookDetals) {
                return res.status(404).send({
                    status: false,
                    msg: "No book found for given data"
                })
            } else {
                bookDetals.sort(function (a, b) {
                    if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase) return -1
                    if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase) return 1
                    return 0
                })
                return res.status(200).send({
                    status: true,
                    message: 'Success',
                    data: bookDetals
                })
            }
        } else {
            const allBooks = await bookModel.find({
                isDeleted: false
            })
            return res.status(200).send({
                status: true,
                message: 'Success',
                data: allBooks
            })
        }

    } catch (err) {
        if (err.name == "CastError") return res.status(400).send({
            status: false,
            message: `Given bookId ${err.value} is not valid, please provide a valid bookId`
        })
        return res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

//---------------------------Get Book Data By Path Param------------------------------------

const getBookByParam = async function (req, res) {
    try {
        let Id = req.params.bookId
        let bookDetails = await bookModel.findById(Id)
        if (!bookDetails) return res.status(404).send({
            status: false,
            message: "Book not found by the given ID"
        })
        if (bookDetails.isDeleted==true) return res.status(404).send({status: false, message: "This Book has been deleted"})
        return res.status(201).send({
            status: true,
            message: "success",
            data: bookDetails
        })
    } catch (err) {
        if (err.name == "CastError") return res.status(400).send({
            status: false,
            message: `Given bookId ${err.value} is not valid, please provide a valid bookId`
        })
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

//------------------------Update Book Data-----------------------------------------





//-----------------------------Delete Book Data-------------------------------------------

const deleteBook = async function (req, res) {
    try {
        let Id = req.params.bookId
        let checkId = await bookModel.findById(Id)
        if (!checkId || (checkId.isDeleted == true)) return res.status(404).send({
            status: false,
            message: "Book not found or already Deleted"
        })
        let deletedData = await bookModel.findOneAndUpdate({
            _id: Id,
            isDeleted: false
        }, {
            $set: {
                isDeleted: true,
                deletedAt: new Date(Date.now())
            }
        })
        if (deletedData) return res.status(200).send({
            status: true,
            message: "Book deleted successfully"
        })
        else return res.status(404).send({
            status: false,
            message: "something went wrong"
        })
    } catch (err) {
        if (err.name == "CastError") return res.status(400).send({
            status: false,
            message: `Given bookId ${err.value} is not valid, please provide a valid bookId`
        })
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    createBook,
    getBooks,
    getBookByParam,
    deleteBook
}