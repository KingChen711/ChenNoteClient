import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Note(props) {
  const { id, title, content } = props
  function handleDelete() {
    props.onDelete(id);
  }
  function handleEdit() {
    props.onEdit({ id, title, content });
  }
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
    </div>
  )
}
