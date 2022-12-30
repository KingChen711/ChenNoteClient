import React, { useState } from 'react'
import { URL_BASE, LOCAL_STORAGE_TOKEN_NAME } from '../contexts/constants';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState({
    isError: false,
    errorMessage: ""
  })

  function handleClick() {
    setIsLogin(!isLogin)
    setError({
      isError: false,
      errorMessage: ""
    })
  }


  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }


  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value)
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username,
      password,
      confirmPassword
    }
    try {
      await axios
        .post(`${URL_BASE}/api/auth/${isLogin ? "login" : "register"} `, data)
        .then(res => localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken))
      navigate("/")
    } catch (error) {
      setError({
        isError: true,
        errorMessage: error.response.data.message
      })
    }

  }


  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-center items-center text-black">
        <h1 className="text-6xl font-bold">ChenNote</h1>
        <h3 className="text-4xl my-5">Note everything you want</h3>
        <input

          onChange={e => handleUsernameChange(e)} value={username}
          className="py-2 px-4 rounded-md w-96 "
          type="text"
          placeholder="Username" />
        <input
          onChange={e => handlePasswordChange(e)}
          value={password}
          className="py-2 px-4 rounded-md w-96 my-3"
          type="password"
          placeholder="Password" />
        {!isLogin && <input
          onChange={e => handleConfirmPasswordChange(e)} value={confirmPassword}
          className="py-2 px-4 rounded-md w-96 mb-3"
          type="password"
          placeholder="Confirm Password" />}
        {error.isError && <div className="text-red-500 text-lg py-2 px-4 bg-red-200 w-96 rounded-md border-red-500 border">{error.errorMessage}</div>}
        <button type="submit" className="btn bg-blue-primary my-6">{isLogin ? "Login" : "Register"}</button>
      </form>
      <div className="text-lg">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={handleClick} className="ml-4 btn bg-red-primary">{isLogin ? "Register" : "Login"}</span>
      </div>
    </div>
  )
}
