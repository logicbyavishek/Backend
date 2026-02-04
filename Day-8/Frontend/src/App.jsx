import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [Notes, setNotes] = useState([]);

  console.log("hello");

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handelSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    }).then(res=>{
      console.log(res.data)
      fetchNotes()
    })

    
  }

  function handelDelete(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
      .then(res=>{
        console.log(res.data)
        fetchNotes()
      })
      
  }

  return (
    <>
      <form className='note-create-form' onSubmit={handelSubmit}>
        <input type="text" name="title" placeholder="Enter Title" />
        <input type="text" name="description" placeholder="Enter description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {Notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{handelDelete(note._id)}}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
