import {StyleSheet, css} from 'aphrodite'

const Logo = () => {
  return (
    <div className={css(styles.logo)}>EngiLink</div>
  )
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: 'var(--main-font)',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
})

export default Logo