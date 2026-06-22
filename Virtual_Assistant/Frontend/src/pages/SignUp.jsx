import React, { useContext, useState } from 'react';
import bg from '../assets/jarvisbg.jpg';
import {useNavigate} from 'react-router-dom'
import UserContext, { userDataContext } from '../context/UserContext';
import axios from 'axios'

const SignUp = () => {
  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [err,setErr] = useState("")

  const {serverUrl,userData, setUserData} = useContext(userDataContext)

  const handleSignUp = async (e)=>{
    e.preventDefault();
    setErr("")
     try {
       let result = await axios.post(`${serverUrl}/api/auth/signup`,
        {name,email,password},{withCredentials:true});

        // console.log(result.data)
        setUserData(result.data)
        navigate("/customize")
     } catch (error) {
        console.log("error in signup api ", error)
        setUserData(null)
        setErr(error.response.data.message)
     }
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat
       flex items-center justify-center"
      style={{backgroundImage: `url(${bg})` }} >
   
     <form
     onSubmit={handleSignUp}
     className='w-[90%] h-150 max-w-125 bg-[#00000012]
      backdrop-blur shadow-lg  shadow-blue-300 flex flex-col items-center justify-center
      gap-5 px-5'>
     <h1 className='text-white text-[30px] mb-7.5 font-semibold'>Register to 
      <span className='text-blue-400'> Virtual Assistant</span></h1>
       
       {/* input name */}
       <input type="text"  placeholder='Enter your name...' className='w-full h-15 
       outline-none border-2 border-white bg-transparent text-white placeholder-gray-300
       px-5 py-2.5 text-xl rounded-full ' required
        onChange={(e)=> setName(e.target.value)} value={name}  />

       {/* input email */}
         <input type="email"  placeholder='Enter email...' className='w-full h-15 
       outline-none border-2 border-white bg-transparent text-white placeholder-gray-300
       px-5 py-2.5 text-xl rounded-full' required onChange={(e)=> setEmail(e.target.value)} value={email} />

       {/* input password */}
         <input type="password"  placeholder='Enter your password...' className='w-full h-15 
       outline-none border-2 border-white bg-transparent text-white placeholder-gray-300
       px-5 py-2.5 text-xl rounded-full' 
       required onChange={(e)=> setPassword(e.target.value)} value={password}/>
       {
       err.length>0 && <div className='text-red-600 font-semibold text-lg'>{err}</div>
       }
       <button className='h-15 min-w-38 bg-white rounded-full text-black
       font-semibold text-lg mt-4 hover:bg-gray-300'>Sign Up</button>
       <p className='text-white text-lg '>Already have an account ?
         <span className='text-blue-800 cursor-pointer'
         onClick={()=> navigate("/SignIn")}> Login</span></p>
     </form>

    </div>
  );
};

export default SignUp;