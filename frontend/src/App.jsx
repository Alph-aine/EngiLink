import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Landing from './components/Landing/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Discover from './pages/Discover'
import Home from './pages/Home'


const App = () => {
  const [auth, setAuth] = useState(false)
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/discover' element={<Discover />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App