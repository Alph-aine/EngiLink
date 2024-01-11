import NavBar from "../NavBar/NavBar"
import Logo from "../Logo/Logo"
import {StyleSheet, css} from 'aphrodite'
import { AuthContext } from "../../../auth/AppContext"
import { useContext, useState, useEffect } from "react"
import Cookies from 'js-cookie';

const Header = () => {
  const { sharedToken } = useContext(AuthContext)
  console.log(`shared token: ${sharedToken}`)
  const isLoggedIn = sharedToken ? true : false
  // const [isLoggedIn, setIsLoggedIn] = useState(sharedToken ? true : false)

  const setAuth = (auth) => {
    setIsLoggedIn(auth)
  }

  // useEffect(() => {
  //   // Fetch the token from the cookie when the component mounts
  //   const storedToken = Cookies.get('token');
  //   console.log(storedToken)
  // });

  return (
    <div className={css(styles.header)}>
      <Logo />
      <NavBar isLoggedIn={isLoggedIn} setAuth={setAuth} />
    </div>
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