import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoute from '../utils/PrivateRoute'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import NotesProvider from "../contexts/NotesProvider"


export default function App() {
  return (
    <BrowserRouter>
      <NotesProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </NotesProvider>
    </BrowserRouter>
  )
}
