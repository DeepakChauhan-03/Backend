import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'

const Customize2 = () => {
    const {userData} = useContext(userDataContext)
    const [assistantName,setAssistantName] = useState(userData?.assistantName || "")
  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#020260]
    flex items-center justify-center flex-col'>
        <h1 className='text-white text-5xl pb-10 font-semibold'>Enter your
       <span className='text-blue-200'> assistant Name</span></h1>
          <input type="text"  placeholder='eg.aura' className='w-100 h-15 
       outline-none border-2 border-white bg-transparent text-white placeholder-gray-300
       px-5 py-2.5 text-xl rounded-full' required 
       onChange={(e)=> setAssistantName(e.target.value)} value={assistantName}/>

      {
        assistantName?  <button className='h-15 min-w-50 bg-white rounded-full text-black
       font-semibold text-lg mt-6 hover:bg-gray-300 ' 
       onClick={()=> navigate("/customize2")}>Create your Assistant</button> : ""
      }
    </div>
  )
}

export default Customize2
