import { useState } from "react"
import ExperienceCard from "./ExperienceCard"
import { StyleSheet, css } from "aphrodite"

const ExperienceSection = ({ onStepChange, formData, onChangeExpLevel }) => {

  const levels = [
    {
      id: 1,
      title: 'Entry level',
      description: 'I am relatively new to this field'
    },
    {
      id: 2,
      title:'Intermediate',
      description: 'I have substantial experience in this field'
    },
    {
      id: 3,
      title: 'Expert',
      description: 'I have comprehensive and deep expertise in this field'
    }
  ]

  const [error, setError] = useState(false)

  const nextSection = () => {
    if (formData.experienceLevel === '') {
      setError(true)
      return
    }
    onStepChange(1)
  }

  return (
    <div className={css(styles.finalSection)}>
      <h4 className={css(styles.title)}>Experience Level</h4>
      <hr />
      <div className={css(styles.cards)}>
        {levels.map(level => 
          <ExperienceCard 
            key={level.id}
            title={level.title}
            description={level.description}
            experienceLevel={formData.experienceLevel}
            onChangeExpLevel={onChangeExpLevel}
        />)}
        
      </div>
      { error && <span className={css(styles.error)}>Please select an experience level.</span> }
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

  finalSection: {
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

  cards: {
    display: 'flex',
    columnGap: '1em',
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

export default ExperienceSection