/**
 * Server Create & Config Server
 */

const express = require("express");
/** @type {import('mongoose').Model} */
const notesModel = require("./models/notes.model");
const cors = require("cors"); // require cors after rn commnad [ npm i cors ] in terminal
const path = require("path");

const app = express(); // Create Instance of Server
app.use(express.json()); //Middleware
app.use(cors()); //Bypass CORS policy and allow Cros origin

app.use(express.static("./public"));

/**
 * POST /api/notes
 */

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body; // destructuring

  const note = await notesModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created Successfully",
    note,
  });
});

/**
 * GET /api/notes
 */
app.get("/api/notes", async (req, res) => {
  const notes = await notesModel.find();

  res.status(200).json({
    message: "Notes fetched Successfully",
    notes,
  });
});

/**
 * DELETE /api/notes/:id
 */
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await notesModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/**
 * - PATCH /api/notes/:id
 * - update the description of the note by id
 * - req.body = {description}
 */
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await notesModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note updated successfully.",
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
