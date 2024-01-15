import { StyleSheet, css } from "aphrodite"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import FilterDetail from "./FilterDetail"

const JobFilter = ({ title, type, dropdowns, filterTypes, handleFilterChange }) => {

  const [isOpen, setIsOpen] = useState(false)

  const toggleState = () => setIsOpen(currentState => !currentState)

  return (
    <div className={css(styles.filterSection)}>
      <div className={css(styles.filterTitle)} onClick={toggleState}>
        <h1 className={css(styles.titleText)}>{title}</h1>
        { isOpen ?
          <span className={css(styles.arrow)}><FontAwesomeIcon icon={faAngleUp} /></span> :
          <span className={css(styles.arrow)}><FontAwesomeIcon icon={faAngleDown} /></span>
        }
      
      </div>
      { isOpen && (
        <div className={css(styles.filterDetails)}>
          { dropdowns.map(dropdown => (
            <FilterDetail
              key={dropdown}
              title={dropdown}
              type={type}
              filterTypes={filterTypes}
              handleFilterChange={handleFilterChange} 
            />
          ) )}
          
        </div>
      )}
    </div>
  )
}

const styles = StyleSheet.create({
  filterTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em 1em',
    borderTop: '2px solid #e5e7eb',
  },

  titleText: {
    fontWeight: '500'
  },

  arrow: {
    cursor: 'pointer'
  },

  filterDetails: { 
    padding: '1em',
  }
})

export default JobFilter