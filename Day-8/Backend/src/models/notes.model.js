/** @type {import('mongoose').Model} */

const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title:String,
    description:String
})

const notesModel=mongoose.model("notes",noteSchema)
module.exports=notesModel