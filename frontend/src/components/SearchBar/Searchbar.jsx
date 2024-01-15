import { StyleSheet, css } from "aphrodite"
import { useState } from "react"
import './SearchBar.css'

const Searchbar = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearchTextChange = (e) => {
    console.log(e.target.value)
    setSearchText(e.target.value)
  }

  return (
    <div className={css(styles.searchBar)}>
      <input className={css(styles.input)}
        type="text" 
        value={searchText}
        onInput={handleSearchTextChange}
        placeholder="Search for jobs..." />
      <button className={css(styles.button)}>Search</button>
    </div>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: '',
    padding: '0',
    border: '1px solid var(--dark-green)',
    color: '#fff',
    width: '100%',
    borderRadius: '10px',
  },

  input: {
    flex: '9',
    cursor: 'pointer',
    height: '100%',
    padding: '1em',
    borderRadius: '10px 0 0 10px',
    outline: 'none',
    border: '1px solid gray',
    borderRight: 'none'
  },

  button: {
    flex: '1',
    background: 'var(--dark-green)',
    cursor: 'pointer',
    color: '#fff',
    height: '100%',
    borderRadius: '0 10px 10px 0',
    margin: '0',
    border: 'none',
    // border: '1px solid gray'
  }
})

export default Searchbar