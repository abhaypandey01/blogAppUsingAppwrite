import React, { useState } from 'react'
import authservice from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Button, Input } from "./index"

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError('')
        try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const userData = await authservice.getcurrentuser(userData)
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <h2 className="text-center text-2xl font-bold leading-tight">New user please sign up</h2>
            <p className="mt-2 text-center text-base text-black/60">
                <Link to={"/signup"}>SignUp</Link>
            </p>
            <h2 className="text-center text-2xl font-bold leading-tight">Already have an account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                <Link to={"/login"} className="font-medium text-primary transition-all duration-200 hover:underline">Sign In</Link>
            </p>
            {error && <p className="text-green-600 mt-8 text-center">Sign Up Successful, You can Log In now.</p>}
            
            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                        type="text"
                        label="Name:"
                        placeholder="Enter Your name"
                        {...register("name",{
                            required: true,
                        })}
                    />
                    <Input
                        type="email"
                        placeholder="Enter email"
                        label="Email: "
                        {...register("email", {
                            required: true,
                        })}
                    />
                    <Input
                        type="password"
                        placeholder="Enter password"
                        label="Password: "
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button
                        type='submit'
                        className='w-full'
                    >Create Account
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignUp