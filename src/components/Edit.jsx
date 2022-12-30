import React, { useState } from 'react'

export default function Edit(props) {

  const [note, setNote] = useState({
    title: props.note.title,
    content: props.note.content
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote() {
    props.onSave(props.note.id, note)
  }



  return (
    <div className="fixed bg-black z-50 top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg px-4 py-3">
        <form onSubmit={submitNote} className="flex flex-col w-96">
          <div className="font-bold text-xl mb-2">Title</div>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            className="border border-black rounded-md py-2 px-4 mb-8"
          />
          <div className="font-bold text-xl mb-2">Content</div>
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={5}
            className="border border-black rounded-md py-2 px-4"
          />
        </form>
        <div className="flex flex-row-reverse mt-8">
          <button className="btn bg-red-primary ml-4" onClick={props.onCancel}>Cancel</button>
          <button className="btn bg-blue-primary" onClick={submitNote}>Save</button>
        </div>
      </div>
    </div>
  )
}
