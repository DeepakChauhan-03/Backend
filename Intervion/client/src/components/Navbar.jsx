import React from 'react'
import { useSelector } from 'react-redux'
import { VscRobot } from "react-icons/vsc";
import { BsCoin } from "react-icons/bs";
const Navbar = () => {
    const {userData} = useSelector((state)=>state.user)
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
          <div className='w-full max-w-6xl bg-white rounded-3xl shadow-sm border
          border-gray-200 px-8 py-4 flex justify-between items-center relative'>
              <div className='flex items-center gap-3 cursor-pointer'>
                <div className='bg-black text-white p-2 rounded-lg'>
                     <VscRobot size={18}/>
                </div>
                <h1 className='font-semibold hidden md:block text-lg'>Intervion.AI</h1>
              </div>

              <div className='flex items-center gap-6 relative'>
                     <div className='relative '>
                      <button className='flex items-center gap-2 bg-gray-100 px-4 py-2 
                      rounded-full text-md hover:bg-gray-200 transition'>
                        <BsCoin size={18} />
                        {userData ?.credits || 0}
                      </button>
                     </div>
                     <div className='relative'>
                         <button className='w-9 h-9 bg-black text-white rounded-full
                         flex items-center justify-center font-semibold'>
                           {userData? userData.name.slice(0,1).toUpperCase() : 'X'}
                         </button>
                     </div>
              </div>
          </div>
    </div>
  )
}

export default Navbar
