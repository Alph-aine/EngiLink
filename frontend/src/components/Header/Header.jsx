import NavBar from "../NavBar/NavBar"
import Logo from "../Logo/Logo"
import {StyleSheet, css} from 'aphrodite'

const Header = () => {
  return (
    <div className={css(styles.header)}>
      <Logo />
      <NavBar />
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