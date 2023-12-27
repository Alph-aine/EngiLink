import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../auth/AppContext'
import Header from './components/Header/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import Discover from './pages/Discover'
import Home from './pages/Home'
import SkillsSection from './components/Register/SkillsSection'
import ProtectedRoute from '../auth/ProtectedRoute'

const App = () => {

  return (
    <AuthProvider>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route exact path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='/discover' element={
              <ProtectedRoute>
                <Discover />
              </ProtectedRoute>
            } />
            <Route path='/skills' element={
              <ProtectedRoute>
                <SkillsSection />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App