import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Body from './Body'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path='/login'  />
      <Route path='' />

    </Routes>
    


    </>
  )
}

export default App
