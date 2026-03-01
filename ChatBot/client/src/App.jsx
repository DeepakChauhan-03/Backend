import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Loading from "./components/Loading";

const App = () => {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(question);
    setLoadingStatus(true);

    axios.post("http://localhost:3000/ask", { question })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes._status) {
          setData(finalRes.finalData);
          setLoadingStatus(false);
        }
      });

    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center py-10 text-white">
      
      <h1 className="text-5xl font-bold mb-8 tracking-wide">
        🤖 Gemini AI Chatbot
      </h1>

  
      <div className="main w-[90%] h-[80vh] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl flex gap-10 p-8">

        <div className="left w-1/2 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              className="w-full h-[75%] resize-none rounded-xl p-4 text-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="h-[55px] w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-all duration-300  font-semibold rounded-xl shadow-lg">
              Create Content 
            </button>

          </form>
        </div>

      
        <div className="right w-1/2 bg-black/40 rounded-xl p-6 overflow-y-auto  border border-gray-700">
          
          {loadingStatus ? (<Loading />) : (
            <div className="prose prose-invert max-w-none text-lg">
              <ReactMarkdown>{data}</ReactMarkdown>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;