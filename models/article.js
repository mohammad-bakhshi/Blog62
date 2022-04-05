const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        minlength: 5,
        maxlength: 20,
        trim: true
    },
    text: {
        type: String,
        required: [true, "Text is required."],
        minlength: 10,
        trim: true
    },
    image: {
        type: String,
        default: 'article.png'
    },
    blogger: {
        ref: "blogger",
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
const Article = mongoose.model('article', ArticleSchema);
module.exports = Article;