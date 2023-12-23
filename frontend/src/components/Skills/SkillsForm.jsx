import { StyleSheet, css } from "aphrodite"
import { useState } from "react"
import Skills from "./Skills"

const SkillsForm = () => {
  const [experiences, setExperiences] = useState([])
  const [skillInput, setSkillInput] = useState("")

  const handleSkillInput = (e) => {
    console.log(1, e.target.value)
    if (e.target.value === ",") return
    setSkillInput(e.target.value)
  }

  const handleNewExperience = (e) => {
    console.log(2, e.key)
    if (e.key === "Enter" || e.key === ',') {
      e.preventDefault()
      setExperiences((previousExperiences) => [...previousExperiences, skillInput])
      setSkillInput("")
    }
    console.log(3, experiences)
  }

  const removeExperienceHandler = experience => {
    setExperiences((previousExperiences) => previousExperiences.filter(exp => exp !== experience))
  }

  return (
    <div className={css(styles.skillsForm)}>
      <h2>Your skills</h2>
      <label className={css(styles.label)} htmlFor="experience">List your experiences, enter a comma or press the Enter key to enter a new one</label>
      <div className={css(styles.skillsWrapper)}>
        <Skills
          skillsList={experiences}
          onRemoveExperience={removeExperienceHandler}
        />
        <input 
          type="text"
          className={css(styles.input)}
          name="skill" id="experience"
          value={skillInput}
          onChange={handleSkillInput}
          onKeyDown={handleNewExperience} />
        {/* <textarea
          className={css(styles.textarea)}
          name="skill" id="experience"
          autoFocus={true}
          value={skillInput}
          onChange={handleSkillInput}
        onKeyDown={handleNewExperience} /> */}
      </div>
      <button type="button" className={css(styles.button)}>Save</button>
    </div>
  )
}

const styles = StyleSheet.create({
  skillsForm: {
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

  skillsWrapper: {
    border: '2px solid #2a5468',
    marginTop: '1em',
  },

  input: {
    outline: 'none',
    border: 'none',
    width: '100%',
    padding: '1em 1.5em'
  },

  label: {
    marginBottom: '1em',
  },

  button: {
    float: 'right',
    // marginTop: '1em',
  }
})

export default SkillsForm