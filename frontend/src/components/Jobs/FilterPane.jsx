import { StyleSheet, css } from "aphrodite"
import JobFilter from "./JobFilter"

const FilterPane = ({ location, employmentType, experienceLevel, filterTypes, handleFilterChange, resetFilterHandler }) => {

  return (
    <div className={css(styles.filter)}>
      <h5 className={css(styles.filterTitle)}>Filter Results</h5>

      <JobFilter
        title="Location"
        type="location"
        dropdowns={location}
        filterTypes={filterTypes}
        handleFilterChange={handleFilterChange}
      />
      <JobFilter
        title="Work Type"
        type="employmentType"
        dropdowns={employmentType}
        filterTypes={filterTypes}
        handleFilterChange={handleFilterChange}
      />
      <JobFilter
        title="Experience Level"
        type="experienceLevel"
        dropdowns={experienceLevel}
        filterTypes={filterTypes}
        handleFilterChange={handleFilterChange}
      />

      <button className={css(styles.resetFilter)} onClick={resetFilterHandler}>Reset Filters</button>
    </div>
  )
}

const styles = StyleSheet.create({
  filter: {
    border: '1px solid var(--complimentary-green)',
    borderRadius: '5px',
    margin: '2em 0',
    padding: '1em',
    width: 'calc(30% - 3em)',
    height: '100%',
    position: 'sticky',
    right: '3em',
    top: '3em',
    '@media (max-width: 850px)': {
      position: 'static',
      width: '100%',
    }
  },

  filterTitle: {
    fontSize: '1.1rem',
    margin: '0.5em 0',
    textAlign: 'center'
  },

  resetFilter: {
    backgroundColor: 'var(--complimentary-green)',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '0.5em 1em',
    width: '100%',
    marginTop: '2em',
    marginBottom: '2em',
  }

})

export default FilterPane