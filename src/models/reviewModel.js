const mongoose= require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

const reviewModel= new mongoose.Schema(
    {
        bookId: {
            type: objectId,
            required: true,
            ref: 'Book'
        },
        reviewedBy: {
            type: String,
            default: 'Guest',
            value: objectId,
            ref: User
        },
        reviewedAt: {
            type: Date,
            require: true
        },
        rating: {
            type: Number,

        },                        //min 1 and max 5
        review: {
            type: String,
            required: false
        },
        isDeleted: {
            type: Boolean,
            required: true
        },
      },{timestamps:true}
    )

    module.exports= mongoose.model('Review',reviewModel)