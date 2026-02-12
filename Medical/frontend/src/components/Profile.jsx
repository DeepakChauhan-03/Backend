import React from "react";

const Profile = () => {
  return (
    <div className="h-70 w-150 border rounded-2xl bg-blue-200 flex">
      <div className="dp h-full w-[30%] bg-red-200 flex flex-col items-center justify-center">
        <div className="h-30 w-30 border-2 rounded-full"></div>
        <button>Change</button>
      </div>
      <div className="info h-full w-[70%] justify-center items-center">
        <h1>Deepak chauhan</h1>
        <form action="" className="flex flex-col">
         <div>
             <label htmlFor="email">E-mail : </label>
          <input
            type="email"
            name="email"
            placeholder="Enter e-mail"
            className=""
          />
         </div>

         <div> 
            <label htmlFor="password">Password : </label>
          <input
            type="number"
            placeholder="Enter number"
            name="password"
            className=""
          /></div>

          <div className="flex items-center mb-4">
            <label className="w-20 font-medium">Gender :</label>
            <label className="mr-4">
              <input type="radio" name="gender" value="Male" />
              Male
            </label>

            <label>
              <input type="radio" name="gender" value="Female" />
              Female
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
