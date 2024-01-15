import { StyleSheet, css } from "aphrodite"

const ExperienceCard = ({ title, description, experienceLevel, onChangeExpLevel }) => {

  

  return (
    <div className={css(styles.card, experienceLevel === title && styles.selected)}>
      <input
        type="radio"
        // name="experienceLevel"
        value={title}
        checked={experienceLevel === title}
        className={css(styles.radio)}
        onChange={onChangeExpLevel}
      />
      <h4>{title}</h4>
      <p className={css(styles.description)}>{description}</p>
    </div>
  )
}

const styles = StyleSheet.create({
  card: {
    fontFamily: 'var(--accent-font)',
    border: '1px solid grey',
    borderRadius: '5px',
    padding: '1em',
    flex: '1',
    textAlign: 'center',
    position: 'relative'
  },

  selected: {
    border: '2px solid #00a600',
    // background: 'green'
  },

  description: {
    color: 'grey',
    fontSize: '0.8rem'
  },

  radio: {
    position: 'absolute',
    top: '0.1em',
    right: '0.1em',
    accentColor: 'green'
  }
})

export default ExperienceCard