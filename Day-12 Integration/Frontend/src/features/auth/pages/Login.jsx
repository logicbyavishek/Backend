import React, { useState } from 'react'
import {Link} from "react-router"
import "../style/from.scss"

const Login = () => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

    }


  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        id='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter password' />
                    <button className='button primary-button' >Login</button>
                </form>
                <p>Don't have an account ? <Link to={"/register"} >Create One.</Link></p>
        </div>
    </main>
  )
}

export default Login