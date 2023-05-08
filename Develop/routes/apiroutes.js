const router = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');


router.get('/notes', async (req, res) => {
    let data = await readFromFile('./db/db.json','utf8');
    console.log(data);
    res.json(data)
})

// router.post()
router.post('/notes', async (req, res) => {
    readAndAppend(req.body, './db/db.json');
})

// router.delete()




module.exports = router;