import React from 'react'
import { useNavigate, Link } from 'react-router'

const Login = () => {
const navigate = useNavigate()

 const handleSubmit = (e)=>{
   e.preventDefault();
 }

  return (
   <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-900'>
  <form
  onSubmit={handleSubmit}
  className='bg-gray-300 p-6 rounded-lg shadow-md flex flex-col gap-4 w-100'>
    <h1 className='text-3xl font-semibold text-center'>Login</h1>

    <div>
      <label htmlFor="email">Email</label>
      <input className='border w-full p-2 rounded mt-1' type="text" id='email' name='email' placeholder='Enter e-mail'/>
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <input className='border w-full p-2 rounded mt-1' type="password" id='password' name='password' placeholder='Enter your password'/>
    </div>

    <button className='bg-green-500 text-white p-2 rounded active:scale-95'>Login</button>

     <p className='mx-14'>Don't have an account? <Link to={"/register"} className='text-blue-900 underline'>Register</Link></p>
  </form>
</div>
  )
}

export default Login
