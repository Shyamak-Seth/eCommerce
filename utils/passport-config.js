const bcrypt = require('bcrypt'),
    User = require('../schemas/userSchema'),
    localStrategy = require('passport-local').Strategy

const initialize = (passport) => {
    const authenticateUser = async (email, password, done) => {
        if (!email || !password) {
            return done(null, false, {message: "Please enter all the credentials."})
        }
        const foundUser = await User.findOne({email})
        if (!foundUser) {
            return done(null, false, "No user was found with this email.")
        } else {
            bcrypt.compare(password, foundUser.password, (err, isMatch) => {
                if (err) return done(err)
                if (isMatch) {
                    return done(null, foundUser)
                } else {
                    return done(null, false, {message: "Please enter the correct password."})
                }
            })
        }
    }
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const foundUser = await User.findById(id)
            return done(null, foundUser)
        } catch (err) {
            return done(err)
        }
    })
}

module.exports = initialize