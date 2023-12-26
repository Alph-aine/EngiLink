import NavLink from "../NavBar/NavLink"
import { StyleSheet, css } from "aphrodite"

const LandingNav = () => {

  const landingNavs = [
    'Python', 'Product Design', 'Data Science', 'JavaScript', 'Machine Learning'
  ]

  return (
    <div>
      <p>Popular:</p>
      <div className={css(styles.landingNavs)}>
      {landingNavs.map((nav, index) => <NavLink key={index} url={`#${nav}`} text={nav} />) 
      }
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  landingNavs: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
  }
})

export default LandingNav