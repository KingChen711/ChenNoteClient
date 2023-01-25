import React, { useContext } from 'react';
import Note from './Note';
import { NotesContext } from '../contexts/NotesProvider';
import Masonry from 'react-masonry-css';

export default function Notes(props) {
  const { notes } = useContext(NotesContext);

  const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500:1
  };
  return (
    <Masonry
      breakpointCols={breakpointObj}
      className="flex gap-4"
      columnClassName="my-masonry-grid_column"
    >
      {notes?.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={(id) => props.onDelete(id)}
            onEdit={(note) => props.onEdit(note)}
          />
        );
      })}
    </Masonry>
  );
}
