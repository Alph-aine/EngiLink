import { StyleSheet, css } from "aphrodite"

const Button = ({ text, type }) => {
  return (
    <button className={css(styles.button)} type={type}>{text}</button>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'var(--dark-green)',
    color: '#fff',
    padding: '0.8em',
    cursor: 'pointer',
    borderRadius: '3px',
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      transform: 'scale(1.005)'
    }
  }
})

export default Button