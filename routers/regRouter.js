const router = require('express').Router()
const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('register', {error: false})
})

router.post('/', async (req, res) => {
    const {email, password, fname, lname, cnfpassword} = req.body
    if (!email || !password || !fname || !lname || !cnfpassword) {
        return res.render('register', {error: "Please enter all the credentials."})
    }
    const foundUser = await User.findOne({email})
    if (foundUser) {
        return res.render('register', {error: "A user already exists with this email. You might want to login instead."})
    }
    if (password.length < 6) {
        return res.render('register', {error: "Your password should not be less than 6 characters."})
    }
    if (password != cnfpassword) {
        return res.render('register', {error: "The passwords do not match!"})
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            fname: fname,
            lname: lname,
            email: email,
            password: hashedPassword
        })
        await newUser.save()
        res.redirect('/login')
    } catch (error) {
        throw error;
    }
})

module.exports = router