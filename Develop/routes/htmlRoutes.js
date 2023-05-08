// router.get functions (res, req) router grabbing whatever note it is from notes.html 
const router = require('express').Router();
const path = require('path')

// creating routes, get to return notes.html file
router.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, '../public/notes.html'))
})
// get to return index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
    })
// routing
module.exports = router