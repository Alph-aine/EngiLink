import { StyleSheet, css } from "aphrodite"
import avatar from "/avatar-pic.png"
import { useEffect } from "react"

const EngineerProfile = () => {
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    async function fetchProfileInfo() {
      const response = await axios.get("http://localhost:3000/api/v1/engineer/me", {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      console.log(response.data)
      setProfileInfo(response.data.engineer)
    }
  })

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

export default EngineerProfile