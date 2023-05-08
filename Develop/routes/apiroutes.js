const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
    fs.readFile("db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.json(JSON.parse(data));
    });
  });

  router.post("/notes", (req, res) => {

    console.info(`${req.method} request received to save note`);

    const { title, text } = req.body;

    if (title && text) {

      const newNote = {
        title,
        text,
        id: uuidv4(), 
        // add unique id to each note
      };

      fs.readFile(`./db/db.json`, "utf8", (err, data) => {
        if (err) {
          console.error("read error: " + err);
        } else {
          const notesArr = JSON.parse(data);
          notesArr.push(newNote);
          const notesString = JSON.stringify(notesArr, null, 4);
          fs.writeFile(`./db/db.json`, notesString, (err) =>
            err
              ? console.error(err)
              : console.log(
                  `Note titled '${newNote.title}' has been written to JSON file`
                )
          );
        }
      });
      res.status(200).json("Success!");
    } else {
      res.status(500).json("Error saving note");
    }
  });

module.exports = router;