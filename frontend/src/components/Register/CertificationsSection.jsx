import { StyleSheet, css } from "aphrodite"
import { useState } from "react"
import Skills from "./Skills"

const CertificationsSection = ({ onStepChange, formData, onSaveCertification, onRemoveCertification }) => {
  // const [certifications, setCertifications] = useState([])
  const [certificationInput, setCertificationInput] = useState("")
  const [inputError, setInputError] = useState(false)

  const handleCertificationInput = (e) => {
    if (e.target.value === ",") return
    setCertificationInput(e.target.value)
  }

  const handleNewCertification = (e) => {
    if (e.key === "Enter" || e.key === ',') {
      e.preventDefault()
      onSaveCertification(certificationInput)
      setCertificationInput("")
    }
  }

  const removeCertificationHandler = certification => {
    onRemoveCertification(certification)
    setCertifications((previousCertifications) => previousCertifications.filter(exp => exp !== experience))
  }

  const nextSection = () => {
    if (formData.certifications.length === 0) {
      setInputError(true)
      return
    }
    // onSaveExperience(skills)
    onStepChange(1)
  }

  return (
    <div className={css(styles.certificationsSection)}>
      <h2 className={css(styles.title)}>Your certifications</h2>
      <label className={css(styles.label)} htmlFor="experience">Enter your certifications, press Enter, or use a comma to add a new one.</label>
      <div className={css(styles.certWrapper)} style={{border: inputError ? '1px solid red': '2px solid #2a5468'}}>
        <Skills
          skillsList={formData.certifications}
          onRemoveExperience={removeCertificationHandler}
        />
        <input 
          type="text"
          className={css(styles.input)}
          name="skill" id="experience"
          value={certificationInput}
          onChange={handleCertificationInput}
          onKeyDown={handleNewCertification} />
        {/* <textarea
          className={css(styles.textarea)}
          name="skill" id="experience"
          autoFocus={true}
          value={certificationInput}
          onChange={handleCertificationInput}
        onKeyDown={handleNewCertification} /> */}
      </div>
      { inputError && <span className={css(styles.error)}>Please provide your list of certifications.</span> }
      <div className={css(styles.btnWrapper)}>
        <button
          type="button"
          className={css(styles.button)}
          onClick={() => onStepChange(-1)}
          >Back</button>
        <button
          type="button"
          className={css(styles.button)}
          onClick={nextSection}
          >Save</button>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontFamily: 'var(--main-font)',
    marginBottom: '1em',
  },
  
  error: {
    color: 'red',
    fontSize: '0.75rem'
  },

  certificationsSection: {
    fontFamily: 'var(--accent-font)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    minWidth: '30rem',
    padding: '2em 2em',
    backgroundColor: '#fff',
    boxShadow: '0 3px 3px 0 rgba(0,0,0,0.1)'
  },

  certWrapper: {
    marginTop: '1em',
    padding: '0.5em'
  },

  input: {
    outline: 'none',
    border: 'none',
    width: '100%',
    padding: '1em'
  },

  label: {
    marginBottom: '1em',
  },

  btnWrapper: {
    marginTop: '0.5em',
    display: 'flex',
    gap: '0.3em',
    float: 'right'
  },

  button: {
    background: 'var(--dark-green)',
    color: '#fff',
    padding: '0.5em 1em',
    cursor: 'pointer',
    transition: 'transform 0.1s',
    ':hover': {
      transform: 'scale(1.01)'
    }
  }
})

export default CertificationsSection