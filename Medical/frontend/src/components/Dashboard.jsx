import React from "react";
import Nav from "./nav";
import Profile from "./Profile";
import File from "./File";
import Posts  from './Posts'

const Dashboard = () => {
  return (
    <div >
      <Nav />
      <div className="flex flex-col md:flex-row gap-8 pt-5 justify-between px-40">
        <Profile />
        <File />
      </div>
      <Posts />
    </div>
  );
};

export default Dashboard;
