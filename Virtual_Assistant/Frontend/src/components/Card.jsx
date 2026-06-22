import React from 'react'

const Card = ({image}) => {
  return (
    <div className='w-18 h-35  lg:w-45 lg:h-70 bg-[#030326] border-2 border-[blue] rounded-2xl 
    overflow-hidden hover:shadow-2xl hover:shadow-blue-500 cursor-pointer
    hover:border-3 hover:border-white'>
        <img src={image} className='h-full object-cover' alt="image" />
    </div>
  )
}

export default Card
