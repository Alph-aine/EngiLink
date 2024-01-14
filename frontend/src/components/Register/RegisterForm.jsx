import { StyleSheet, css } from "aphrodite"
import { useState } from "react"
import { Link } from "react-router-dom"

const RegisterForm = ({ onStepChange, formData, handleInputChange }) => {

  const [errorData, setErrorData] = useState({
    error: false,
    authError: false,
    usernameError: false,
    nameError: false,
    emailError: false,
    phoneError: false,
    passwordError: false,
    passwordLenError: false
})

  const nextSection = () => {
    // First, reset all existing errors
    setErrorData({
      error: false,
      authError: false,
      passwordError: false
    })

    // Next, validate form fields before proceeding to next section
    const isAnyFieldEmpty = formData.userName === '' || formData.email === '' || formData.password === '' || formData.phoneNumber === '' || formData.firstName === '' || formData.lastName === ''
    if (isAnyFieldEmpty) {
      setErrorData(currentError => ({
        ...currentError,
        error: true
      }))
      return
    }

    // Validate username length
    if (formData.userName.length < 6) {
      setErrorData(currentError => ({
        ...currentError,
        usernameError: true
      }))
      return
    }

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorData(currentError => ({
        ...currentError,
        emailError: true
      }))
      return
    }

    // Validate phone no using regex
    const phoneRegex = /^(?:\+234|0)([789][01]\d{8})$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      setErrorData(currentError => ({
        ...currentError,
        phoneError: true
      }))
      return
    }

    // Validate password length
    if (formData.password.length < 6) {
      setErrorData(currentError => ({
        ...currentError,
        passwordLenError: true
      }))
      return
    }

    // Validate password and confirm password matches
    if (formData.password != formData.confirmPassword) {
      setErrorData(currentError => ({
        ...currentError,
        passwordError: true
      }))
      return
    }

    onStepChange(1)
  }

  return (
    <div className={css(styles.loginWrapper)}>
      <h2 className={css(styles.formTitle)}>Login to your account</h2>
      <form className={css(styles.form)}>
        <div className={css(styles.formInputs)}>
          { errorData.error && <span className={css(styles.error)}>Please fill in all your details to continue.</span> }
          { errorData.authError && <span className={css(styles.error)}>Something went wrong! Please check your details and try again :(</span> }
          {/* Firstname */}
          <div className={css(styles.rowInput)}>
            <label className={css(styles.label)} htmlFor="firstname">Firstname</label>
            <input className={css(styles.input)} type="text" name="firstname" value={formData.firstName} onChange={handleInputChange} />
          </div>
          {/* Surname */}
          <div className={css(styles.rowInput)}>
            <label className={css(styles.label)} htmlFor="">Surname</label>
            <input className={css(styles.input)} type="text" name="surname" value={formData.lastName} onChange={handleInputChange} />
          </div>
          {/* Username */}
          <div className={css(styles.formInput)}>
            <label className={css(styles.label)} htmlFor="">Username</label>
            <input className={css(styles.input, errorData.usernameError && styles.errInput)} type="text" name="username" value={formData.userName} onChange={handleInputChange} />
            { errorData.usernameError && <span className={css(styles.error)}>Username must be at least 6 characters long.</span> }
          </div>
          {/* Email */}
          <div className={css(styles.formInput)}>
            <label className={css(styles.label)} htmlFor="">Email</label>
            <input className={css(styles.input, errorData.emailError && styles.errInput)} type="email" name="email" value={formData.email} onChange={handleInputChange} />
            { errorData.emailError && <span className={css(styles.error)}>Invalid email entered :(</span> }
          </div>
          {/* Phone */}
          <div className={css(styles.formInput)}>
            <label className={css(styles.label)} htmlFor="">Phone No.</label>
            <input className={css(styles.input, errorData.emailError && styles.errInput)} type="text" name="phone" value={formData.phoneNumber} onChange={handleInputChange} />
            { errorData.phoneError && <span className={css(styles.error)}>Invalid phone number entered :(</span> }
          </div>
          {/* Password */}
          <div className={css(styles.formInput)}>
            <label className={css(styles.label)} htmlFor="">Password</label>
            <input className={css(styles.input, (errorData.passwordLenError || errorData.passwordError) && styles.errInput)} type="password" name="password" value={formData.password} onChange={handleInputChange} />
            { errorData.passwordLenError && <span className={css(styles.error)}>Username must be at least 6 characters long.</span> }
          </div>
          <div className={css(styles.formInput)}>
            <label className={css(styles.label)} htmlFor="">Confirm Password</label>
            <input className={css(styles.input, errorData.passwordError && styles.errInput)} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
            { errorData.passwordError && <span className={css(styles.error)}>Passwords do not match.</span> }
          </div>
          <button 
            className={css(styles.button)}
            type="button"
            onClick={nextSection}>Continue</button>
        </div>
      </form>
      <span>Already have an account? <Link to='/engineer/login'>Log in</Link> </span>
    </div>
  )
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: '0.75rem',
    gridColumn: '1 / -1'
  },

  loginWrapper: {
    fontFamily: 'var(--accent-font)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '30%',
    minWidth: '25rem',
    padding: '2em 2em',
    backgroundColor: '#fff',
    boxShadow: '0 3px 3px 0 rgba(0,0,0,0.1)',
  },

  form: {
    marginBottom: '1em',
  },

  formTitle: {
    marginBottom: '1em',
    fontWeight: 'bold',
    fontSize: '1.3em'
  },

  formInputs: {
    display: 'grid',
    // flexDirection: 'column',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.6em',
  },

  formInput: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: '1 / -1'
  },

  formInputSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },

  rowInput: {
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    padding: '0.8em 0.3em',
    borderRadius: '3px',
    outline: 'none',
    border: '1px solid silver',
  },

  errInput: {
    border: '1px solid red'
  },

  button: {
    gridColumn: '1 / -1',
    backgroundColor: 'var(--dark-green)',
    color: '#fff',
    padding: '0.8em',
    cursor: 'pointer',
    borderRadius: '3px',
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      transform: 'scale(1.005)'
    }
  }
})

export default RegisterForm