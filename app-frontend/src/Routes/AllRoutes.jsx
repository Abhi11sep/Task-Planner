import React from 'react'
import EnterDetails from '../Pages/EnterDetails'
import Home from '../Pages/Home'
import {Routes,Route} from 'react-router-dom'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<EnterDetails/>}/>
        <Route path="/home" element={<Home/>}/>
    </Routes>
  )
}

export default AllRoutes