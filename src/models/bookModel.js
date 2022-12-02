const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

const bookModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        require: true,
    },
    userId: {
        type: objectId,
        required: true,
        ref: 'User'
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    },
    releasedAt: {
        type: Date,
        required: true
    }                  // format("YYYY-MM-DD")
}, {
    timestamps: true
})

module.exports= mongoose.model('Book',bookModel);