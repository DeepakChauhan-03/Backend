import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'
import { useContext } from 'react'
import Customize2 from './pages/Customize2'

const App = () => {
  const {userData, setUserData} = useContext(userDataContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={(userData?.assistantImage && userData?.assistantName)?
          <Home /> : <Navigate to={"/customize"} />
        } />
        <Route path='/signin' element={!userData? <SignIn /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!userData? <SignUp /> : <Navigate to={"/"} />} />
        <Route path='/customize' element={userData ? <Customize /> :
         <Navigate to={"/signup"} />} />

         <Route path='/customize2' element={userData ? <Customize2 /> :
         <Navigate to={"/signup"} />} />
      </Routes>
    </div>
  )
}

export default App
