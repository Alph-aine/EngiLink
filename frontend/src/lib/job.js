import axios from 'axios'

export const fetchEmployerJobs = async (userId) => {
  let jobs = null

  try {
    const res = await axios.get(`https://engilink.onrender.com/api/v1/jobs`, {
      withCredentials: true,
    })

    jobs = res.data?.filter((job) => job.employer === userId)
  } catch (e) {
    console.log('Error loading data')
  }

  return jobs
}
