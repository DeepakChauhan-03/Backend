import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl grid grid-cols-2 gap-8 p-8 w-full max-w-6xl">

        {/* Left Section */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Job Description</h2>

          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste job description here..."
            className="w-full h-[350px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">

          <h2 className="text-2xl font-semibold">Candidate Details</h2>

          {/* Resume Upload */}
          <div className="flex flex-col gap-2">
            <label htmlFor="resume" className="font-medium">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
              className="border border-gray-300 p-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Self Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="selfDescription" className="font-medium">
              Self Description
            </label>
            <textarea
              id="selfDescription"
              placeholder="Describe yourself in few words..."
              className="p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Generate Interview Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;