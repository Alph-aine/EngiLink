import { StyleSheet, css } from "aphrodite"
// import { AuthContext } from "../../auth/AppContext"
import { useContext } from "react"
import axios from 'axios'
import image from '/engineers.jpg'
import Searchbar from "../components/SearchBar/Searchbar"
import LandingNav from "../components/LandingNav/LandingNav"

const Home = () => {

  // const { sharedToken } = useContext(AuthContext)

  const getProfile = async () => {
    try {
      const url = 'https://engilink.onrender.com/api/v1/engineer/me'
      // console.log(`token=${sharedToken}`)

      const response = await axios.get(url, {
        withCredentials: true
      })
      console.log(response.data)
    }
    catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className={css(styles.landing)}>
      <div className={css(styles.landingIntro)}>
        <h1>ENGINEER YOUR CAREER GROWTH WITH ENGILINK</h1>
        <button type="button" onClick={getProfile}>Get</button>
        <p>Discover tailored job opportunities with personalized matches to companies based on your skills, experience, location, and more.</p>
        <Searchbar />
        <LandingNav />
      </div>
      <div className={css(styles.landingImageWrapper)}>
        <img className={css(styles.landingImage)} src={image} alt="" />
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  landing: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    border: '1px solid',
    height: '100vh'
  },

  landingImageWrapper: {
    display: 'flex',
    border: '1px solid'
  },

  landingImage: {
    width: '100%',
    objectFit: 'cover'
  },

  landingIntro: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10%',
    border: '2px solid green'
  }
})

export default Home