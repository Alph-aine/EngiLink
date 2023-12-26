import { StyleSheet, css } from "aphrodite"
import { useState } from "react"
import { Link } from "react-router-dom" 
import axios from 'axios'
import Cookies from 'js-cookie'
import Button from "../components/Button/Button"

const Register = ({ setAuth }) => {
  const [error, setError] = useState(false)
  const [authError, setAuthError] = useState(false)

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

    const loginEngineer = async (e) => {
      e.preventDefault()
      console.log("login")
      console.log(JSON.stringify(formData))
      const url = 'http://localhost:3000/api/v1/engineer/login'
      // alert(`Hello ${formData.email}`)
      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        const { token } = response.data
        console.log(token)
        // Cookies.set('token', token)
        console.log('success')
      } catch (error) {
        console.log(error.response)
      }

      // const options = {  
      //   method: "POST",
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "application/json",
      //   },
      //   body: formData,
      // };
      // fetch(url, options)
      //   .then(response => response.json())
      //   .then(data => console.log(data))
    }

  return (
    <>
      <div className="loginBackground">

      </div>
      <div className={css(styles.loginWrapper)}>
        <h2>Login to your account</h2>
        <form className={css(styles.form)} onSubmit={loginEngineer}>
          <div className={css(styles.formInputs)}>
            { error && <span className="error">Please fill in all your details to continue.</span> }
            { authError && <span className="error">Something went wrong! Please check your details and try again :(</span> }
            <div className={css(styles.formInput)}>
              <label className={css(styles.label)} htmlFor="">Email</label>
              <input className={css(styles.input)} type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className={css(styles.formInput)}>
              <label className={css(styles.label)} htmlFor="">Password</label>
              <input className={css(styles.input)} type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <Button text="Log In" type="submit" />
          </div>
        </form>
        <span>Dont have an account? <Link to='/register'>Sign up</Link> </span>
      </div>
    </>
    
  )
}

const styles = StyleSheet.create({
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
    boxShadow: '0 3px 3px 0 rgba(0,0,0,0.1)'
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
})

export default Register