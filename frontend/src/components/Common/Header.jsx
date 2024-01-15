import axios from 'axios'
import NavBar from "../NavBar/NavBar"
import Logo from "../Logo/Logo"
import {StyleSheet, css} from 'aphrodite'
// import { AuthContext } from "../../../auth/AppContext"
import { useContext, useState, useEffect } from "react"
import Cookies from 'js-cookie';
import { RxHamburgerMenu } from 'react-icons/rx'
import Button from '../button'
import Text, { TextLink } from '../text'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  // const { sharedToken } = useContext(AuthContext)
  // console.log(`shared token: ${sharedToken}`)
  // const isLoggedIn = sharedToken ? true : false
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  // const setAuth = (auth) => {
  //   setIsLoggedIn(auth)
  // }

  useEffect(() => {
    // Fetch the token from the cookie when the component mounts
    const storedToken = Cookies.get('token');
    console.log('storedToken')
    console.log(storedToken)
    if (storedToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const logout = async () => {
    console.log('logout?')

    try {
      const url = 'http://localhost:3000/api/v1/logout'

      const response = await axios.get(url, {withCredentials: true})

      const { success } = response.data
      console.log('success')
      console.log(success)
      
      if (success) { // Update Auth value in parent to display 'sign in' on navbar
        setIsLoggedIn(false)
        setTimeout(() => {
          navigate('/');
        }, 500); // Use a very short timeout or 0 to ensure it runs in the next event loop iteration
      } else {
        throw "An error occured while logging you out. Please try again later."
      }
    }
    catch (error) {
      console.log('error')
      console.log(error)
      toast.error(error)
    } 
  }

  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    // Fetch the token from the cookie when the component mounts
    const storedToken = Cookies.get('token');
    console.log(storedToken)
  });

  return (
    <header className='relative bg-primary md:px-8 px-4 py-5 w-full'>
        <div className='flex justify-between items-center gap-5'>
          <span className=''>
            <Text size='lg' white>
              ENGILINK
            </Text>
          </span>
          <span className='order-first lg:order lg:hidden block'>
            <RxHamburgerMenu
              onClick={() => setIsNavOpen((val) => !val)}
              className='text-xl text-white'
            />
          </span>
          <div
            className={`${
              isNavOpen
                ? 'absolute left-0 w-full top-[100%] flex bg-primary py-5'
                : 'hidden'
            } order-first lg:order-none shrink-0 lg:flex lg:flex-row flex-col justify-center items-center xl:gap-12 lg:gap-4 gap-3`}
          >
            <div className='lg:hidden flex flex-col gap-3 w-full md:px-8 px-4'>
              <Button
                cx='bg-bg-secondary w-full'
                onClick={() => navigate('/')}
                textBlack
              >
                Home
              </Button>
              <Button
                cx='bg-bg-secondary w-full'
                onClick={() => navigate('/engineer/discover')}
                textBlack
              >
                Discover Employers
              </Button>
              {isLoggedIn && (
                <Button
                  cx='bg-bg-secondary w-full'
                  onClick={() => navigate('/engineer/profile')}
                  textBlack
                >
                  <FaRegUser style={{display: 'inline-block', marginRight: '0.5rem', marginBottom: '0.2rem'}} />
                  Profile
                </Button>
              )}
              {isLoggedIn ? (
                <Button
                  cx='bg-bg-secondary'
                  onClick={logout}
                  textBlack
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  cx='bg-bg-secondary'
                  onClick={() => navigate('/engineer/auth/signin')}
                  textBlack
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
          <div className='shrink-0'>
            <div className='shrink-0 lg:flex hidden xl:gap-6 gap-5 justify-end items-center'>
              <Button
                cx='bg-bg-secondary'
                onClick={() => navigate('/')}
                textBlack
              >
                Home
              </Button>
              <Button
                cx='bg-bg-secondary'
                onClick={() => navigate('/engineer/discover')}
                textBlack
              >
                Discover Employers
              </Button>
              {isLoggedIn ? (
                <Button
                  cx='bg-bg-secondary'
                  onClick={logout}
                  textBlack
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  cx='bg-bg-secondary'
                  onClick={() => navigate('/engineer/auth/signin')}
                  textBlack
                >
                  Sign In
                </Button>
              )}
              
              <span className='lg:block hidden border border-bg-secondary self-stretch' />
              {isLoggedIn && (
                <Button
                  cx='bg-bg-secondary'
                  onClick={() => navigate('/engineer/profile')}
                  textBlack
                >
                  <FaRegUser style={{display: 'inline-block', marginRight: '0.5rem', marginBottom: '0.2rem'}} />
                  Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    borderBottom: '1px solid grey',
    backgroundColor: 'var(--dark-green)',
    color: '#fff',
    height: '2rem'
  }
})

export default Header