import React from 'react'
import Card from '../components/Card'
import image1 from '../assets/jarvisbg.jpg'
import { LuImageUp } from "react-icons/lu";

const Customize = () => {
  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#020260]
    flex items-center justify-center flex-col'>
     
     <h1 className='text-white text-5xl pb-10 font-semibold'>Select your
       <span className='text-blue-200'> Assistant Image</span></h1>

      <div className='w-[90%] max-w-[60%] flex justify-center items-center
       flex-wrap gap-7'>
          <Card  image={image1}/>
          <Card  image={image1}/>
          <Card  image={image1}/>
          <Card  image={image1}/>
          <Card  image={image1}/>
          <Card  image={image1}/>
          <div className='w-18 h-35 lg:w-45 lg:h-70 bg-[#030326] border-2 border-[blue] rounded-2xl 
    overflow-hidden hover:shadow-2xl hover:shadow-blue-500 cursor-pointer
    hover:border-3 hover:border-white flex items-center justify-center text-4xl'>
        <LuImageUp  className='text-white'/>
    </div>
      </div>
      
    </div>
  )
}

export default Customize
