import React from 'react'
import axiosInstance from '../Api'

const File = () => {

   const handleSubmit = (e)=>{
   e.preventDefault();
   
   const formData = new FormData(e.target)

   
   axiosInstance.post("/create-post",formData)
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
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      
      <h2 className="text-lg font-semibold text-blue-900 text-center mb-5">
        Please Add Your Medical Records
      </h2>

      <div className="space-y-4">

        {/* File Type */}
       <form onSubmit={handleSubmit}>
          <select className="w-full p-3 border rounded-lg">
          <option>Select file type</option>
          <option>Prescription</option>
          <option>Lab Report</option>
          <option>X-ray</option>
          <option >Blood Test</option>
          <option>MRI Scan</option>
          <option>CT Scan</option>
        </select>

        {/* File Name */}
        <input
          type="text"
          name='caption'
          placeholder="Enter Name of File..."
          className="w-full p-3 border rounded-lg"
        />

        {/* File Upload */}
        <div className="flex justify-between items-center">
          <input type="file" className='border rounded p-1' name='image' accept='*'/>

          <button type='submit' className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800">
            Submit
          </button>
          
          </div>
       </form>
        </div>

      </div>
    
  );
};
export default File
