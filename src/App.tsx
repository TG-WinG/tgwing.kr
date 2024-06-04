import React from 'react'
import { Route } from 'wouter'
import TechBlog from './pages/TechBlog'
import Post from './pages/Post'
import Posting from './pages/Posting'
import Project from './pages/Project'
import './font.css'

function App() {
  return (
    <>
      <Route path='/' component={TechBlog} />
      <Route path='/posting' component={Posting} />
      <Route path='/project' component={Project} />
      <Route path='/post' component={Post} />
    </>
  )
}

export default App
