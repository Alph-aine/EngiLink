import { redirect, useLoaderData, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../components/layout'
import { getLoggedInEmployer } from '../../lib/auth'
import JobCard from './card'
import Text from '../../components/text'

export const jobsLoader = async ({ params }) => {
  const { employerId } = params
  const user = await getLoggedInEmployer()
  if (!user) return redirect('/employer/auth/signin')

  let jobs = null

  try {
    const res = await axios.get(`http://localhost:3000/api/v1/employer/${employerId}/jobs`, {
      withCredentials: true,
    })

    jobs = res.data
  } catch (e) {
    console.log('Error loading data')
  }

  if (!jobs) return redirect(`/employer/${employerId}/profile`)
  return { jobs, user }
}

export default function Jobs() {
  const { jobs, user } = useLoaderData()

  return (
    <Layout companyName={user.companyName}>
      {jobs.length > 0 ? (
        <div className='flex flex-col'>
        {jobs.map((job) => (
          <Link to={`/empolyer/${user._id}/jobs/${job._id}`}>
            <JobCard key={job._id} job={job} />
          </Link>
        ))}
      </div>
      ) : (
        <div className='flex justify-center items-center gap-3'>
          <Text size='md'>No jobs yet</Text>
          <Text size='md'><Link to={`/employer/${user._id}/jobs/create`} className='text-primary underline hover:underline-none underline-offset-4'>Create now!</Link></Text>
        </div>
      )}
    </Layout>
  )
}
