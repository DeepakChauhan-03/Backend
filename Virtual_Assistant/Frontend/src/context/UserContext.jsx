import React, { createContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
export const userDataContext = createContext()

const UserContext = ({children}) => {
  
    const serverUrl = "http://localhost:8000"
    const [userData,setUserData] = useState(null)
      const [frontendImage,setFrontendImage] = useState(null)
      const [backendImage,setBackendImage] = useState(null)
      const [selectedImage, setSelectedImage] = useState(null)

      //getting current User
    const handleCurrentUser = async()=>{
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
        setUserData(result.data)
        console.log(result.data)

      } catch (error) {
        console.log("error in current user",error)
      }
    }
   
    //gemini response
    const getGeminiResponse = async(command)=>{
       try {
         const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},
          {withCredentials:true})

          return result.data

       } catch (error) {
           console.log("error in gemini response", error)
       }
    }


    useEffect(()=>{
      handleCurrentUser()
    },[])

    const value = {
        serverUrl, userData, setUserData, frontendImage,setFrontendImage,
        backendImage,setBackendImage, selectedImage, setSelectedImage, getGeminiResponse
    }


  return (
    
        <userDataContext.Provider value={value}>  
             {children}
        </userDataContext.Provider>  
      
  )
}

export default UserContext
