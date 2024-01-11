import { useEffect, useState } from "react"
import JobCard from "../components/JobCard/JobCard"
import axios from 'axios' 

const Discover = () => {

  const [jobs, setJobs] = useState([])
  const url = "http://localhost:3000/api/v1/engineer/me"

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      const jobss = response.data
      console.log('jobss')
      console.log(jobss)
      // setJobs(jobs)
    }
    fetchData()
  })

  return (
    <div>
      Discover
    </div>
  )
}

export default Discover