import React from 'react'
import {useSelector } from 'react-redux'
import { Container, LogoutBtn } from "./index"
import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: "Home",
      slug: "/",
      isActive: true
    },
    {
      name: "Login",
      slug: "/login",
      isActive: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      isActive: !authStatus
    }, {
      name: "All Posts",
      slug: "/all-posts",
      isActive: authStatus
    }, {
      name: "Add Post",
      slug: "/add-post",
    isActive: authStatus
    },

  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container >
        <nav className='flex'>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.isActive ?
                (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                  </li>
                ) : null)}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header