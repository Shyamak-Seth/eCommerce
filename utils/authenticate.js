function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/login')
    }
}

function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/')
    }
}

module.exports = {ensureAuthenticated, forwardAuthenticated}