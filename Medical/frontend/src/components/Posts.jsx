import React, { useEffect, useState } from "react";
import axiosInstance from "../Api";

const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch posts
  const fetchPosts = async () => {

    try {

      const res = await axiosInstance.get("/posts");

      setPosts(res.data.posts);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  // loading UI
  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600 font-semibold">
        Loading posts...
      </div>
    );
  }

  // empty UI
  if (posts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No records uploaded yet
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5">

      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Uploaded Medical Records
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {posts.map((post) => (

          <div
            key={post._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >

            <img
              src={post.image}
              alt="record"
              className="w-full h-48 object-cover"
            />

            <div className="p-4">

              <p className="font-semibold text-gray-800">
                {post.caption}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default Posts;
