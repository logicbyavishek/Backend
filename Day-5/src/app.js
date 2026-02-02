/* 
    server create
    server config
 */

    const express = require("express")

    const notes=[]

    const app = express()

    app.use(express.json())

    app.get('/',(req,res)=>{
        console.log("Hello from server")
    })

    //post/notes status(201)

    app.post('/notes',(req,res)=>{
        notes.push(req.body)

        res.status(201).json({
            message:"Notes Created successfully"
        })
    })

    //get/notes status(200)

    app.get('/notes',(req,res)=>{
        res.status(200).json({
            notes:notes
        })
    })

    //delete 
    //delete/notes/:index
    //params

    app.delete('/notes/:mama',(req,res)=>{
        delete notes[req.params.mama]

        res.status(200).json({
            message:"Notes Deleted successfully"
        })
    })


    //Update only description not Title
    //patch/notes/:index
    //params

    app.patch('/notes/:index',(req,res)=>{
        notes[req.params.index].description = req.body.description

        res.status(200).json({
            message:"Notes Updated successfully"
        })
    })



    module.exports=app