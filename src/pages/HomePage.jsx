import axios from 'axios';
import React, { useContext, useState } from 'react'
import Add from '../components/Add';
import Header from '../components/Header'
import Notes from '../components/Notes';
import { NotesContext } from '../contexts/NotesProvider';
import { URL_BASE, LOCAL_STORAGE_TOKEN_NAME } from "../contexts/constants"
import Edit from '../components/Edit';
import { v4 as uuidv4 } from 'uuid';

export default function HomePage() {

  const [isEditing, setIsEditing] = useState(false)
  const [editingNote, setEditingNote] = useState()
  const [isSaving, setIsSaving] = useState(false);
  const { notes, setNotes, username } = useContext(NotesContext);


  async function handleAdd(note) {
    setIsSaving(true)
    setNotes((prev) => {
      return [...prev, {
        ...note,
        _id: uuidv4()
      }]
    })
    await axios
      .post(`${URL_BASE}/api/notes/`, note, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_TOKEN_NAME
          )}`,
        },
      })
      .then(res => {
        const newNote = res.data.newNote;
        setNotes((prev) => {
          const clonePre = [...prev];
          clonePre.pop()
          return [...clonePre, newNote];
        })
        setIsSaving(false);
      })
  }


  async function handleDelete(id) {
    setIsSaving(true)
    setNotes(prev => {
      return prev.filter(note => {
        return note._id !== id;
      })
    })
    await axios
      .delete(`${URL_BASE}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_TOKEN_NAME
          )}`,
        },
      })
      .then(res => setIsSaving(false))
  }


  async function handleEdit(note) {
    setIsEditing(true);
    setEditingNote(note);
    console.log(note)
  }


  function handleCancel() {
    setIsEditing(false)
  }


  async function handleSave(id, note) {
    setIsSaving(true);
    setIsEditing(false);
    setNotes(prev => {
      return prev.map((item) => {
        if (item._id !== id) {
          return item
        }
        else {
          return {
            ...note,
            _id: id
          };
        }
      })
    })
    await axios
      .put(`${URL_BASE}/api/notes/${id}`, note, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LOCAL_STORAGE_TOKEN_NAME
          )}`,
        },
      })
      .then(res => setIsSaving(false));
  }


  return (
    <div>
      <Header haveLogout="true" username={username} />
      {
        isSaving &&
        <div className="fixed top-4 left-1/2 -translate-x-1/2 text-blue-primary text-4xl z-50">Đang lưu thay đổi...</div>
      }
      <div className="font-Poppins">
        <Add onAdd={(note) => { handleAdd(note) }} />
        <Notes onEdit={(note) => handleEdit(note)} onDelete={id => handleDelete(id)} notes={notes} />
      </div>
      {isEditing &&
        <Edit
          note={editingNote}
          onCancel={handleCancel}
          onSave={(id, note) => handleSave(id, note)} />
      }
    </div>
  )
}
