import { StyleSheet, css } from "aphrodite"

const JobCard = ({ job }) => {
  return (
    <div className={css(styles.jobCard)}>
      <h3 className={css(styles.jobTitle)}>{job.title}</h3>
      <p className={css(styles.description)}>{job.description}</p>
      <span className={css(styles.highlight)}>{job.location}</span>
      <span className={css(styles.highlight)}>{job.employmentType}</span>
      <span className={css(styles.highlight)}>${job.minSalary} - {job.maxSalary}</span>
      <p className={css(styles.muted)}>Experience Level: {job.experienceLevel}</p>
      <p className={css(styles.muted)}>Employment Type: {job.employmentType}</p>
      <button className={css(styles.apply)}>Apply</button>
    </div>
  )
}

const styles = StyleSheet.create({
  jobCard: {
    border: '1px solid #7c3aed',
    borderRadius: '5px',
    margin: '2em 0',
    padding: '1em',
    backgroundColor: '#e2e2e2',
    borderBottom: '5px solid #7c3aed',
  },

  jobTitle: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: 'var(--dark-blue)',
    margin: '0.5em 0'
  },

  description: {
    margin: '0.5em 0',
    fontStyle: 'italic',
  },

  muted: {
    color: 'var(--blue-gray)',
    margin: '0.5em 0.3em'

  },

  highlight: {
    backgroundColor: 'var(--grey-white)',
    borderRadius: '5px',
    color: 'var(--blue-gray)',
    padding: '0.3em',
    margin: '0.5em 0.3em',
    display: 'inline-block'
  },

  apply: {
    backgroundColor: '#7c3aed',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    padding: '0.5em 1em',
    marginTop: '1em',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      backgroundColor: '#6b2eae',
    }
  }
})

export default JobCard