const router = require('express').Router()
const User = require('../schemas/userSchema')

router.get('/', (req, res) => {
    res.render('shop')
})

router.post('/', async (req, res) => {
    const {item} = req.body
    const currentCart = await User.findOne({email: req.user.email})
    const cart = currentCart.cart
    cart.push(item)
    await User.updateOne({email: req.user.email}, {
        cart: cart
    })
    console.log(await User.findOne({email: req.user.email}))
})

module.exports = router