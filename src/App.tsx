import { Route, Switch } from 'wouter'
import TechBlog from './pages/TechBlog'
import { Register } from './Auth/Register.tsx'
import Post from './pages/Post'
import Posting from './pages/Posting'
import Project from './pages/Project'
import NewProject from './pages/NewProject'
import ProjectDetail from './pages/ProjectDetail'
import Profile from './pages/Profile'

import './css/font.css'

function App() {
  return (
    <Switch>
      <Route path='/' component={TechBlog} />
      <Route path='/blog' component={TechBlog} />
      <Route path='/register' component={Register} />
      <Route path='/posting' component={Posting} />
      <Route path='/project' component={Project} />
      <Route path='/newproject' component={NewProject} />
      <Route path='/project/detail' component={ProjectDetail} />
      <Route path='/post/:post_id' component={Post} />
      <Route path='/profile' component={Profile} />
    </Switch>
  )
}

export default App
