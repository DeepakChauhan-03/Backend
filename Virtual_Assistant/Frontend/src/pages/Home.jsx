import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ai from '../assets/ai.jpg'
import user from '../assets/user.gif'

const Home = () => {
  const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext)
  const navigate = useNavigate()

  const [listening,setListening] = useState(false)
const [userText,setUserText] = useState("")
const [aiText, setAiText] = useState("")

  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const isRecognizingRef = useRef(false)
  const synth = window.speechSynthesis

  const handleLogOut = async()=>{
    try {
       const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
       setUserData(null)
       navigate("/signin")
       
    } catch (error) {
      console.log("error in handleLogout",error)
    }
  }
   const startRecognition = ()=>{
    try {
      recognitionRef.current?.start();
      setListening(true)
    } catch (error) {
      if(!error.message.includes("start")){
        console.error("recognition error",error)
      }
    }
   }

  //speak function
  const speak = (text)=>{
     const utterence = new SpeechSynthesisUtterance(text)

     utterence.lang = "hi-IN";
     const voices = window.speechSynthesis.getVoices()
     const hindiVoice = voices.find(v => v.lang === 'hi-IN');
     if(hindiVoice){
      utterence.voice = hindiVoice;
     }
    //  window.speechSynthesis.speak(utterence)


    isSpeakingRef.current = true
    utterence.onend = ()=>{
      setAiText("")
       isSpeakingRef.current = false
       setTimeout(()=>{
        startRecognition()
       },800)
    }
    synth.cancel() //pehle se koi speech ho to hata dega
    synth.speak(utterence)
  }
  //handle command like- play song on youtube
  const handleCommand = (data)=>{
    const {type,userInput,response} = data;
    speak(response);

    if(type === 'google_search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`,'_blank');
    }

     if(type === 'calculator_open'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=calculator`,'_blank');
    }

     if(type === 'instagram_open'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.instagram.com/`,'_blank');
    }

     if(type === 'weather_show'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=weather`,'_blank');
    }

     if(type === 'google_search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`,'_blank');
    }

     if(type === 'youtube_search' || type === 'youtube_play'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/search_query=${query}`,'_blank');
    }

  }

  //speech recognition
  useEffect(()=>{
     const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

     const recognition = new speechRecognition()
     recognition.continuous = true,
     recognition.lang = 'en-US'
     recognition.interimResults = false

     recognitionRef.current = recognition

     let isMounted = true
     //start recognition after 1 second delay only if 
    //  component still isMounted
    const startTimeout = setTimeout(()=>{
      if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current){
        try {
          recognition.start()
          console.log("Recognition requested to start");
        } catch (error) {
           if(error.name !== 'InavlidStateError'){
            console.log(error);
           }
        }
      }
    },1000)


     const safeRecognition = ()=>{
      if(!isSpeakingRef.current && !isRecognizingRef.current){
        try {
          recognition.start()  //start recording
          console.log("Recognition Start");
        } catch (error) {
           console.log("error in saferecognition",error)
        }
      }
     }
     

    //  recognition start
     recognition.onstart = ()=>{
        console.log("Recognition start");
        isRecognizingRef.current = true;
        setListening(true)
     }
     //recognition end
     recognition.onend = ()=>{
      isRecognizingRef.current = false;
      setListening(false)
      if(isMounted && !isSpeakingRef.current){
        setTimeout(()=>{
          if(isMounted){
            try {
              recognition.start()
              console.log("Recognition started");
            } catch (error) {
               if(error.name !== 'InvalidStateError'){
                console.log(error)
               }
            }
          }
        },1000)
      }
     }

     if(!isSpeakingRef.current){
       setTimeout(()=>{
        safeRecognition()
       },1000) //1sec
     }


     recognition.onresult = async(e)=>{
       const transcript = e.results[e.results.length-1][0].transcript.trim();
       console.log(transcript)

      
     if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
         setAiText("")
        setUserText(transcript)
          recognition.stop()
          isRecognizingRef.current = false
          setListening(false)
         const data = await  getGeminiResponse(transcript)
         console.log(data)
         handleCommand(data)
         setAiText(data.response)
         setUserText("")
        //   if (data) { 
        //     speak(data.response); //speak function line no. 21
        // }
     }

     }

      // recognition.start() //by default start 
     const fallback = setInterval(()=>{
        if(!isSpeakingRef.current && !isRecognizingRef.current ){
          safeRecognition()
        }
     },10000)

     safeRecognition()

    //greeting
      const greeting = new SpeechSynthesisUtterance(`Hello 
        ${userData.name} , what can I help you`);
        greeting.lang = 'hi-IN'
         

     return ()=>{
      isMounted = false
      clearTimeout(startTimeout)
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
      // clearInterval(fallback)
     }

  },[])


  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#020260]
    flex items-center justify-center flex-col'>
      {/* //logout button */}
      <button className='h-15 min-w-38 absolute hidden lg:block top-5 right-12 bg-white rounded-full text-black
       font-semibold text-lg mt-4 hover:bg-gray-300 cursor-pointer'
       onClick={handleLogOut}>LogOut</button>

       {/* //customize button */}
       <button className='h-15 min-w-65 absolute hidden lg:block top-25 right-10 bg-white rounded-full text-black
       font-semibold text-lg mt-4 hover:bg-gray-300 cursor-pointer'
       onClick={()=>navigate("/customize")}>Customize the assistant</button>

      <div className='w-75 h-100 flex justify-center items-center
       overflow-hidden rounded-4xl shadow-xl shadow-blue-500'>
          <img src={userData?.assistantImage} alt="image"
          className='h-full w-full object-cover '  />
      </div>
      <h1 className='text-4xl text-white mt-10'>I'm {userData.assistantName}</h1>
      {
        !aiText && <img src={user} alt=""  className='w-[200px]'/>
      }
       {
        aiText && <img src={ai} alt=""  className='w-[200px]'/>
      }
      <h1 className='text-white text-2xl font-semibold'
      >{userText?userText: ai?aiText : null}</h1>
    </div>
  )
}

export default Home
