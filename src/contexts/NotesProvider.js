import React, { useEffect, useState } from "react"
import axios from "axios"
import { URL_BASE, LOCAL_STORAGE_TOKEN_NAME } from "./constants";


export const NotesContext = React.createContext()


export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState();
  const [username, setUsername] = useState("");

  async function getNotes() {
    await axios
      .get(`${URL_BASE}/api/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)}`,
        },
      })
      .then(res => { setNotes(res.data.notes); setUsername(res.data.username) })
  }
  useEffect(() => {
    getNotes()
  }, [])


  return (
    <NotesContext.Provider value={{ notes, setNotes, username, getNotes }}>
      {children}
    </NotesContext.Provider>
  )
}

