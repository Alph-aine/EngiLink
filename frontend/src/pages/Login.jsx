import axios from 'axios'
import Button from "../components/Button/Button"
import Cookies from 'js-cookie';
import { StyleSheet, css } from "aphrodite"
import { useState, useEffect } from "react"
import { AuthContext } from "../../auth/AppContext"
import { Link } from "react-router-dom" 
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [error, setError] = useState(false)
  const [authError, setAuthError] = useState(false)
  // const { setSharedToken } = useContext(AuthContext) // Destructure setSharedToken from the AuthContext using useContext
  const [buttonText, setButtonText] = useState("Log In")

  const navigate = useNavigate()

  // form state data
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData((previousFormData) => ({
        ...previousFormData,
        [name]: value
      }))
    }

    // Login function
    const loginEngineer = async (e) => {
      e.preventDefault()
      try {
        setButtonText("Please wait...")
        const url = 'https://engilink.onrender.com/api/v1/engineer/login'

        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        
        const { token } = response.data
        console.log(token)
        // set token in app wide token state value and navigate to home page
        // setSharedToken(token)
        
        toast.success('You have logged in')
        console.log('Navigated to Home page')
        navigate('/engineer/discover')
      }
      catch (error) {
        setAuthError(true)
        setButtonText("Log In")
        console.log('error')
        console.log(error)
      }
    }

    const showToast = () => {
      toast.error("Success Notification !");
    }

    // If logged in already, redirect to home
    useEffect(() => {
      // Fetch the token from the cookie when the component mounts
      const storedToken = Cookies.get('token');
      console.log('storedToken')
      console.log(storedToken)
      if (storedToken) { // token exists redirect to discover page
        navigate("/engineer/discover")
      }
    }, [])

  return (
    <div className={css(styles.login)}>
      <div className={css(styles.loginWrapper)}>
        <h2 className={css(styles.formTitle)}>Login to your account</h2>
        <form className={css(styles.form)} onSubmit={loginEngineer}>
          <div className={css(styles.formInputs)}>
            { error && <span className={css(styles.error)}>Please fill in all your details to continue.</span> }
            { authError && <span className={css(styles.error)}>Something went wrong! Please check your details and try again :(</span> }
            <div className={css(styles.formInput)}>
              <label className={css(styles.label)} htmlFor="">Email</label>
              <input className={css(styles.input)} type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className={css(styles.formInput)}>
              <label className={css(styles.label)} htmlFor="">Password</label>
              <input className={css(styles.input)} type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <Button text={buttonText} type="submit" />
          </div>
        </form>
        <span>Don't have an account? <Link to='/engineer/auth/signup'>Sign up</Link> </span>
      </div>
      <ToastContainer />
    </div>
    
  )
}

const styles = StyleSheet.create({
  login: {
    ':before': {
      content: '""',
      position: 'absolute',
      inset: '0',
      opacity: '0.8',
      backgroundImage: 'url("/engineer-login-pic-I.jpg")',
      backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  },

  loginWrapper: {
    fontFamily: 'var(--accent-font)',
    // border: '1px solid',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    minWidth: '20rem',
    padding: '2em 2em',
    backgroundColor: '#fff',
    boxShadow: '0 5px 5px 0 rgba(0,0,0,0.4)',
  },

  formTitle: {
    marginBottom: '1em',
    fontWeight: 'bold',
    fontSize: '1.3em'
  },

  form: {
    marginBottom: '1em'
  },

  formInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em'
  },

  formInput: {
    display: 'flex',
    flexDirection: 'column'
  },

  input: {
    padding: '0.8em',
    borderRadius: '3px',
    outline: 'none',
    border: '1px solid gray'
  },

  error: {
    color: 'red',
    fontSize: '0.8rem'
  }
})

export default Login