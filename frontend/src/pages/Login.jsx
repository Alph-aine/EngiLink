import { StyleSheet, css } from "aphrodite"
import { useState } from "react"
import { Link } from "react-router-dom"

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

    const loginEngineer = (e) => {
      e.preventDefault()
      alert(`Hello ${formData.username}`)
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
            <button className={css(styles.button)} type="submit">Register</button>
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

  button: {
    backgroundColor: 'var(--dark-green)',
    color: '#fff',
    padding: '0.8em',
    cursor: 'pointer',
    borderRadius: '3px',
    transition: 'all 0.1s ease-in-out',
    ':hover': {
      transform: 'scale(1.01)'
      // backgroundColor: 'var(--muted-green)',
    }
  }
})

export default Register