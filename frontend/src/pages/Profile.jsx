import { StyleSheet, css } from "aphrodite"
import avatar from "/avatar-pic.png"

const Profile = () => {
  return (
    <div className={css(styles.profile)}>
      
    </div>
  )
}

const styles = StyleSheet.create({
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '2em 0'
  }
})

export default Profile