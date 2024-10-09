import React from 'react'
import { Route } from 'wouter'
import TechBlog from './pages/TechBlog'
import Post from './pages/Post'
import Posting from './pages/Posting'
import Project from './pages/Project'
import NewProject from './pages/NewProject'
import ProjectDetail from './pages/ProjectDetail'
import Profile from './pages/Profile'

import './css/font.css'

function App() {
  return (
    <>
      <Route path='/' component={TechBlog} />
      <Route path='/posting' component={Posting} />
      <Route path='/project' component={Project} />
      <Route path='/newproject' component={NewProject} />
      <Route path='/project/detail' component={ProjectDetail} />
      <Route path='/post' component={Post} />
      <Route path='/profile' component={Profile} />
    </>
  )
}

export default App
