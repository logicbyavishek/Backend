import { Link } from "react-router"
import "../style/form.scss"
import { useState } from "react"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {handleRegister,loading} = useAuth()
    const navigate = useNavigate()

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

    async function handelSubmit(e) {
        e.preventDefault()

        handleRegister(username,email,password)
        .then(res=>{
            console.log(res)
            navigate("/login")
        })
        
    }


  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handelSubmit}>
                <input
                    onInput={(e)=>{setUsername(e.target.value)}} 
                    type="text"
                    name='username'
                    placeholder='Enter Username' />
                <input
                    onInput={(e)=>{setEmail(e.target.value)}} 
                    type="email"
                    name='email'
                    placeholder='Enter Emaili' />
                <input 
                    onInput={(e)=>{setPassword(e.target.value)}}
                    type="password"
                    name='password'
                    placeholder='Enter Password' />

                <button type='submit'>Register</button>
            </form>
            <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register