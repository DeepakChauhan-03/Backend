import React from 'react'
import { VscRobot } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';

const Auth = () => {

  const handleGoogleAuth = async()=>{
        try {
          const response = await signInWithPopup(auth,provider)
          console.log(response)
        } catch (error) {
          
        }
  }

  return (
    <div className='w-full min-h-screen bg-[#f3f3f3]  flex items-center justify-center px-6 py-20'>
       <div className='w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200'>
            <div className='flex items-center justify-center gap-3 mb-6'>
                 <div className='bg-black text-white p-2 rounded-lg'>
                  <VscRobot size={18} /></div>
                 <h2 className='text-2xl font-semibold'>Intervion.AI</h2>
            </div>
            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
              Continue with
              <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex
              items-center gap-2'>
               <IoSparkles size={18} /> AI Smart Interview
              </span>
            </h1>
            <p className='text-gray-500 text-center text-sm md:text-base 
            leading-relaxed mb-8'> Sign in to start AI powered mock interviews,
            track your progress, and unlock detailed performance insights.</p>

            <button 
            onClick={handleGoogleAuth}
            className='w-full flex items-center justify-center gap-3 py-3 bg-black
            text-white rounded-full shadow-md hover:scale-102'>
              <FcGoogle size={20}/> Continue with Google
              </button>
       </div>
    </div>
  )
}

export default Auth
