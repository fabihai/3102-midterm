import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  const [info, setInfo] = useState({
    key: "",
    title: "",
    content: ""
  });
  const [note, setNote] = useState(notes);

  function handleChange(event) {
    const { value, name } = event.target;

    setInfo((prevValue) => {
      if (name === "title") {
        return {
          title: value,
          content: prevValue.content
        };
      } else if (name === "content") {
        return {
          key: note.length + 1,
          title: prevValue.title,
          content: value
        };
      }
    });
  }

  function addNote() {
    setNote((prevNotes) => {
      return [...prevNotes, info];
    });
    setInfo({ key: "", title: "", content: "" });
  }

  const deleteNote = (key) => {
    setNote(note.filter((note) => note.key !== key));
    setInfo({ key: "", title: "", content: "" });
  };

  return (
    <div>
      <Header />
      <div class="mainnote">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={info.title}
        />
        <input
          name="content"
          placeholder="Take a note..."
          onChange={handleChange}
          type="text"
          value={info.content}
        />
        <button class=".update" onClick={addNote}>
          <span>ADD</span>
        </button>
      </div>
      {note.map((note) => (
        <Note
          class="note"
          key={note.key}
          title={note.title}
          content={note.content}
          onDelete={() => deleteNote(note.key)}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
