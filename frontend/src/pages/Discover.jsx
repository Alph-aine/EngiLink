import { useEffect, useState } from "react"
import { StyleSheet, css } from "aphrodite"
import JobCard from "../components/Jobs/JobCard"
import Header from "../components/Header/Header"
import axios from 'axios' 
import FilterPane from "../components/Jobs/FilterPane"

const Discover = () => {
  
  const [jobs, setJobs] = useState([])
  const [filterJobs, setFilterJobs] = useState([])

  const [filterTypes, setFilterTypes] = useState({
    location: '',
    employmentType: '',
    experienceLevel: ''
  })

  useEffect(() => {
    // Anytime filterTypes changes, filter the jobs
    const filters = jobs.filter(job => {
      return Object.entries(filterTypes).every(([key, value]) => value === '' || job[key] === filterTypes[key]);
    });
    setFilterJobs(filters)
  }, [filterTypes])

  const handleFilterChange = (event) => {
    setFilterTypes({
      ...filterTypes,
      [event.target.name]: event.target.value
    })
  }

  const resetFilterHandler = () => {
    setFilterTypes({
      location: '',
      employmentType: '',
      experienceLevel: ''
    })
  }

  const url = "http://localhost:3000/api/v1/jobs"

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      setJobs(response.data)
      setFilterJobs(response.data)
    }
    fetchData()
  }, [])

  return (
    <>
      <Header />
      <div className={css(styles.discover)}>
        <h4 className={css(styles.discoverTitle)}>Find Your Right Job</h4>
        <div className={css(styles.discoverContent)}>
          <div className={css(styles.jobs)}>
            { filterJobs.length === 0 ?
              <p className={css(styles.noJobs)}>No jobs found</p> :
              filterJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))
            }
          </div>
          <FilterPane
            location={Array.from(new Set(jobs.map(job => job.location)))}
            employmentType={Array.from(new Set(jobs.map(job => job.employmentType)))}
            experienceLevel={Array.from(new Set(jobs.map(job => job.experienceLevel)))}
            filterTypes={filterTypes}
            handleFilterChange={handleFilterChange}
            resetFilterHandler={resetFilterHandler}
          />
        </div>
      </div>
    </>
  )
}

const styles = StyleSheet.create({
  discover: {
    padding: '1em 3em',
  },

  discoverTitle: {
    fontFamily: 'var(--accent-font)',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: 'var(--dark-green)',
    textAlign: 'center'
  },

  discoverContent: {
    border: '1px solid #7c3aed',
    borderRadius: '5px',
    margin: '2em 0',
    padding: '1em 2em',
    display: 'flex',
    gap: '2em',
    '@media (max-width: 850px)': {
      flexDirection: 'column-reverse',
    }
  },

  jobs: {
    // flex: '5',
    width: '70%',
    '@media (max-width: 850px)': {
      width: '100%',
    }
  },

  noJobs: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: '1.2rem',
  }
})

export default Discover