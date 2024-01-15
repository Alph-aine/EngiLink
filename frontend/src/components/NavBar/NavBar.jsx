import axios from 'axios'
import NavLink from './NavLink'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify';


const NavBar = ({ isLoggedIn, setAuth }) => {
  const [isBtnHover, setIsBtnHover] = useState(false)
  const navigate = useNavigate()

// Call logout endpoint
  const logout = async () => {
    console.log('logout?')

    try {
      const url = 'http://localhost:3000/api/v1/logout'

      const response = await axios.get(url, {
        withCredentials: true
      })

      const { success } = response.data
      console.log('success')
      console.log(success)
      
      if (success) { // Update Auth value in parent to display 'sign in' on navbar
        // toast.info('You are now logged out.')
        setAuth(false)

        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        throw "An error occured while logging you out. Please try again later."
      }
    }
    catch (error) {
      toast.error(error)
    } 
  }

  const handleMouseEnter = () => {
      setIsBtnHover(true);
  }
  const handleMouseLeave = () => {
      setIsBtnHover(false);
  }

  const logoutStyle = {
      color: !isBtnHover ? '#fff' : 'var(--dark-green)',
      textDecoration: 'none',
      cursor: 'pointer',
      border: '1px solid grey',
      borderRadius: '5px',
      padding: '0.65em',
      margin: '0 0.5em',
      transition: 'all 0.3s ease-in-out',
      backgroundColor: !isBtnHover ? 'var(--dark-green)' : '#fff',
    }

    return (
      <div>
        <NavLink url="/" text="Home" header={true} />
        <NavLink url="/engineer/discover" text="Discover Employers" header={true} />
        { !isLoggedIn ? 
          <NavLink url="/login" text="Sign In" header={true} /> :
          // <NavLink url="/logout" text="Sign Out" header={true} /> : 
          <button 
            style={logoutStyle}
            onClick={logout}
            onMouseOver={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
              Sign Out
          </button> }
      </div>
    )
}

export default NavBar