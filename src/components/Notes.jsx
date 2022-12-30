import React, { useContext } from 'react'
import Note from './Note'
import { NotesContext } from '../contexts/NotesProvider'

export default function Notes(props) {
  const { notes } = useContext(NotesContext)
  return (
    <div>
      {notes?.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={id => props.onDelete(id)}
            onEdit={(note) => props.onEdit(note)}
          />
        );
      })}
    </div>
  )
}
