import React, { useState, useEffect } from "react";
import axiosInstance from "../Api";

const Profile = () => {

  const [update, setUpdate] = useState(true);
  const [user, setUser] = useState(null);

  async function fetchProfile() {
    try {

      const res = await axiosInstance.get("/user/auth/getProfile");
    console.log(res)
      setUser(res.data.user);   // backend se user

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-blue-100 p-6 rounded-2xl shadow-md w-full max-w-md">

      <div className="flex items-center gap-4">

        <div className="text-center">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.CIn8fInVEpY4ti24C9LfWgHaFJ?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="profile"
            className="w-30 h-30 rounded-full object-cover"
          />
          <p className="text-sm text-blue-700 cursor-pointer mt-2">
            Change
          </p>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-blue-900">
            {user.name}
          </h2>

          <div className="mt-3 space-y-2">

            <input
              type="email"
              className="w-full p-2 border rounded-md"
              value={user.email}
              disabled={update}
              readOnly
            />

            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={user.number}
              disabled={update}
              readOnly
            />

            <div className="flex gap-4 text-sm">

              <label>
                <input
                  type="radio"
                  checked={user.gender === "male"}
                  readOnly
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  checked={user.gender === "female"}
                  readOnly
                />
                Female
              </label>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
