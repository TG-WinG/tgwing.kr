import { Route, Switch, useLocation } from 'wouter'
import TechBlog from './pages/TechBlog'
import { Register } from './Auth/Register.tsx'
import PostDetail from './pages/PostDetail.tsx'
import UploadPost from './pages/UploadPost.tsx'
import Project from './pages/Project'
import UploadProject from './pages/UploadProject.tsx'
import ProjectDetail from './pages/ProjectDetail'
import Profile from './pages/Profile'

import './css/font.css'
import { useEffect } from 'react'
import { checkToken, getUserInfo } from './api/auth.ts'
import userStore from './store/User.ts'
import Home from './pages/Home'
import Admin from './pages/Admin.tsx'
import { NotFound } from './pages/error/NotFound.tsx'

function App() {
  const [location] = useLocation()
  const { setUser } = userStore()

  const refresh = async () => {
    try {
      await checkToken()
      const userInfo = await getUserInfo()
      setUser(userInfo)
    } catch {
      console.log('err')
      setUser(null)
    }
  }

  useEffect(() => {
    refresh()
  }, [location])

  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/blog' component={TechBlog} />
      <Route path='/register' component={Register} />
      <Route path='/posting' component={UploadPost} />
      <Route path='/project' component={Project} />
      <Route path='/newproject' component={UploadProject} />
      <Route path='/project/:project_id' component={ProjectDetail} />
      <Route path='/post/:post_id' component={PostDetail} />
      <Route path='/profile' component={Profile} />
      <Route path='/admin' component={Admin} />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

export default App
