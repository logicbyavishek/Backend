import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [Notes, setNotes] = useState([]);
  const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [updateForm, setUpdateForm] = useState({ title: "", description: "" });
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

  function fetchNotes() {
    axios.get("https://backend-w6fq.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handelSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios
      .post("https://backend-w6fq.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
        e.target.reset();
      });
  }

  function handelDelete(noteId) {
    axios
      .delete("https://backend-w6fq.onrender.com/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeleteAll() {
    // Delete all notes one by one
    const deletePromises = Notes.map((note) =>
      axios.delete("https://backend-w6fq.onrender.com/api/notes/" + note._id),
    );

    Promise.all(deletePromises)
      .then(() => {
        console.log("All notes deleted");
        fetchNotes();
        setShowDeleteAllConfirm(false);
      })
      .catch((err) => {
        console.error("Error deleting notes:", err);
      });
  }

  const handleUpdateNote = (id) => {
    const note = Notes.find((n) => n._id === id);
    setSelectedNote(note);
    setUpdateForm({
      title: note.title || "",
      description: note.description || "",
    });
    setIsUpdatePanelOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        "https://backend-w6fq.onrender.com/api/notes/" + selectedNote._id,
        {
          title: updateForm.title,
          description: updateForm.description,
        },
      )
      .then((res) => {
        console.log(res.data);
        fetchNotes();
        closeUpdatePanel();
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  const closeUpdatePanel = () => {
    setIsUpdatePanelOpen(false);
    setTimeout(() => {
      setSelectedNote(null);
      setUpdateForm({ title: "", description: "" });
    }, 300);
  };

  const handleInputChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="app-container">
        <div className="header-section">
          <h1 className="app-title">My Notes</h1>
          <p className="app-subtitle">Capture your thoughts elegantly</p>
        </div>

        <form className="note-create-form" onSubmit={handelSubmit}>
          <div className="form-content">
            <div className="input-group">
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                required
                className="form-input title-input"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="description"
                placeholder="Enter description"
                required
                className="form-input description-input"
              />
            </div>
            <button type="submit" className="create-btn">
              <span className="btn-text">Create Note</span>
              <span className="btn-icon">+</span>
            </button>
          </div>
        </form>

        {/* Delete All Button - Only show when there are notes */}
        {Notes.length > 0 && (
          <div className="delete-all-container">
            <button
              className="delete-all-btn"
              onClick={() => setShowDeleteAllConfirm(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Delete All Notes ({Notes.length})
            </button>
          </div>
        )}

        <div className="notes-grid">
          {Notes.map((note, index) => (
            <div
              className="note"
              key={note._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="note-content">
                <h1 className="note-title">{note.title}</h1>
                <p className="note-description">{note.description}</p>
              </div>
              <div className="note-actions">
                <button
                  className="note-btn update-btn"
                  onClick={() => handleUpdateNote(note._id)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L4.99967 13.6667L1.33301 14.6667L2.33301 11L11.333 2.00004Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Update
                </button>
                <button
                  className="note-btn delete-btn"
                  onClick={() => handelDelete(note._id)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 4H3.33333H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.33301 4.00004V2.66671C5.33301 2.31309 5.47348 1.97395 5.72353 1.7239C5.97358 1.47385 6.31272 1.33337 6.66634 1.33337H9.33301C9.68663 1.33337 10.0258 1.47385 10.2758 1.7239C10.5259 1.97395 10.6663 2.31309 10.6663 2.66671V4.00004M12.6663 4.00004V13.3334C12.6663 13.687 12.5259 14.0261 12.2758 14.2762C12.0258 14.5262 11.6866 14.6667 11.333 14.6667H4.66634C4.31272 14.6667 3.97358 14.5262 3.72353 14.2762C3.47348 14.0261 3.33301 13.687 3.33301 13.3334V4.00004H12.6663Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {Notes.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p className="empty-text">
              No notes yet. Create your first note above!
            </p>
          </div>
        )}

        {/* Update Panel */}
        {isUpdatePanelOpen && (
          <>
            <div
              className={`modal-overlay ${isUpdatePanelOpen ? "active" : ""}`}
              onClick={closeUpdatePanel}
            />
            <div
              className={`update-panel ${isUpdatePanelOpen ? "active" : ""}`}
            >
              <div className="update-panel-header">
                <div className="panel-title-section">
                  <div className="panel-icon">✏️</div>
                  <h2 className="panel-title">Update Note</h2>
                </div>
                <button
                  className="close-panel-btn"
                  onClick={closeUpdatePanel}
                  type="button"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="update-form">
                <div className="update-input-desc">
                  <label className="update-label">Description</label>
                  <textarea
                    name="description"
                    value={updateForm.description}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                    required
                    className="update-textarea"
                    rows="5"
                  />
                </div>

                <div className="update-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeUpdatePanel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* Delete All Confirmation Dialog */}
        {showDeleteAllConfirm && (
          <>
            <div
              className={`modal-overlay ${showDeleteAllConfirm ? "active" : ""}`}
              onClick={() => setShowDeleteAllConfirm(false)}
            />
            <div
              className={`confirm-dialog ${showDeleteAllConfirm ? "active" : ""}`}
            >
              <div className="confirm-icon-wrapper">
                <div className="confirm-icon">⚠️</div>
              </div>
              <h2 className="confirm-title">Delete All Notes?</h2>
              <p className="confirm-message">
                Are you sure you want to delete all {Notes.length} notes? This
                action cannot be undone.
              </p>
              <div className="confirm-actions">
                <button
                  className="confirm-cancel-btn"
                  onClick={() => setShowDeleteAllConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="confirm-delete-btn"
                  onClick={handleDeleteAll}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Delete All
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
