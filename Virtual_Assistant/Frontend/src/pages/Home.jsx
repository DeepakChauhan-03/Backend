import React, { useContext, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext)
  const navigate = useNavigate()

  const handleLogOut = async()=>{
    try {
       const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
       setUserData(null)
       navigate("/signin")
       
    } catch (error) {
      console.log("error in handleLogout",error)
    }
  }

  //speech recognition
  useEffect(()=>{
     const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

     const recognition = new speechRecognition()
     recognition.continuous = true,
     recognition.lang = 'en-US'

     recognition.onresult = async(e)=>{
       const transcript = e.results[e.results.length-1][0].transcript.trim();
       console.log(transcript)

     }

     recognition.start() //by default start 
     if(transcript.toLowercase().includes(userData.assistantName.toLowercase())){
         const data = await  getGeminiResponse(transcript)
         console.log(data)
     }

  },[])


  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#020260]
    flex items-center justify-center flex-col'>
      {/* //logout button */}
      <button className='h-15 min-w-38 absolute top-5 right-12 bg-white rounded-full text-black
       font-semibold text-lg mt-4 hover:bg-gray-300 cursor-pointer'
       onClick={handleLogOut}>LogOut</button>

       {/* //customize button */}
       <button className='h-15 min-w-65 absolute top-25 right-10 bg-white rounded-full text-black
       font-semibold text-lg mt-4 hover:bg-gray-300 cursor-pointer'
       onClick={()=>navigate("/customize")}>Customize the assistant</button>

      <div className='w-75 h-100 flex justify-center items-center
       overflow-hidden rounded-4xl shadow-xl shadow-blue-500'>
          <img src={userData?.assistantImage} alt="image"
          className='h-full w-full object-cover '  />
      </div>
      <h1 className='text-4xl text-white mt-10'>I'm {userData.assistantName}</h1>
    </div>
  )
}

export default Home
