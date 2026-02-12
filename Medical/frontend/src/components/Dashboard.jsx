import React from "react";
import Nav from "./nav";
import Profile from "./Profile";
import File from "./File";

const Dashboard = () => {
  return (
    <div className="">
      <Nav />
      <div className="flex justify-between px-22 pt-6">
        <Profile />
        <File />
      </div>
    </div>
  );
};

export default Dashboard;
