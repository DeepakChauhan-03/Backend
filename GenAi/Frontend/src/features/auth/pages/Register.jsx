import React, { useState } from 'react'
import {useNavigate , Link} from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()

  const {loading, handleRegister} = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const handleSubmit = async (e)=>{
     e.preventDefault()
     await handleRegister({username, email, password})
     navigate("/")
    }
 if(loading){
  return (<div><h1>Loading....</h1></div>)
 }

  return (
    <div>
       <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-900'>
  <form
  onSubmit={handleSubmit}
  className='bg-gray-300 p-6 rounded-lg shadow-md flex flex-col gap-4 w-100'>
    <h1 className='text-3xl font-semibold text-center'>Register</h1>

   <div>
      <label htmlFor="username">Username</label>
      <input 
      onChange={(e)=>{setUsername(e.target.value)}}
      className='border w-full p-2 rounded mt-1' type="text" id='username' name='username' placeholder='Enter Username'/>
    </div>

    <div>
      <label htmlFor="email">Email</label>
      <input
      onChange={(e)=>{setEmail(e.target.value)}}
      className='border w-full p-2 rounded mt-1' type="text" id='email' name='email' placeholder='Enter e-mail'/>
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <input 
      onChange={(e)=>{setPassword(e.target.value)}}
      className='border w-full p-2 rounded mt-1' type="password" id='password' name='password' placeholder='Enter your password'/>
    </div>

    <button className='bg-green-500 text-white p-2 rounded active:scale-95'>Register</button>

     <p className='mx-14'>Already have an account? <Link to={"/login"} className='text-blue-900 underline'>Login</Link></p>
  </form>
 
</div>
    </div>
  )
}

export default Register
