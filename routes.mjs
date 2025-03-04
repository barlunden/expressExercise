import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: `This is the root, and we're live from port 4010!` });
});

// Easy Task
router.get("/hello", (req, res) => {
  res.send({ message: `Hello, World!` });
});

// Medium Task
router.get("/greet/:name?", (req, res) => {
  const name = req.params.name;

  if (name) {
    res.send({ message: `Hello, ${name}!` });
  } else {
    res.send({ message: `Hello!` });
  }
});

// Hard Task
router.use(express.json());

let notes = [];

router.post("/notes", (req, res) => {
  const newNote = req.body;

  if (!newNote || typeof newNote.text !== 'string' || newNote.text.trim() === '') {
    return res.status(400).json({ error: 'The note needs to contain a valid text.'})
  }

  notes.push(newNote);
  res.status(201).json(newNote);
});

router.get("/notes/:id?", (req, res) => {
  const id = req.params.id ? parseInt(req.params.id) : undefined;
  if (id === undefined) {
    res.json(notes);
  } else if (id >= 0 && id < notes.length) {
    res.json(notes[id]);
  } else {
    res.status(404).json({ message: 'Note not found.' });
  }
});

export default router;
