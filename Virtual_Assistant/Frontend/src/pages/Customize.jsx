import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from '../assets/jarvisbg.jpg'
import image2 from '../assets/mini_robo.jpg'
import image3 from '../assets/last.jpg'
import image4 from '../assets/robo.jpg'
import image5 from '../assets/pexel-robo.jpg'
import image6 from '../assets/robo_6.jpg'
import { LuImageUp } from "react-icons/lu";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Customize = () => {

  const {selectedImage, setSelectedImage,  frontendImage,setFrontendImage,
        backendImage,setBackendImage} = useContext(userDataContext)

  const inputImage = useRef()
  const navigate = useNavigate()

  const handleImage = (e)=>{
     const file = e.target.files[0]
     setBackendImage(file)
     setFrontendImage(URL.createObjectURL(file))
  }

  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#020260]
    flex items-center justify-center flex-col'>
     
     <h1 className='text-white text-5xl pb-10 font-semibold'>Select your
       <span className='text-blue-200'> Assistant Image</span></h1>

      <div className='w-[90%] max-w-[60%] flex justify-center items-center
       flex-wrap gap-7'>
          <Card  image={image6}/>
          <Card  image={image2}/>
          <Card  image={image3}/>
          <Card  image={image4}/>
          <Card  image={image5}/>
          <Card  image={image1}/>
          {/* input div */}
          <div 
          onClick={()=>{inputImage.current.click()
            setSelectedImage("input")
          }
          }
          className={`w-18 h-35 lg:w-45 lg:h-70 bg-[#030326] border-2 border-[blue] rounded-2xl 
    overflow-hidden hover:shadow-2xl hover:shadow-blue-500 cursor-pointer
    hover:border-3 hover:border-white flex items-center justify-center text-4xl 
    ${
        selectedImage==="input" ? "border-white border-4 shadow-2xl shadow-blue-500" : ""
      }`}>
      {
         !frontendImage && <LuImageUp  className='text-white'/>
      }
      {
        frontendImage && <img src={frontendImage} className='object-cover h-full' />
      }
        
    </div>

    <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage} />
      </div>
      {
        selectedImage && <button className='h-15 min-w-38 bg-white rounded-full text-black
       font-semibold text-lg mt-4 hover:bg-gray-300 ' 
       onClick={()=> navigate("/customize2")}>Next</button>
      }
    </div>
  )
}

export default Customize
