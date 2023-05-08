const fs = require('fs');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

router.get('/notes', (req, res) => {
    console.log("something");
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

router.post('api/notes', (req, res) => {
    console.info(`${req.method} request received! saving...`);

    const { title, text } = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
            //adds unique Id to each note.
            id: uuidv4(), 
        };

        fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
            if (err) {
                console.error('error occured: ' + err);
            } else {
                const notesArr = JSON.parse(data);
                notesArr.push(newNote);
                const noteString = JSON.stringify(notesArr, null, 4);
                fs.writeFile(`./db/db.json`, noteString, (err) => {
                    err ? console.error(err) : console.log("Okay, I'll write that down...");
                });
            };
        });
        res.status(200).json('Womp womp');
    } else {
        res.status(500).json('Big rip');
    }
});

module.exports = router;