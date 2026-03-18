import { Link } from "react-router"
import "../style/form.scss"
import { useState } from "react"
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function HandelFormSubmitRegister(e) {
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password
        },{
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data)
        })
    }


  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={HandelFormSubmitRegister}>
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