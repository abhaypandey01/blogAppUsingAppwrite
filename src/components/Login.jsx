import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {login as storeLogin} from "../store/authSlice"
import {Button, Input} from "./index"
import authservice from '../appwrite/auth'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const {register, handleSubmit} = useForm()

  const login = async (data) => {
    setError("")
    try {
      const session = await authservice.login(data)
      if (session) {
        const userData = await authservice.getcurrentuser()
        if(userData) dispatch(storeLogin(userData));
        navigate("/")
        
      }
        
    } catch (error) {
      setError(error)
    }
  }
  return (
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
      <p className="mt-2 text-center text-base text-black/60">
        <Link
      to={"/signup"}
      className="font-medium text-primary transition-all duration-200 hover:underline"
      >
      Sign Up
      </Link></p>
      {error && <p>
        {error.toString()}
        </p>}
      <form onSubmit={handleSubmit(login)} className='mt-8'>
        <div>
          <Input 
          type="email"
          placeholder="Enter email"
          label="Email: "
          {...register("email", {
            required : true,
          })}
          />
          <Input 
          type="password"
          placeholder="Enter password"
          label="Password: "
          {...register("password", {
            required : true,
          })}
          />
          <Button
          type='submit'
          >Sign IN
          </Button>
        
        </div>
      </form>
    </div>
  )
}

export default Login