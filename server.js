require('dotenv').config()

const express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('express-flash'),
    passportInitialize = require('./utils/passport-config'),
    {ensureAuthenticated, forwardAuthenticated} = require('./utils/authenticate.js')
    app = express(),
    PORT = process.env.PORT || 5000

const indexRouter = require('./routers/indexRouter.js'),
    adminRouter = require('./routers/adminRouter.js'),
    loginRouter = require('./routers/loginRouter.js'),
    regRouter = require('./routers/regRouter.js'),
    logoutRouter = require('./routers/logoutRouter.js'),
    shopRouter = require('./routers/shopRouter.js'),
    cartRouter = require('./routers/cartRouter.js')

mongoose.connect(process.env.MONGO_URI, console.log(`CONNECTED TO MONGODB`))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json({limit: '1mb'}))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passportInitialize(passport)

app.use('/', indexRouter)
app.use('/login', forwardAuthenticated, loginRouter)
app.use('/register', forwardAuthenticated, regRouter)
app.use('/admin', ensureAuthenticated, adminRouter)
app.use('/logout', ensureAuthenticated, logoutRouter)
app.use('/cart', ensureAuthenticated, cartRouter)
app.use('/shop', ensureAuthenticated, shopRouter)

app.listen(PORT, console.log(`THE SERVER HAS BEEN CONNECTED ON PORT ${PORT}`))
