import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TechBlog from './pages/TechBlog'

function App() {
  return (
    <Routes>
      <Route path='/' element={<div>Hello World!</div>} />
      <Route path='/blog' element={<TechBlog />} />
    </Routes>
  )
}

export default App
