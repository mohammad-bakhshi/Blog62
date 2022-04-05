const sessionChecker = (req, res, next) => {
    if (req.session.blogger && req.cookies.blogger_seed) {
        return res.status(403).redirect('/blogger/profile');
    }
    next();
};

const loginChecker = (req, res, next) => {
    if (!req.session.blogger || !req.cookies.blogger_seed) {
        return res.status(403).redirect('/auth');
    }
    next();
};

//admin checker
function isAdmin(req, res, next) {
    if (req.session.blogger.role !== 'Admin') {
        return res.redirect('/blogger/profile');
    }
    next();
}

module.exports = { sessionChecker, loginChecker, isAdmin };