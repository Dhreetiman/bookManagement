const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        ref: 'Book',
        trim: true
    },
    reviewedBy: {
        type: String,
        default: 'Guest',
        trim: true

    },                  // i have find reviewer name from data base if not found then i have write by defaut
    reviewedAt: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    review: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })
module.exports = mongoose.model('Review', reviewSchema)