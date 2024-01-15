import { StyleSheet, css } from "aphrodite"
import { Link } from "react-router-dom"

const NavLink = ({ url, text, header }) => {
  return (
    <Link className={css(styles.link, header && styles.headerLink)} to={url}>{text}</Link>
  )
}

const styles = StyleSheet.create({
  link: {
    color: 'var(--dark-green)',
    textDecoration: 'none',
    cursor: 'pointer',
    border: '1px solid grey',
    borderRadius: '5px',
    padding: '0.5em',
    margin: '0 0.5em',
    transition: 'all 0.3s ease-in-out',
    
  },

  headerLink: {
    color: '#fff',
    ':hover': {
      backgroundColor: '#fff',
      color: 'var(--dark-green)'
    }
  }
})

export default NavLink