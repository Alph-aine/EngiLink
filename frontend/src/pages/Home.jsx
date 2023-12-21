import { StyleSheet, css } from "aphrodite"
import image from '/engineers.jpg'
import Searchbar from "../components/SearchBar/Searchbar"
import LandingNav from "../components/LandingNav/LandingNav"

const Home = () => {
  return (
    <div className={css(styles.landing)}>
      <div className={css(styles.landingIntro)}>
        <h1>ENGINEER YOUR CAREER GROWTH WITH ENGILINK</h1>
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