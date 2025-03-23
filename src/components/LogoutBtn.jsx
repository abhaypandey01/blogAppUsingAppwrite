import React from 'react'
import authservice from "../appwrite/auth"
import {useDispatch} from "react-redux"
import {logout} from "../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = ()=> {
        authservice.logout().then(dispatch(logout()))
    }

  return (
    <button onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn