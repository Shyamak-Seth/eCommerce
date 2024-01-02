const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('cart')
})

router.post('/', async (req, res) => {
    
})

module.exports = router