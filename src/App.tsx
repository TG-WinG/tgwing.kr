import { Route, Switch } from 'wouter'
import TechBlog from './pages/TechBlog'
import { Register } from './Auth/Register.tsx'
import PostDetail from './pages/PostDetail.tsx'
import UploadPost from './pages/UploadPost.tsx'
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
      <Route path='/posting' component={UploadPost} />
      <Route path='/project' component={Project} />
      <Route path='/newproject' component={NewProject} />
      <Route path='/project/detail' component={ProjectDetail} />
      <Route path='/post/:post_id' component={PostDetail} />
      <Route path='/profile' component={Profile} />
    </Switch>
  )
}

export default App
