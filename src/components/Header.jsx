import React from 'react'
import HighlightIcon from '@mui/icons-material/Highlight';
import { LOCAL_STORAGE_TOKEN_NAME } from '../contexts/constants';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const navigate = useNavigate();


  function handleLogOut() {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, "no-token");
    navigate("/auth");
  }


  return (
    <div className="py-4 px-8 bg-yellow-primary shadow-lg flex justify-between items-center">
      <div className="flex justify-start items-center text-white text-4xl font-bold">
        <HighlightIcon />
        ChenNote
      </div>
      {props.haveLogout &&
        <div className="flex justify-center items-center">
          <div className="btn bg-blue-primary cursor-default hover:opacity-100 mr-4 font-bold text-xl">Hello {props.username} <span className="text-red-primary">♥️</span></div>
          <button onClick={handleLogOut} className="btn bg-red-primary text-xl font-bold">Log Out</button>
        </div>}
    </div>
  )
}
