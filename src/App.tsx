import { Route, Switch } from 'wouter'
import TechBlog from './pages/TechBlog'
import { Register } from './Auth/Register.tsx'
import { Main } from './Main/Main.tsx'

function App() {
  return (
    <Switch>
      <Route path='/' component={Main} />
      <Route path='/blog' component={TechBlog} />
      <Route path='/regiser' component={Register} />
    </Switch>
  )
}

export default App
