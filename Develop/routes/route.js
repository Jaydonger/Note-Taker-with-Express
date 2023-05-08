const router = require('express').Router();
const path = require('path');

router.get('/notes', (req, res) => {
    console.log("something");
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

module.exports = router;