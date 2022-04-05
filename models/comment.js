const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    text: {
        type: String,
        required: [true, "Text is required."],
        minlength: 10
    },
    blogger: {
        ref: "blogger",
        type: Schema.Types.ObjectId,
        required: true
    },
    article: {
        ref: "article",
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;