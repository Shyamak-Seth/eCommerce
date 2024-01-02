const router = require('express').Router()
const itemsSchema = require('../schemas/itemsSchema')
const Items = require('../schemas/itemsSchema')

router.get('/', (req, res) => {
    if (req.user.email == process.env.ADMIN_EMAIL) {
        res.render('admin')
    } else {
        res.redirect('/')
    }
})

router.get('/new-item', (req, res) => {
    res.render('newItem', {error: false})
})

router.post('/new-item', async (req, res) => {
    const {item, price, unit, url, description} = req.body
    const foundItem = await Items.findOne({item})
    if (foundItem) {
        return res.render('newItem', {error: "This item has already been created."})
    }
    const newItem = new Items({item, price, unit, url, description})
    await newItem.save()
})

router.get('/manage-items', (req, res) => {
    res.render('manageItems')
})

router.get('/orders', (req, res) => {
    res.render('manageOrders')
})

module.exports = router