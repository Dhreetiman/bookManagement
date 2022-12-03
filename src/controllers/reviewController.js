const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
// const Validation = require("../validators/validator")
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
const mongoose = require("mongoose")
const {
  isValidObjectId
} = require("mongoose")
const moment = require('moment')


const creatReview = async function (req, res) {
  try {
    let data = req.body;
    let id = req.params.bookId;
    const {
      reviewedBy,
      rating
    } = data

    if (Object.keys(data) == 0) {
      return res.status(400).send({
        status: false,
        message: 'please provide data'
      })
    }

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: 'provide a valid id'
      })
    }
    if (!isValidName(reviewedBy)) return res.status(400).send({
      status: false,
      message: "Reviewer name is not valid"
    })
    data.reviewedBy = captilize(reviewedBy)

    let books = await bookModel.findById(id);
    if (!books) {
      return res.status(404).send({
        status: false,
        message: 'Could not find any book by this Id'
      })
    }

    if (books.isDeleted == true) {
      return res.status(404).send({
        status: false,
        message: 'Book is deleted or Does not exist'
      })
    }


    if (!isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        message: 'Please provide a valid Id'
      })
    }
    if (![1, 2, 3, 4, 5].includes(rating)) return res.status(400).send({
      status: false,
      message: "rating should be min 1 and max 5"
    })

    let date = moment().format("YYYY-MM-DD") //date by using Moment
    data.reviewedAt = date;
    data.bookId = id

    const updatedBook = await bookModel.findOneAndUpdate({
      _id: id
    }, {
      $inc: {
        reviews: +1
      }
    }, {
      new: true
    }) // update reviews 

    const reviews = await reviewModel.create(data);


    return res.status(201).send({
      status: true,
      data: {
        ...updatedBook.toObject(),
        reviewsData: reviews
      }
    }) //using toObject() Function in adding new key value pair in Response

  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error
    })
  }
}


let updatedReview = async function (req, res) {

  try {

    let bookId = req.params.bookId
    let reviewId = req.params.reviewId
    let data = req.body

    if (!isValidObjectId(bookId)) {
      res.status(400).send({
        status: false,
        message: 'please provide valid bookId'
      });
      return;
    }

    if (!isValidObjectId(reviewId)) {
      res.status(400).send({
        status: false,
        message: 'please provide valid reviewId'
      });
      return;
    }

    let findReview = await reviewModel.findOne({
      _id: reviewId,
      isDeleted: false
    })
    if (!findReview) {
      return res.status(404).send({
        status: false,
        message: "Review not found or already deleted"
      })
    }


    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "No Data found to Update"
      })
    }

    const {
      reviewedBy,
      review,
      rating
    } = data
    if (reviewedBy) {
      if (!isValidName(reviewedBy)) {
        return res.status(400).send({
          status: false,
          message: "Please provide a valid name"
        })
      } else {
        data.reviewedBy = captilize(reviewedBy)
      }

    }
    if (review) {
      if (!isValidString(review)) {
        return res.status(400).send({
          status: false,
          message: "Review should not be empty or invalid"
        })
      }
    }
    if (rating) {
      if (rating == 0 || ![1, 2, 3, 4, 5].includes(rating)) return res.status(400).send({
        status: false,
        message: "rating should be minimum 1 and maximum 5"
      })
    }

    if (findReview.bookId != bookId) {
      return res.status(404).send({
        status: false,
        message: "ReviewId and bookId does not match"
      })
    }

    const updatedReview = await reviewModel.findOneAndUpdate({
      _id: reviewId
    }, {
      ...data
    }, {
      new: true
    }).select({
      __v: 0
    })

    return res.status(200).send({
      status: true,
      message: 'Review updated',
      data: updatedReview
    });

  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message
    })
  }
}




const deleteReviewByParam = async function (req, res) {
  try {

    let bookId = req.params.bookId
    let reviewId = req.params.reviewId



    if (!isValidObjectId(bookId)) {
      return res.status(400).send({
        status: false,
        mes: 'Please provide a valid Book id'
      })
    }

    if (!isValidObjectId(reviewId)) {
      return res.status(400).send({
        status: false,
        mes: 'Please provide a valid Review id'
      })
    }

    const findReview = await reviewModel.findOne({
      _id: reviewId,
      isDeleted: false
    })
    if (!findReview) {
      return res.status(404).send({
        status: false,
        message: "No review exists in Database with this Id"
      })
    }

    if (findReview.bookId != bookId) {
      return res.status(404).send({
        status: false,
        message: "ReviewId and bookId does not match"
      })
    }

    let date = moment().format("YYYY-MM-DD") //date by using Moment

    const deleteReviewDetails = await reviewModel.findOneAndUpdate({
      _id: reviewId
    }, {
      isDeleted: true,
      deletedAt: date
    }, {
      new: true
    })

    const updatedBook = await bookModel.findOneAndUpdate({
      _id: bookId
    }, {
      $inc: {
        reviews: -1
      }
    })

    return res.status(200).send({
      status: true,
      message: "Review deleted successfully."
    })

  } catch (error) {
    res.status(500).send({
      status: false,
      error: error.message
    })
  }
}



module.exports = {
  creatReview,
  updatedReview,
  deleteReviewByParam
}