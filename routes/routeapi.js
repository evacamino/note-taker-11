const router = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
router.get("/notes", (req, res) =>
  fs.readFile("db/db.json", "utf-8", (err, data) =>
    err ? console.log(err) : res.json(JSON.parse(data))
  )
);

router.post("/notes", (req, res) => {
  console.log(req.body);
  fs.readFile("db/db.json", (err, data) => {
    if (err) console.log(err);
    let parseData = JSON.parse(data);
    let newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    console.log(newNote);
    parseData.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(parseData), (err) => {
      if (err) console.log(err);
      res.redirect("/notes");
    });
  });
});

router.delete("/notes/:id", (req, res) => {
  fs.readFile("db/db.json", (err, data) => {
    if (err) console.log(err);
    let parseData = JSON.parse(data);
    let filterNotes = parseData.filter((note) => note.id != req.params.id);
    console.log(filterNotes);
    fs.writeFile("db/db.json", JSON.stringify(filterNotes), (err) => {
      if (err) console.log(err);
      res.redirect("/notes");
    });
  });
});

module.exports = router;

///app.use
