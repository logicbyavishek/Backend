// server create and start 
const express = require("express")

const app = express()
app.use(express.json())

const notes = []

app.get('/',(req,res)=>{
    res.send("Hello world")
})

/* POST/notes */
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send("notes created")
})

/* GET/notes */
app.get("/notes",(req,res)=>{
    res.send(notes)
})

/* DELETE /notes */
/* params */

/* delete /notes/0 */

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("Notes deleted")
})


/* UPDATE description */
/* PATCH /notes/:index */
/* req.body = {description :- "sample modified description."} */

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description

    res.send("Notes modified succesfully")
})

module.exports=app