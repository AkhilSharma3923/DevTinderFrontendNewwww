import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Requests from './components/Requests'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Body />} >
      
      <Route path="/" element={<Feed />} />

      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/connections' element={ <Connections />} />
      <Route path='/requests' element={<Requests />} />

      </Route>

    </Routes>

    <Footer />
    


    </>
  )
}

export default App
