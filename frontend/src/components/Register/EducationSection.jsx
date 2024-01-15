import { StyleSheet, css } from "aphrodite"
import { useState } from "react"
import Select from "react-select"

const EducationSection = ({ formData, handleInputChange, onChangeDegree }) => {

  const handleFieldOptionChange = e => {
    setFormData(previousData => ({
      ...previousData,
      fieldStudy: e.target.value
    }))
  }

  const degreeOptions = [
    { value: '', label: 'Select' },
    { value: 'highSchool', label: 'High School' },
    { value: 'associate', label: "Associate's Degree" },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" },
    { value: 'doctorate', label: 'Doctorate' }
  ];
  

  return (
    <div className={css(styles.education)}>
      <h2>Educational Information</h2>
      <div className={css(styles.educationWrapper)}>
        <div className={css(styles.formSection)}>
          <label htmlFor="highest-degree" className={css(styles.label)}>Highest Degree</label>
          <Select options={degreeOptions} onChange={onChangeDegree} />
        </div>
        <div className={css(styles.formSection)}>
          <label htmlFor="field-study" className={css(styles.label)}>Field of Study</label>
          <input type="text" name="fieldStudy" value={formData.fieldStudy} className={css(styles.input)} onChange={handleInputChange} />
        </div>
        
      </div>
      <div className={css(styles.btnWrapper)}>
        <button
          type="button"
          className={css(styles.button)}
          onClick={() => onStepChange(-1)}
          >Back</button>
        <button
          type="button"
          className={css(styles.button)}
          onClick={() => console.log(formData)}
          >Continue</button>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  education: {
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

  educationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2em'
  },

  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em'
  },

  selectField: {
    backgroundColor: '#fff',
    padding: '1em 1.5em'
  },

  option: {
    padding: '1em 1.5em'
  },

  label: {
    fontWeight: 'bold'
  },

  input: {
    padding: '0.8em',
    borderRadius: '3px',
    outline: 'none',
    border: '1px solid gray'
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

export default EducationSection