import React from 'react'
import { Route } from 'wouter'
import TechBlog from './pages/TechBlog'

function App() {
  return (
    <>
      <Route path='/' component={TechBlog} />
      <Route path='/blog' component={TechBlog} />
    </>
  )
}

export default App
