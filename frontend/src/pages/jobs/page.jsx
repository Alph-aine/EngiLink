import {
  redirect,
  useLoaderData,
  Link,
  useSearchParams,
} from 'react-router-dom'
import Layout from '../../components/layout'
import { getLoggedInEmployer } from '../../lib/auth'
import JobCard from './card'
import Text from '../../components/text'
import { fetchEmployerJobs } from '../../lib/job'
import Notification from '../../components/notification'
import useNotification from '../../hooks/usenotification'

export const jobsLoader = async ({ params }) => {
  const { employerId } = params

  const user = await getLoggedInEmployer()
  if (!user)
    return redirect(
      `/employer/auth/signin?msg=${'You must login first'}&msgType=${'TIP'}`
    )

  const jobs = await fetchEmployerJobs(user._id)
  if (!jobs)
    return redirect(
      `/employer/${employerId}/profile?msg=${'Error loading your jobs'}&msgType=${'BAD'}`
    )

  return { jobs, user }
}

export default function Jobs() {
  const { jobs, user } = useLoaderData()
  const [params, setSearchParams] = useSearchParams()
  const { notifications, removeNotif } = useNotification(
    params.get('msg'),
    params.get('msgType')
  )

  return (
    <Layout companyName={user.companyName}>
      <Notification notifications={notifications} remove={removeNotif} />
      {jobs.length > 0 ? (
        <div className='flex flex-col'>
          {jobs.map((job) => (
            <Link
              to={`/employer/${user._id}/jobs/${job._id}`}
              className='pb-12 pt-12 first:pt-0 last:pb-0 border-b last:border-none border-bg-primary/40'
            >
              <JobCard key={job._id} job={job} />
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center gap-3'>
          <Text size='sm'>No jobs yet</Text>
          <Text size='sm'>
            <Link
              to={`/employer/${user._id}/jobs/create`}
              className='text-primary underline hover:underline-none underline-offset-4'
            >
              Create now!
            </Link>
          </Text>
        </div>
      )}
    </Layout>
  )
}
