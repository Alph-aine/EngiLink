import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Landing from './pages/Landing'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Landing />}>
      <Route path='dashboard' element={<Dashboard />} />
      {/* ... etc. */}
    </Route>
  )
)

export default router
