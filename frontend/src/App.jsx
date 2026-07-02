import React from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import LeetCode from './components/LeetCode'
import Gfg from './components/Gfg'
import Codechef from './components/Codechef'
import CodeForces from './components/CodeForces'  
import Login from './components/Login'



export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/LeetCode' element={<LeetCode />} />
        <Route path='/Gfg' element={<Gfg />} />
        <Route path='/Codechef' element={<Codechef />} />
        <Route path='/CodeForces' element={<CodeForces />} />
        
      </Routes>
    </>
  )
}
