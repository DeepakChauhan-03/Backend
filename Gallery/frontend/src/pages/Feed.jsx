import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Feed = () => {
 
    const [posts,setPosts] = useState([
        {
            _id:"1",
            image:"https://images.unsplash.com/photo-1770131105102-054c3869f50a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption:"Beautiful photo"
        }
    ])

    useEffect(() =>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            setPosts(res.data.posts)
        })
    },[])

  return (
    <div className='main-feed h-screen w-screen'>
        <h1 className='font-semibold text-3xl m-6 underline'>Saved Images</h1>
      <div className="feed m-6 flex flex-wrap items-center justify-center gap-4">
        
        {
            posts.length > 0 ? (
                posts.map((post)=>{
                   return <div key={post._id} className='feed-content h-75 w-[calc(25%-1rem)] border rounded '>
                        <img src={post.image} alt="" className='h-[86%] w-full '/>
                        <p className=' text-xl'>{post.caption}</p>
                    </div>
                })
            ) :(
                <h1>No Post available</h1>
             )
        }
      </div>
    </div>
  )
}

export default Feed
