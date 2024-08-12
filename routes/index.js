const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index,ejs', {layout: 'layouts/guestLayout'})
})

module.exports = router