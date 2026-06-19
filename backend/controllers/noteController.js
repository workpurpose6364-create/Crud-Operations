const Note = require("../models/Note");

// CREATE
const createNote = async (
  req,
  res
) => {
  try {
    // const note =
    //   await Note.create({
    //     title: req.body.title,
    //     paragraph:
    //       req.body.paragraph,
    //     user: req.user.id,
    //   });
    const note = await Note.create({
  title: req.body.title,
  paragraph: req.body.paragraph,
  user: req.user.id,
});

console.log("Saved Note:", note);

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// READ
const getNotes = async (
  req,
  res
) => {
  try {
    // const notes =
    //   await Note.find({
    //     user: req.user.id,
    //   });

    // res.json(notes);
    const notes = await Note.find({
  user: req.user.id,
});

console.log("User ID:", req.user.id);
console.log("Notes:", notes);

res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
const updateNote = async (
  req,
  res
) => {
  try {
    const note =
      await Note.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        req.body,
        {
          new: true,
        }
      );

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteNote = async (
  req,
  res
) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({
      message:
        "Note Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};