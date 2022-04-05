const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BloggerSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "First name is required."],
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Last name is required."],
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: [true, "Username must be unique."],
        minlength: 5,
        maxlength: 30,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', null],
        default: null
    },
    cellphone: {
        type: String,
        trim: true,
        match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Please fill a valid cell phone number.'],
        default: null
    },
    role: {
        type: String,
        enum: ["Blogger", "Admin"],
        default: "Blogger",
    },
    avatar: {
        type: String,
        default: 'blogger.png'
    }
}, { timestamps: true });
const Blogger = mongoose.model("blogger", BloggerSchema);
module.exports = Blogger;