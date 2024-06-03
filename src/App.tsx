import React from 'react'
import { Route } from 'wouter'
import TechBlog from './pages/TechBlog'
import Post from './pages/Post'

function App() {
  return (
    <>
      <Route path='/' component={TechBlog} />
      <Route path='/posting' component={Posting} />
      <Route path='/post' component={Post} />
    </>
  )
}

export default App
