import React from 'react'
import axios from 'axios'

const CreatePost = () => {
 const handleSubmit = (e)=>{
   e.preventDefault();
   
   const formData = new FormData(e.target)
   axios.post("http://localhost:3000/create-post",formData)
   .then((res)=>{
    console.log(res)
    alert("file uploaded")
    e.target.reset();  //clears all fields
   })
   .catch((err)=>{
    console.log("error")
   })
 }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-blue-100'>
      <div className="section h-78 w-90 flex flex-col items-center pt-9 border rounded-xl">
        <h1 className='text-4xl mb-8'>Create Post</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 '>
            <input type="file" className='border-2 rounded' name='image' accept='*'/>
            <input type="text" className='border-2 rounded' placeholder='Enter caption' name='caption' />
            <button type='submit' className='px-2 py-3 bg-green-400 rounded text-white font-semibold'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
