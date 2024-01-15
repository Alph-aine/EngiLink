import { StyleSheet, css } from "aphrodite"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Skill = ({ text, onRemoveExperience }) => {
    const removeExperience = experience => {
      onRemoveExperience(experience)
    }

  return (
    <div className={css(styles.skill)}>
      <span className={css(styles.skillText)}>{text}</span>
      <FontAwesomeIcon icon={faXmark} className={css(styles.closeIcon)} onClick={() => removeExperience(text)} />
    </div>
  )
}

const styles = StyleSheet.create({
  skill: {
    fontFamily: 'var(--accent-font)',
    backgroundColor: 'var(--dark-green)',
    boxShadow: '0 3px 3px 0 rgba(0,0,0,0.1)',
    padding: '0.5em',
    borderRadius: '13px',
  },

  skillText: {
    marginRight: '0.5em',
    fontSize: '0.9rem',
  },

  closeIcon: {
    cursor: 'pointer',
  }
})

export default Skill