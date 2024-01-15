import { StyleSheet, css } from "aphrodite"

const FilterDetail = ({ title, type, filterTypes, handleFilterChange }) => {
  return (
    <div className={css(styles.filterDetail)}>
      <input
        type="radio"
        className={css(styles.radioBtn)}
        name={type} 
        value={title}
        onChange={handleFilterChange}
        checked={filterTypes[type] === title}
      />
      <p>{title}</p>
    </div>
  )
}

const styles = StyleSheet.create({
  filterDetail: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5em 0'
  },

  radioBtn: {
    accentColor: 'var(--dark-blue)',
    marginRight: '0.5em'
  }
})

export default FilterDetail