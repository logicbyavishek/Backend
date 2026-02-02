// server connect & config server
const express = require("express")
const noteModel = require("./models/notes.model") // require notesModel from models

const app = express() //create server instance
app.use(express.json()) //middleware

/**
 * post /notes
 * - req.body => {title,description}
 */
app.post('/notes',async (req,res)=>{
    const {title , description} = req.body //Destructuring

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        messeage:"Notes created Successfully",
        note
    })
})

/**
 * Get / notes
 * fetch all the notes Data
 */
app.get('/notes',async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        messeage:"Fetch notes data successfully",
        notes
    })
})




module.exports=app