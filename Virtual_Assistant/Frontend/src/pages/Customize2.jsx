import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";

const Customize2 = () => {
    const navigate = useNavigate()
    const {userData,setUserData,backendImage,selectedImage,serverUrl} = useContext(userDataContext)
    const [assistantName,setAssistantName] = useState(userData?.assistantName || "")

    const handleUpdateAssistant = async()=>{
        try {
            let formData = new FormData()
            formData.append("assistantName",assistantName)
            if(backendImage){
                formData.append("assistantImage",backendImage)
            }
            else{
                formData.append("imageUrl",selectedImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/update`,formData,
                {withCredentials:true}
            )
             console.log(result.data)
             setUserData(result.data)
             
        } catch (error) {
             console.log("Status:", error.response?.status);
             console.log("Data:", error.response?.data);
             console.log(error);
        }
    }

  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#020260]
    flex items-center justify-center flex-col'>
        <IoIosArrowRoundBack className='absolute top-7 left-17 cursor-pointer text-white text-5xl font-extrabold ' 
        onClick={()=>navigate("/customize")} />
        <h1 className='text-white text-5xl pb-10 font-semibold'>Enter your
       <span className='text-blue-200'> assistant Name</span></h1>
          <input type="text"  placeholder='eg.aura' className='w-100 h-15 
       outline-none border-2 border-white bg-transparent text-white placeholder-gray-300
       px-5 py-2.5 text-xl rounded-full' required 
       onChange={(e)=> setAssistantName(e.target.value)} value={assistantName}/>

      {
        assistantName?  <button className='h-15 min-w-50 bg-white rounded-full text-black
       font-semibold text-lg mt-6 hover:bg-gray-300 ' 
       onClick={()=>{
        handleUpdateAssistant(),
        navigate("/")
        
       }}>Create your Assistant</button> : ""
      }
    </div>
  )
}

export default Customize2
