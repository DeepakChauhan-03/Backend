import React from 'react'
import { useSelector } from 'react-redux'
import { VscRobot } from "react-icons/vsc";

const Navbar = () => {
    const {userData} = useSelector((state)=>state.user)
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
          <div className='w-full max-w-6xl bg-white rounded-3xl shadow-sm border
          border-gray-200 px-8 py-4 flex justify-center items-center relative'>
              <div className='flex items-center gap-3 cursor-pointer'>
                <div className='bg-black text-white p-2 rounded-lg'>
                     <VscRobot size={18}/>
                </div>
                <h1 className='font-semibold hidden md:block text-lg'>Intervion.AI</h1>
              </div>
          </div>
    </div>
  )
}

export default Navbar
