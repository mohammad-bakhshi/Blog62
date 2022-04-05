const createValidator = (req, res, next) => {
    let result = {
        message: [],
        status: true
    };
    if (!req.body.firstname) {
        result.message.push("First name is required.");
        result.status = false;
    }
    else if (req.body.firstname.length < 2) {
        result.message.push("First name length must be at least 2.");
        result.status = false;
    }
    else if (req.body.firstname.length > 30) {
        result.message.push("First name length must be at most 30.");
        result.status = false;
    }
    if (!req.body.lastname) {
        result.message.push("Last name is required.");
        result.status = false;
    } else if (req.body.lastname.length < 2) {
        result.message.push("Last name length must be at least 2.");
        result.status = false;
    }
    else if (req.body.lastname.length > 30) {
        result.message.push("Last name length must be at most 30.");
        result.status = false;
    }
    if (!req.body.username) {
        result.message.push("Username is required.");
        result.status = false;
    } else if (req.body.username.length < 5) {
        result.message.push("Username length must be at least 5.");
        result.status = false;
    }
    else if (req.body.username.length > 30) {
        result.message.push("Username length must be at most 30.");
        result.status = false;
    }
    if (!req.body.password) {
        result.message.push("Password is required.");
        result.status = false;
    }
    else if (!isPassword(req.body.password)) {
        result.message.push("Password is not valid.");
        result.status = false;
    }
    if (req.body.cellphone) {
        if (!isCellphone(req.body.cellphone)) {
            result.message.push("Cell phone is not valid.");
            result.status = false;
        }
    }
    if (req.body.gender) {
        if (req.body.gender !== 'Male' && req.body.gender !== 'Female') {
            result.message.push("Gender must be Male or Female");
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

const loginValidator = (req, res, next) => {
    let result = {
        message: [],
        status: true
    };
    if (!req.body.username) {
        result.message.push("Username is required.");
        result.status = false;
    } else if (req.body.username.length < 5) {
        result.message.push("Username length must be at least 5.");
        result.status = false;
    }
    else if (req.body.username.length > 30) {
        result.message.push("Username length must be at most 30.");
        result.status = false;
    }
    if (!req.body.password) {
        result.message.push("Password is required.");
        result.status = false;
    }
    else if (!isPassword(req.body.password)) {
        result.message.push("Password is not valid.");
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
    if (req.body.firstname) {
        if (req.body.firstname.length < 2) {
            result.message.push("firstname length must be at least 2.");
            result.status = false;
        }
        else if (req.body.firstname.length > 30) {
            result.message.push("firstname length must be at most 30.");
            result.status = false;
        }
    }
    if (req.body.lastname) {
        if (req.body.lastname.length < 2) {
            result.message.push("lastname length must be at least 2.");
            result.status = false;
        }
        else if (req.body.lastname.length > 30) {
            result.message.push("lastname length must be at most 30.");
            result.status = false;
        }
    }
    if (req.body.username) {
        if (req.body.username.length < 5) {
            result.message.push("username length must be at least 5.");
            result.status = false;
        }
        else if (req.body.username.length > 30) {
            result.message.push("username length must be at most 30.");
            result.status = false;
        }
    }
    if (req.body.cellphone) {
        if (!isCellphone(req.body.cellphone)) {
            result.message.push("cell phone is not valid.");
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


function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

function isCellphone(cellphone) {
    return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(cellphone);
}

module.exports = { createValidator, loginValidator, updateValidator };