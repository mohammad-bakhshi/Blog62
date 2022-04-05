const createValidator = (req, res, next) => {
    let result = {
        message: [],
        status: true
    };
    if (!req.body.title) {
        result.message.push("Title is required.");
        result.status = false;
    }
    else if (req.body.title.length < 5) {
        result.message.push("Title length must be at least 5.");
        result.status = false;
    }
    else if (req.body.title.length > 20) {
        result.message.push("Title length must be at most 20.");
        result.status = false;
    }
    if (!req.body.text) {
        result.message.push("Text is required.");
        result.status = false;
    } else if (req.body.text.length < 10) {
        result.message.push("Text length must be at least 10.");
        result.status = false;
    }
    if (result.status === true) {
        next();
    }
    else {
        return res.status(400).json({ result: false, message: result.message });
    }
}

const updateValidator = (req, res, next) => {
    let result = {
        message: [],
        status: true
    };
    if (req.body.title) {
        if (req.body.title.length < 5) {
            result.message.push("Title length must be at least 5.");
            result.status = false;
        }
        else if (req.body.title.length > 20) {
            result.message.push("Title length must be at most 20.");
            result.status = false;
        }
    }
    if (req.body.text) {
        if (req.body.text.length < 10) {
            result.message.push("Text length must be at least 10.");
            result.status = false;
        }
    }
    if (result.status === true) {
        next();
    }
    else {
        return res.status(400).json({ result: false, message: result.message });
    }
}


module.exports = { createValidator, updateValidator };
