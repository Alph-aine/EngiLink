import axios from "axios"
import Cookies from 'js-cookie';
import { FaPencil } from "react-icons/fa6";
import { StyleSheet, css } from "aphrodite"
import { useEffect, useState } from "react"
import avatar from "/avatar-pic.png"
import Header from "../components/Common/Header"
import Footer from "../components/Common/Footer"

const EngineerProfile = () => {
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    async function fetchProfileInfo() {
      const response = await axios.get("https://engilink.vercel.app/api/v1/engineer/me", {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      console.log(response.data)
      setProfileInfo(response.data.engineer)
    }
    fetchProfileInfo()
  }, [])

  // If not logged in, redirect to login page
  useEffect(() => {
    // Fetch the token from the cookie when the component mounts
    const storedToken = Cookies.get('token');
    console.log('storedToken')
    console.log(storedToken)
    if (!storedToken) {
      toast.error('Please login to continue')
      navigate("/engineer/auth/signin")
    }
  }, [])

  return (
    <>
      <Header />
      <div className={css(styles.profile)}>
        <h3 className={css(styles.title)} style={{fontSize: '1.5rem'}}>My Profile</h3>
        <div className={css(styles.profileIntro)}>
          <img src={avatar} className={css(styles.avatar)} alt="" />
          <div className={css(styles.IntroText)}>
            <h5 className={css(styles.name)}>{profileInfo.lastName} {profileInfo.firstName}</h5>
            <p>Engineer</p>
          </div>
        </div>
        <div className={css(styles.personalInfo)}>
        <FaPencil className={css(styles.editIcon)} />
          <h4 className={css(styles.title)}>Personal Information</h4>
          <div className={css(styles.sectionText)}>
            <div className="section">
              <p>First Name</p>
              <p style={{color: 'black'}}>{profileInfo.firstName}</p>
            </div>
            <div className="section">
              <p>Last Name</p>
              <p style={{color: 'black'}}>{profileInfo.lastName}</p>
            </div>
            <div className="section">
              <p>Email address</p>
              <p style={{color: 'black'}}>{profileInfo.email}</p>
            </div>
            <div className="section">
              <p>Phone</p>
              <p style={{color: 'black'}}>{profileInfo.phoneNumber}</p>
            </div>
            <div className="section">
              <p>Bio</p>
              <p >Add Bio here</p>
            </div>
          </div>
        </div>
        <div className={css(styles.addressInfo)}>
          <h4 className={css(styles.title)}>Address Information</h4>
          <div className={css(styles.sectionText)}>
            <div className="section">
              <p>Street</p>
              <p style={{color: 'black'}}>Add street here</p>
            </div>
            <div className="section">
              <p>City</p>
              <p style={{color: 'black'}}>Add city here</p>
            </div>
            <div className="section">
              <p>State</p>
              <p style={{color: 'black'}}>Add state here</p>
            </div>
            <div className="section">
              <p>Zip Code</p>
              <p style={{color: 'black'}}>Add zip code here</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontFamily: 'var(--main-font)',
    marginBottom: '2em',
    marginTop: '2em',
  },

  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em',
    margin: '2em 0 5em 0',
    fontFamily: 'var(--accent-font)',
    // border: '1px solid',
  },

  avatar: {
    width: '6rem',
    height: '6rem',
  },

  editIcon:{
    color: 'var(--blue-gray)',
    position: 'absolute',
    top: '5%',
    right: '5%',
    cursor: 'pointer',
    ':hover': {
      color: 'var(--dark-green)'
    }
  },

  profileIntro: {
    display: 'flex',
    gap: '1em',
    alignItems: 'center',
    width: '45%',
    border: '1px solid var(--light-gray)',
    borderRadius: '5px',
    minWidth: '20rem',
    padding: '0.5em 1em',
  },

  name: {
    fontWeight: 'bold',
  },

  personalInfo: {
    border: '1px solid var(--light-gray)',
    borderRadius: '5px',
    minWidth: '20rem',
    padding: '0.5em 1em',
    width: '45%',
    position: 'relative',
    backgroundColor: 'var(--card-bg)',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.1)'
  },

  sectionText: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    rowGap: '1em',
    columnGap: '2em',
    color: 'var(--blue-gray)',
  },

  addressInfo: {
    border: '1px solid var(--light-gray)',
    borderRadius: '5px',
    minWidth: '20rem',
    padding: '0.5em 1em',
    width: '45%',
    position: 'relative',
    backgroundColor: 'var(--card-bg)',
    boxShadow: '0 3px 3px 0 rgba(0,0,0,0.1)'
  },
})

export default EngineerProfile